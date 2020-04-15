import React from "react";

const def_classes = "bg-gray-700 font-bold px-4 py-2 rounded text-white";

export default ({ children, props }) => (
  <button className={def_classes} {...props}>
    {children}
  </button>
);
