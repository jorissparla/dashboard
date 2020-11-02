import React, { useState, useEffect } from "react";
export default function AutoComplete({ support = [], value = "", disabled = true, onChangeValue = (v) => console.log(v) }) {
  const x = support
    // map((s) => s.fullname).
    .sort((a, b) => (a > b ? 1 : -1));

  useEffect(() => {
    const x = support
      // map((s) => s.fullname).
      .sort((a, b) => (a > b ? 1 : -1));
    setNames(x);
    // console.log("useeffect", support);
    // setFilteredNames(x.filter((n) => n.toLowerCase().startsWith(x.toLowerCase())).slice(0, 9));
  }, []);

  const [name, setName] = useState(value);
  const [names, setNames] = useState(
    support
      // map((s) => s.fullname).
      .sort((a, b) => (a > b ? 1 : -1))
  );

  const [filteredNames, setFilteredNames] = useState([]);
  const [selected, setSelected] = useState("");

  const filterNames = (e) => {
    console.log(e.target.value);
    const x = e.target.value;
    setFilteredNames(names.filter((n) => n.toLowerCase().startsWith(x.toLowerCase())).slice(0, 9));
  };

  function setSelectedName(name) {
    setSelected(name);
    setName(name);
    setFilteredNames([]);
    onChangeValue(name);
  }

  function hide() {
    setFilteredNames([]);
  }
  // console.log("render", names.length, support.length, filteredNames.length);
  return (
    <div className="" onClick={hide}>
      <div className=" z-50">
        <input
          placeholder="type name to enter"
          className="form-input"
          autoComplete="off"
          disabled={disabled}
          onInput={filterNames}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {filteredNames.length !== 0 && name.length !== 0 && (
          <ul className="list-none  absolute z-50 flex flex-col border-gray-50 border  w-96 shadow-lg ">
            {filteredNames.map((x) => (
              <li
                key={x}
                className="z-50 pl-2 bg-white relative cursor-pointer border-b hover:text-pink-600  py-2"
                onClick={() => setSelectedName(x)}
              >
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
