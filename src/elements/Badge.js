import React from "react";

export default function Badge({ title = "Farm", children, isVisible = false, color = "bg-teal-300", small }) {
  return (
    <div className="flex flex-col">
      <span
        // style={{ background: `${color ? color : "#2eca13"}` }}
        className={`${color}  font-pop rounded shadow text-white text-sm tracking-widest  border-teal-800 mx-1 px-4 h-10 flex items-center min-w-12 overflow-hidden`}
      >
        {title}
      </span>
      <span className="border border-b border-b-green mx-1 px-4 flex flex-col text-center align-middle  justify-items-center rounded-b text-2xl bg-white shadow pb-1 font-semibold text-gray-600 ">
        {children}
      </span>
    </div>
  );
}
