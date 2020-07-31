import React from "react";

const SelectList = ({ label, value, list, onChange = (e) => console.log }) => {
  return (
    <div className="border-gray-50 p-2 m-2 rounded">
      {/* <FormControl variant="outlined" className={classes.formControl}> */}
      <label className="flex mr-4 items-center px-4">
        <span className="text-gray-700">{label}</span>
        <select className="form-select block w-full mt-1 ml-2" value={value} onChange={(e) => onChange(e.target.value)}>
          {list.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectList;
