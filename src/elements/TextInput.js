import React from "react";

const TextInput = ({ value = "", label = "label", onChange = (v) => console.log({ v }), ...props }) => {
  const id = new Date().getTime().toString();
  const { className = "", ...rest } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={`${id}${label}`}
        type="text"
        className={`${className} mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
