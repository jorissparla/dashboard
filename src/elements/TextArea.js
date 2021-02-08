import React from "react";

const TextArea = ({ value = "", label = "label", onChange = (v) => console.log({ v }), ...props }) => {
  const id = new Date().getTime().toString();
  const { className = "", ...rest } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 ">
        {label}
      </label>
      <textarea id={`${id}${label}`} type="text" className={`form-input resize-none ${className}`} value={value} onChange={onChange} {...rest} />
    </div>
  );
};

export default TextArea;
