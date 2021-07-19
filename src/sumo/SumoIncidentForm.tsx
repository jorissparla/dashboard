import { ADDSUMOINCIDENT_MUTATION, ALL_SUMO_INCIDENTS_QUERY, DELETE_SUMOINCIDENT_MUTATION, UPDATE_SUMOINCIDENT_MUTATION } from "./sumoqueries";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHasPermissions, useUserContext } from "globalState/UserProvider";

import AutoComplete from "elements/AutoComplete";
import { ISumoIncident } from "./sumotypes";
import InputTagsDropDown from "common/InputTagsDD";
import SafeDeleteButton from "elements/SafeDeleteButton";
import TWButton from "elements/TWButton";
import TWCheckbox from "elements/TWCheckbox";
import TextInput from "elements/TextInput";
import { format } from "utils/format";
import { useAlert } from "globalState/AlertContext";
import { useHistory } from "react-router";
import { usePersistentState } from "hooks";

const QUERY_SUPPORT_ACCOUNTS = gql`
  query QUERY_SUPPORT_ACCOUNTS {
    accounts {
      id
      fullname
    }
  }
`;

type AccountType = {
  id?: string;
  fullname?: string;
};
function SumoIncidentForm({ initialValues }: { initialValues?: ISumoIncident }) {
  const defaults = initialValues
    ? initialValues
    : {
        id: "",
        creator: "",
        action: "",
        archive: 0,
        internal: 1,
        customername: "",
        incident: "",
        created: format(new Date(), "yyyy-MM-dd"),
        summary: "",
        status: "Open",
      };
  const [values, setValues] = useState(defaults);
  const [enabled, setEnabled] = useState(false);
  const [support, setSupport] = useState([]);

  const [addSumoIncidentInput] = useMutation(ADDSUMOINCIDENT_MUTATION);
  const [updateSumoIncidentInput] = useMutation(UPDATE_SUMOINCIDENT_MUTATION);
  const [deleteSumoIncidentInput] = useMutation(DELETE_SUMOINCIDENT_MUTATION);
  const { data, loading } = useQuery(QUERY_SUPPORT_ACCOUNTS);
  const [hasPermissions, user] = useHasPermissions(["ADMIN", "SUMOEDIT"]);
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    // if (debugMode && !user) {
    //   login("joris.sparla@infor.com", "Infor2019");
    // }
    let newDate = format(defaults?.created ? defaults.created : new Date().getTime(), "yyyy-MM-dd");
    // console.log("date", initialValues.created);
    if (values.id) {
      // const newDate = format(values.created, "yyyy-MM-dd");
      setValues({ ...values, created: newDate });
    }
    if (data) {
      const accounts = data.accounts.map((a: AccountType) => a.fullname);
      setSupport(accounts);
    }
    let isValisEditor = hasPermissions;
    if (user) {
      isValisEditor = isValisEditor || user.role === "ADMIN";
    }
    console.log({ user }, isValisEditor);
    setEnabled(isValisEditor);
  }, [data, user, initialValues]);

  function handleChange(e: { target: { name: any; value: any } }) {
    if (enabled) {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  }

  function setCreator(v: string) {
    setValues({ ...values, creator: v });
  }

  function toggleInternal() {
    const current: number = values ? values.internal || 1 : 0;
    setValues({ ...values, internal: 1 - current });
  }

  async function handleDelete() {
    console.log("handleDelete");
    if (values.id) {
      const where = { id: values.id };
      const result = await deleteSumoIncidentInput({ variables: { where }, refetchQueries: [{ query: ALL_SUMO_INCIDENTS_QUERY }] });
      alert.setMessage(`Successfully deleted entry`);
      history.push("/sumoincidents");
    }
  }
  async function archiveEntry(value = 1) {
    const newArchive = value;
    setValues({ ...values, archive: value });
    const newDate = values.created ? new Date(values.created).toISOString() : new Date().toISOString();
    if (values.id) {
      const where = { id: values.id };
      const input = { ...values, archive: newArchive, created: newDate };
      delete input.__typename;
      delete input.id;
      console.log(values);
      const result = await updateSumoIncidentInput({ variables: { where, input } });
      if (result?.data?.updateIncident) {
        alert.setMessage(`Successfully ${value === 1 ? "archived" : "unarchived"} and updated`);
      }
    }
  }

  async function addSumoEntry() {
    console.log(values.created);
    const newDate = values.created ? new Date(values.created).toISOString() : new Date().toISOString();
    const input = { ...values, created: newDate };
    if (!values.id) {
      // const newDate = new Date(values.created);
    }
    delete input.__typename;
    delete input.id;
    if (values.id) {
      const where = { id: values.id };
      console.log({ values });
      const result = await updateSumoIncidentInput({ variables: { where, input }, refetchQueries: [{ query: ALL_SUMO_INCIDENTS_QUERY }] });
      console.log(result);
      if (result?.data?.updateIncident) {
        alert.setMessage("Successfully updated");
      }
    } else {
      const result = await addSumoIncidentInput({ variables: { input }, refetchQueries: [{ query: ALL_SUMO_INCIDENTS_QUERY }] });
      console.log(result);
      alert.setMessage("Successfully added");
      history.push("/sumoincidents");
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white m-2 rounded shadow-lg p-2">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-black">{values.id ? "Edit" : "Add"} Entry for Incident</h2>
            <TWButton onClick={() => history.push("/sumoincidents")}>Back to List</TWButton>
            {enabled && (
              <div className="flex">
                {values.archive === 0 ? (
                  <TWButton color="indigo" onClick={() => archiveEntry(1)}>
                    Archive
                  </TWButton>
                ) : (
                  <TWButton color="purp" onClick={() => archiveEntry(0)}>
                    UnArchive
                  </TWButton>
                )}
                <TWButton color="teal" onClick={addSumoEntry}>
                  Save
                </TWButton>
                <SafeDeleteButton onDelete={handleDelete}>Delete</SafeDeleteButton>
              </div>
            )}
          </header>
        </section>
        <div className="flex space-x-2 flex-wrap">
          <AutoComplete
            disabled={!enabled}
            support={support}
            label="name"
            value={values.creator}
            onChangeValue={(v) => setCreator(v)}
            className="mt-5"
          />
          {/* <TWSelectMenu items={support} label="name" name="creator" value={values.creator} onChange={(v) => setCreator(v)} /> */}
          <div>
            <label htmlFor="created" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="created"
              value={values.created || format(new Date(), "yyyy-MM-dd")}
              name="created"
              onChange={handleChange}
              type="date"
              className="form-input max-w-44"
            />
          </div>
          <TextInput label="Customer" name="customername" value={values.customername} onChange={handleChange} className="min-w-80" />
          <TextInput label="Incident" name="incident" value={values.incident} onChange={handleChange} />
          <TextInput label="Status" name="status" value={values.status} onChange={handleChange} className="min-w-80" />
          {/* <InputTagsDropDown values={values.farms} name="farms" readOnly={!enabled} label="Farms" onChange={handleFarmsInputChange} /> */}
          <div className=" flex items-center ml-2 pl-2 pt-4">
            <TWCheckbox label="Internal Incident" value={values.internal === 1} onChange={toggleInternal} />
          </div>
        </div>

        <div className="mt-2">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            name="summary"
            value={values.summary}
            onChange={handleChange}
            className="form-input font-mono resize-none text-2xs w-full"
            rows={10}
          />
        </div>
        <div className="mt-2">
          <div className="mt-2 mb-2">
            <div>
              <label htmlFor="action" className="block text-sm font-medium text-gray-700">
                Action
              </label>
              <textarea name="action" value={values.action} onChange={handleChange} className="form-input font-sans resize-none w-funll" rows={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SumoIncidentForm;
