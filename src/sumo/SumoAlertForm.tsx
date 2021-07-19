import { ADDSUMOALERT_MUTATION, ALL_SUMOALERTS_QUERY, DELETE_SUMOALERT_MUTATION, UPDATE_SUMOALERT_MUTATION } from "./sumoqueries";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHasPermissions, useUserContext } from "globalState/UserProvider";

import AutoComplete from "elements/AutoComplete";
import InputTagsDropDown from "common/InputTagsDD";
import SafeDeleteButton from "elements/SafeDeleteButton";
import TWButton from "elements/TWButton";
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

type SumoAlertType = {
  id?: string;
  creator?: string;
  created?: string;
  archive?: number;
  alert?: string;
  comments?: string;
  environments?: string;
  customerid?: number;
  customername?: string;
  __typename?: string;
};

type AccountType = {
  id?: string;
  fullname?: string;
};
function SumoAlertForm({ initialValues }: { initialValues?: SumoAlertType }) {
  const defaults = initialValues
    ? initialValues
    : {
        id: "",
        creator: "",
        comments: "",
        archive: 0,
        customername: "",
        created: format(new Date(), "yyyy-MM-dd"),
        alert: "",
        environments: "",
      };
  const [values, setValues] = useState(defaults);
  const [debugMode, setDebugMode] = usePersistentState("debug", true);
  const { login } = useUserContext();
  const [enabled, setEnabled] = useState(false);
  const [support, setSupport] = useState([]);

  const [addSumoAlertInput] = useMutation(ADDSUMOALERT_MUTATION);
  const [updateSumoAlertInput] = useMutation(UPDATE_SUMOALERT_MUTATION);
  const [deleteSumoAlertInput] = useMutation(DELETE_SUMOALERT_MUTATION);
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
      console.log(e.target.name, e.target.value);
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  }

  function setCreator(v: string) {
    console.log(v);
    setValues({ ...values, creator: v });
  }

  async function handleDelete() {
    console.log("handleDelete");
    if (values.id) {
      const where = { id: values.id };
      const result = await deleteSumoAlertInput({ variables: { where }, refetchQueries: [{ query: ALL_SUMOALERTS_QUERY }] });
      alert.setMessage(`Successfully deleted entry`);
      history.push("/sumoalerts");
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
      const result = await updateSumoAlertInput({ variables: { where, input } });
      if (result?.data?.updateSumoAlert) {
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
      const result = await updateSumoAlertInput({ variables: { where, input }, refetchQueries: [{ query: ALL_SUMOALERTS_QUERY }] });
      console.log(result);
      if (result?.data?.updateSumoAlert) {
        alert.setMessage("Successfully updated");
      }
    } else {
      const result = await addSumoAlertInput({ variables: { input }, refetchQueries: [{ query: ALL_SUMOALERTS_QUERY }] });
      console.log(result);
      alert.setMessage("Successfully added");
      history.push("/sumo");
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white m-2 rounded shadow-lg p-2">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-black">{values.id ? "Edit" : "Add"} Entry for Alert</h2>
            <TWButton onClick={() => history.push("/sumoalerts")}>Back to List</TWButton>
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
            <label htmlFor="week" className="block text-sm font-medium text-gray-700">
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
          <TextInput label="Environments" name="environments" value={values.environments} onChange={handleChange} className="min-w-80" />
          {/* <TextInput label="Module" name="module" value={values.module} onChange={handleChange} className="max-w-16" /> */}
          {/* <InputTagsDropDown values={values.farms} name="farms" readOnly={!enabled} label="Farms" onChange={handleFarmsInputChange} /> */}
        </div>

        <div className="mt-2">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea name="comments" value={values.comments} onChange={handleChange} className="form-input font-sans resize-none w-full" rows={4} />
        </div>
        <div className="mt-2">
          <div className="mt-2 mb-2">
            <div>
              <label htmlFor="alert" className="block text-sm font-medium text-gray-700">
                Alert
              </label>
              <textarea
                name="alert"
                value={values.alert}
                onChange={handleChange}
                className="form-input font-mono resize-none text-2xs w-full"
                rows={15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SumoAlertForm;
