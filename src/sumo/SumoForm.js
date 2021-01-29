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
      query
      farms
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
      week
      comments
      created
      query
      farms
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
    created: getCurrentDate(),
    week: getWeek(),
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
    const newDate = values.date ? new Date(values.date).toISOString() : new Date().toISOString();
    if (values.id) {
      const where = { id: values.id };
      const input = { ...values, created: newDate };
      delete input.__typename;
      delete input.id;
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
            <button
              className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2 mx-2"
              onClick={addSumoEntry}
            >
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </button>
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
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="week" className="block text-sm font-medium text-gray-700">
              Week
            </label>
            <input id="week" value={values.week} name="week" onChange={handleChange} type="week" className="form-input" onChange={handleChange} />
          </div>
          <TextInput label="Sessioncode" name="sessioncode" value={values.sessioncode} onChange={handleChange} className="w-48" />
          <TextInput label="Module" name="module" value={values.module} onChange={handleChange} className="w-48" />
          <InputTagsDropDown values={values.farms} name="farms" readOnly={false} label="Farms" onChange={handleFarmsInputChange} />
        </div>
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
