import React, { useState } from "react";

const TWCheckbox = ({ value = false, label = "Label", text = "", onChange }) => {
  const [val, setVal] = useState(value);
  function handleChange(value) {
    setVal(!val);
    if (onChange) onChange(!val);
  }
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id="offers"
          name="offers"
          type="checkbox"
          className="focus:ring-blue-400 h-4 w-4 text-blue-400 border-gray-300 rounded"
          checked={val}
          onChange={handleChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="offers" className="font-medium text-gray-700">
          {label}
        </label>
        <p className="text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default TWCheckbox;
