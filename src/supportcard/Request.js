import { gql, useMutation } from "@apollo/client";
import TextArea from "elements/TextArea";
import TextInput from "elements/TextInput";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import React, { useEffect, useState } from "react";
export const niceblue = "#40a5ed";
export const babyblue = "#ecf6fd";
export const twitterblue = "#1da1f2";

function isNotEmpty(value) {
  return value ? true : false;
}
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const Request1 = () => {
  const [addRequest] = useMutation(MUTATION_CREATE_REQUEST);
  const [values, setValues] = useState({ name: "", email: "", text: "" });
  const [errors, setErrors] = useState([]);
  const alert = useAlert();
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  async function handleSave() {
    if (errors.length === 0) {
      const result = await addRequest({ variables: { values } });
      alert.setMessage("Request added");
    }
  }

  useEffect(() => {
    const { name, email, text } = values;
    let newErrors = [];

    if (!isNotEmpty(name)) {
      newErrors = [...newErrors, "Name not entered "];
    }
    if (!isNotEmpty(email)) {
      newErrors = [...newErrors, "Email not entered "];
    }
    if (!isValidEmail(email)) {
      newErrors = [...newErrors, "Email not valid "];
    }
    if (!isNotEmpty(text)) {
      newErrors = [...newErrors, "Suggestion not entered "];
    }
    setErrors(newErrors);
  }, [values]);
  return (
    <div className="bg-gray-100">
      <div className="bg-white rounded shadow-xl p-2 m-2">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-500">Request a new SupportCard</h2>
        </header>
        <div className="flex flex-wrap space-x-2 w-full">
          <TextInput value={values.name} onChange={handleChange} name="name" label="Name" />
          <TextInput value={values.email} onChange={handleChange} name="email" label="Email" type="email" className="min-w-96" />
        </div>
        <TextArea rows={10} value={values.text} onChange={handleChange} name="text" label="Suggestion" type="text" />
        <ErrorComponent errors={errors} />
        <div className="flex w-1/2  mt-2">
          <TWButton color="teal" onClick={handleSave} className={`${errors.length === 0 ? "" : "cursor-not-allowed"}`}>
            Save
          </TWButton>
          <TWButton>Cancel</TWButton>
        </div>
      </div>
    </div>
  );
};

export const ErrorComponent = ({ errors = [] }) => {
  if (errors.length === 0) {
    return <div />;
  }
  return (
    <div className="rounded-md bg-red-50 p-4 border-red-500 border transition duration-500 ease-in-out">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">There are {errors.length} errors that need to be fixed</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const MUTATION_CREATE_REQUEST = gql`
  mutation createRequest($name: String, $email: String, $text: String) {
    createRequest(input: { name: $name, email: $email, text: $text }) {
      id
    }
  }
`;

export default Request1;
