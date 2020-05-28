import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FontIcon from "@material-ui/core/Icon";
import ActionSearch from "@material-ui/icons/Search";

export default ({
  onChange,
  hintText = "Search..",
  defaultValue = "",
  searchOnEnter = false,
  width = "100%",
  style = { display: "flex", marginBottom: 10, alignItems: "center" },
  shade = true,
}) => {
  const [val, setVal] = useState(defaultValue || "");
  const [changed, setChanged] = useState(false);

  const changeSearchFor = _.debounce(setChanged, 1000);
  const handleChange = useCallback(changeSearchFor, []);
  // console.log(val);
  useEffect(() => {
    onChange(val);
  }, [changed]);
  return (
    <div className="w-full bg-white py-2 flex  pt-1 mt-2">
      <div className="w-full lg:px-6 xl:w-3/4 xl:px-12 sm:px-4">
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
          </div>
          {searchOnEnter ? (
            <input
              id="email"
              className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
              placeholder={hintText}
              value={val}
              onChange={({ target: { value } }) => setVal(value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleChange(true);
                } else {
                  handleChange(false);
                }
              }}
            />
          ) : (
            <input
              id="email"
              className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
              placeholder={hintText}
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
                handleChange(!changed);
              }}
            />
          )}
        </div>
      </div>

      {/* <FontIcon style={{ margin: "10px" }}>
        <ActionSearch />
      </FontIcon>
      {searchOnEnter ? (
        <TextField
          label={hintText}
          placeholder={hintText + "x"}
          value={val}
          onChange={({ target: { value } }) => setVal(value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              onChange(val);
            }
          }}
          fullWidth={true}
          style={{ color: "black", padding: 1, marginBottom: 10 }}
        />
      ) : (

        <TextField
          label={hintText}
          defaultValue={defaultValue}
          placeholder={hintText}
          onChange={(e) => onChange(e.target.value)}
          fullWidth={true}
          style={{ color: "black", padding: 1, marginBottom: 10 }}
        />
      )} */}
    </div>
  );
};
