import { useMutation, gql } from "@apollo/client";
import TextInput from "elements/TextInput";
import { pad } from "lodash";
import React, { useState } from "react";

const ADDSUMO_MUTATION = gql`
  mutation ADDSUMO_MUTATION($input: SumologInput) {
    addSumolog(input: $input) {
      id
      creator
      created
      query
    }
  }
`;
function AddSumo() {
  const [values, setValues] = useState({ creator: "", week: getWeek(), query: "", comments: "" });
  const [addSumoInput] = useMutation(ADDSUMO_MUTATION);
  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  function handleTextInputChange(value) {
    console.log(value);
  }
  async function addSumoEntry() {
    const input = { ...values };
    const result = await addSumoInput({ variables: { input } });
    console.log(result);
  }
  function getWeek() {
    const year = new Date().getFullYear();
    var onejan = new Date(year, 0, 1);
    return year.toString() + "-W" + String(Math.ceil(((new Date() - onejan) / 86400000 + onejan.getDay() + 1) / 7)).padStart(2, "0");
  }
  console.log(getWeek());
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white m-2 rounded shadow-lg p-2">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-black">Add Entry for Sumo</h2>
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
              Week
            </label>
            <input id="week" value={values.week} name="week" onChange={handleChange} type="week" className="form-input" onChange={handleChange} />
          </div>
        </div>
        <div>
          <label htmlFor="week" className="block text-sm font-medium text-gray-700">
            Query
          </label>
          <textarea
            type="text"
            name="query"
            style={{ fontSize: 10 }}
            value={values.query}
            onChange={handleChange}
            className="form-input font-mono resize-none text-2xs"
            rows="12"
          />
        </div>
        <div>
          <pre className="flex flex-wrap">{JSON.stringify(values, null, -2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default AddSumo;
