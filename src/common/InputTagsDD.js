import React, { useState, useEffect } from "react";

const InputTagsDropDown = ({ label = "Label", placeholder = "start typing", values = "", onChange = (v) => console.log(v), readOnly = true }) => {
  const [items, setItems] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setItems(values);
  }, [values]);

  function handleChange(evt) {
    setValue(evt.target.value);
  }
  function handleInputKeyDown(evt) {
    const ar = items.split(";");
    if (evt.keyCode === 13) {
      const { value } = evt.target;

      setValue("");
      const newItems = [...ar.filter((it) => it !== value), value].join(";");
      setItems(newItems);
      onChange(newItems);
    }

    if (ar.length && evt.keyCode === 8 && !value.length) {
      const newItems = items.slice(0, items.length - 1).join(";");
      setItems(newItems);
      onChange(newItems);
    }
  }

  function handleRemoveItem(itemToDelete) {
    return () => {
      const ar = items.split(";");
      const newItems = ar.filter((item, i) => item !== itemToDelete).join(";");
      setItems(newItems);
      onChange(newItems);
    };
  }
  return (
    <div>
      <label for="email" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="px-1 py-1 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm outline-none focus:outline-none border border-light-blue-200 w-full ">
        {items?.split(";").map((item) => (
          <span className="inline-block items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-light-blue-200 text-light-blue-800 mx-1">
            {item}
            {!readOnly && (
              <button
                onClick={handleRemoveItem(item)}
                type="button"
                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
              >
                <span className="sr-only">Remove small option</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            )}
          </span>
        ))}
        {!readOnly && (
          <select
            name="Farms"
            id="farms"
            value={value}
            className=" form-select ml-2 font-sans p-1 w-32 "
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
          >
            <option value="Frankfurt">Frankfurt</option>
            <option value="Sydney">Sydney</option>
            <option value="US-East01">US-East-1</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default InputTagsDropDown;