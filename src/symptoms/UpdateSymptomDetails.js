import React, { useState } from "react";

export default ({ values = { complete: false, note: "", email: "" }, onSave, onCancel, onComplete }) => {
  const [complete, setComplete] = useState(values.status);
  const [email, setEmail] = useState(values.email);
  const [note, setNote] = useState(values.note);

  const toggleComplete = () => {
    setComplete((prev) => !complete);
    // onComplete();
  };
  const handleChangeNote = (e) => setNote(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg className="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Symptom Status</h3>
            <div className="w-full">
              <div className="flex mt-6">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" value={complete} checked={complete} onChange={toggleComplete} />
                  <span className="ml-2">Mark {complete ? "InComplete" : "Complete"}</span>
                </label>
              </div>
              <label className="block w-full">
                <span className="text-gray-700 font-sans text-sm font-semibold">Note</span>
                <textarea
                  className="form-textarea mt-1 block w-full text-sm"
                  rows="4"
                  placeholder="Enter some update comment"
                  value={note}
                  onChange={handleChangeNote}
                />
              </label>
            </div>
            <div>
              <label className="block w-full">
                <span className="text-gray-700 font-sans text-sm font-semibold">email</span>
                <input className="form-input mt-1 block w-full" placeholder="Enter email address." value={email} onChange={handleChangeEmail} />
              </label>
            </div>
            <div className="mt-2">
              <div />
              <p className="text-sm leading-5 text-gray-500 w-full">Enter your comments</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onSave(note, complete ? 1 : 0, email);
              }}
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Update
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Cancel
            </button>
          </span>
        </div>
        {/* <span>{JSON.stringify({ complete, note })}</span> */}
      </div>
    </div>
  );
};
