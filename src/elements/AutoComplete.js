import React, { useState, useEffect } from "react";
export default function AutoComplete({ support = [], value = "", disabled = true, onChangeValue = (v) => console.log(v) }) {
  // ;

  useEffect(() => {
    const x = support
      // map((s) => s.fullname).
      .sort((a, b) => (a > b ? 1 : -1));
    setNames(x);
  }, []);

  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [selected, setSelected] = useState("");

  const filterStates = (e) => {
    console.log(e.target.value);
    const x = e.target.value;
    setFilteredStates(names.filter((n) => n.toLowerCase().startsWith(x.toLowerCase())).slice(0, 9));
  };

  function setSelectedName(name) {
    setSelected(name);
    setName(name);
    setFilteredStates([]);
    onChangeValue(name);
  }

  function hide() {
    setFilteredStates([]);
  }
  return (
    <div className="" onClick={hide}>
      <div className=" z-50">
        <input
          placeholder="type name to enter"
          className="form-input"
          autoComplete="off"
          disabled={disabled}
          onInput={filterStates}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {filteredStates.length !== 0 && name.length !== 0 && (
          <ul className="list-none  absolute z-50 flex flex-col border-gray-50 border  w-96 shadow-lg ">
            {filteredStates.map((x) => (
              <li className="z-50 pl-2 bg-white relative cursor-pointer border-b hover:text-pink-600  py-2" onClick={() => setSelectedName(x)}>
                {x}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* {JSON.stringify(names)} */}
    </div>
  );
}
