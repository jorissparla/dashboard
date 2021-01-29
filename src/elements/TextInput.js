import React from "react";

const TextInput = ({ value = "", label = "label", onChange = (v) => console.log({ v }), ...props }) => {
  const id = new Date().getTime().toString();
  const { className = "", ...rest } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input id={`${id}${label}`} type="text" className={`form-input ${className}`} value={value} onChange={onChange} {...rest} />
    </div>
  );
};

export default TextInput;
