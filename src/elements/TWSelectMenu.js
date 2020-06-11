import React, { useState } from "react";

export const TWSelectMenu = ({ items, value, onChange, label = "Assigned To" }) => {
  const [lbOpen, setlbOpen] = useState(false);
  return (
    <div className="ml-4 space-y-1 w-48">
      <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700 font-semibold">
        {label}
      </label>
      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setlbOpen(!lbOpen)}
            className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <span className="block truncate">{value || items[0]}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </span>
        {lbOpen && (
          <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg z-50">
            <ul
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 "
            >
              {items.map((item) => (
                <li
                  id="listbox-item-0"
                  role="option"
                  key={item}
                  className="text-gray-900 cursor-default select-none relative py-2 pl-8 pr-4 hover:bg-purp hover:text-white"
                  onClick={() => {
                    setlbOpen(false);
                    onChange(item);
                  }}
                >
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span className="font-normal block truncate">{item}</span>

                  {item === value && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
