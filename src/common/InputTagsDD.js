import React, { useState, useEffect } from "react";

const defaults = ["Frankfurt", "US-East", "Sydney", "Tokyo"];

const InputTagsDropDown = ({
  label = "",
  listitems = defaults,
  placeholder = "start typing",
  values = "",
  onChange = (v) => console.log(v),
  readOnly = true,
  className = "",
}) => {
  const [items, setItems] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setItems(values);
    console.log({ values });
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
    <div className={className}>
      {label && (
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="px-1 py-1 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm outline-none focus:outline-none border border-light-blue-200 w-full ">
        {items?.split(";").map((item) => (
          <span
            key={item}
            className="inline-block items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-light-blue-200 text-light-blue-800 mx-1"
          >
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
            className=" mt-1  pl-3  divide-y-1 divide-color-gray-100 divide-solid  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md "
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
          >
            {listitems.map((listitem) => (
              <option key={listitem} className="text-gray-500 px-1 divide-y-1 py-2 hover:bg-teal-300" value={listitem}>
                {listitem}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default InputTagsDropDown;
