import React, { useState } from "react";

import { usePersistentState } from "hooks";

const regions = ["APJ", "EMEA", "NA", "LA"];
const TWMulticheck = ({ allValues = regions, initialValues = [], onChange = (e) => console.log("change") }) => {
  const [getValues, setValues] = usePersistentState("regionValues", initialValues);

  function toggleSet(value: string) {
    console.log("toggle selectedValues", getValues, value);
    let newValues = [];
    if (getValues.indexOf(value) >= 0) {
      newValues = getValues.filter((prod: string) => prod !== value);
    } else {
      newValues = getValues.concat(value);
    }
    setValues(newValues);
    onChange(newValues);
  }

  function getValue(value: string) {
    return getValues.indexOf(value) >= 0;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="border border-gray-200 p-2 m-2 rounded">
        {allValues.map((product) => (
          <label className="inline-flex items-center" key={product}>
            {/* control={ */}
            <input
              type="checkbox"
              className="form-checkbox mx-2"
              defaultChecked={getValue(product)}
              onChange={() => toggleSet(product)}
              value={product}
              color="primary"
            />
            <span className="mr-3">{product}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default TWMulticheck;
