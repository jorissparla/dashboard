import React, { useState, useEffect } from "react";
import _ from "lodash";
export default function AutoComplete({
  support = [],
  value = "",
  disabled = true,
  onChangeValue = (v) => console.log(v),
  searchTextFromStart = true,
}) {
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
  console.log(name, value);
  function searchFromStart(data, value) {
    return data.filter((n) => n.toLowerCase().startsWith(value.toLowerCase()));
  }
  function searchInText(data, value) {
    return data.filter((n) => _.includes(n.toLowerCase(), value.toLowerCase()));
  }
  const filterNames = (e) => {
    const x = e.target.value;
    if (searchTextFromStart) {
      console.log("bla");
      setFilteredNames(searchFromStart(names, x).slice(0, 9));
    } else {
      setFilteredNames(searchInText(names, x).slice(0, 9));
    }
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

  function handleKeyDown(e) {
    // key down
    if (e.keyCode === 40 && filteredNames.length === 1) {
      setSelected(name);
      setName(name);
      setFilteredNames([]);
    }
  }
  // console.log("render", names.length, support.length, filteredNames.length);
  return (
    <div className="flex" onClick={hide}>
      <div className=" z-50 ">
        <input
          placeholder="type name to enter"
          className="form-input w-96"
          autoComplete="off"
          type="text"
          disabled={disabled}
          onInput={filterNames}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
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
