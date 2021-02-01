import { gql, useMutation } from "@apollo/client";
import InputTagsDropDown from "common/InputTagsDD";
import TextInput from "elements/TextInput";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import Sumo from "pages/sumo";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format } from "utils/format";

export const ADDSUMO_MUTATION = gql`
  mutation ADDSUMO_MUTATION($input: SumologInput) {
    addSumolog(input: $input) {
      id
      creator
      created
      week
      comments
      customername
      created
      query
      farms
      incident
      sessioncode
      errormessage
      module
    }
  }
`;
export const UPDATE_SUMO_MUTATION = gql`
  mutation UPDATE_SUMO_MUTATION($where: SumologWhere, $input: SumologInput) {
    updateSumolog(where: $where, input: $input) {
      id
      creator
      created
      week
      comments
      customername
      created
      query
      farms
      incident
      sessioncode
      errormessage
      module
    }
  }
`;

function SumoForm({ initialValues = null }) {
  const defaults = initialValues || {
    id: null,
    creator: "",
    customername: "",
    created: getCurrentDate(),
    week: getWeek(),
    incident: "",
    query: "",
    comments: "",
    errormessage: "",
    farms: "Frankfurt",
    sessioncode: "",
    module: "",
  };
  const [values, setValues] = useState(defaults);
  const [addSumoInput] = useMutation(ADDSUMO_MUTATION);
  const [updateSumoInput] = useMutation(UPDATE_SUMO_MUTATION);
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    console.log("date", values.created);
    if (values.id) {
      const newDate = format(values.created, "yyyy-MM-dd");
      setValues({ ...values, created: newDate });
    }
  }, []);
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleFarmsInputChange(farms = "") {
    setValues({ ...values, farms });
  }
  async function addSumoEntry() {
    const newDate = values.created ? new Date(values.created).toISOString() : new Date().toISOString();
    if (values.id) {
      const where = { id: values.id };
      const input = { ...values, created: newDate };
      delete input.__typename;
      delete input.id;
      console.log(values);
      const result = await updateSumoInput({ variables: { where, input } });
      console.log(result);
      if (result?.data?.updateSumolog) {
        alert.setMessage("Successfully updated");
      }
    } else {
      const input = { ...values };
      const result = await addSumoInput({ variables: { input } });
      console.log(result);
    }
  }
  function getWeek() {
    const year = new Date().getFullYear();
    var onejan = new Date(year, 0, 1);
    return year.toString() + "-W" + String(Math.ceil(((new Date() - onejan) / 86400000 + onejan.getDay() + 1) / 7)).padStart(2, "0");
  }

  function getCurrentDate() {
    const currDate = new Date();
    return format(currDate, "yyyy-MM-dd");
  }
  console.log(getWeek());
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white m-2 rounded shadow-lg p-2">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-black">{values.id ? "Edit" : "Add"} Entry for Sumo</h2>
            <TWButton onClick={() => history.push("/sumo")}>Back to List</TWButton>
            <TWButton color="pink" onClick={addSumoEntry}>
              Save
            </TWButton>
          </header>
        </section>
        <div className="flex space-x-2">
          <TextInput label="Name" name="creator" value={values.creator} onChange={handleChange} className="w-48" />
          <div>
            <label htmlFor="week" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="created"
              value={values.created}
              name="created"
              onChange={handleChange}
              type="date"
              className="form-input max-w-44"
              onChange={handleChange}
            />
          </div>

          <TextInput label="Incident" name="incident" value={values.incident} onChange={handleChange} className="max-w-32" />
          <TextInput label="Customer" name="customername" value={values.customername} onChange={handleChange} className="min-w-80" />
          <TextInput label="Sessioncode" name="sessioncode" value={values.sessioncode} onChange={handleChange} className="max-w-32" />
          <TextInput label="Module" name="module" value={values.module} onChange={handleChange} className="max-w-16" />
          <InputTagsDropDown values={values.farms} name="farms" readOnly={false} label="Farms" onChange={handleFarmsInputChange} />
        </div>
        <pre>{JSON.stringify(values, null, -2)}</pre>
        <div className="mt-2">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            type="text"
            name="comments"
            value={values.comments}
            onChange={handleChange}
            className="form-input font-sans resize-none "
            rows="4"
          />
        </div>
        <div className="mt-2">
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              Query
            </label>
            <textarea
              type="text"
              name="query"
              value={values.query}
              onChange={handleChange}
              className="form-input font-mono resize-none text-2xs"
              rows="12"
            />
          </div>
          <div className="mt-2 mb-2">
            <div>
              <label htmlFor="errormessage" className="block text-sm font-medium text-gray-700">
                ErrorMessage
              </label>
              <textarea
                type="text"
                name="errormessage"
                value={values.errormessage}
                onChange={handleChange}
                className="form-input font-mono resize-none text-2xs"
                rows="15"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SumoForm;
