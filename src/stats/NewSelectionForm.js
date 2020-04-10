import { FormControl, Switch } from "@material-ui/core";
import { usePersistentState } from "hooks";
import { PRODUCT_LIST, REGION_LIST } from "pages/Stats";
import React, { useState } from "react";
import { ListFavoritePersons } from "./FavoritesPersons";

export const SelectionForm = ({
  classes,
  initialValue,
  valuesChanged,
  isValidSuperUser,
  onChange,
  onNavigateToParams,
}) => {
  const [
    selectedProducts,
    setSelectedProducts,
  ] = usePersistentState("selectedproducts", ["LN"]);
  const [ownerVal, setOwnerVal] = useState(initialValue.owner);
  const [person, setPerson] = useState("");
  const [region, setRegion] = usePersistentState("region", "EMEA");
  const [actionNeeded, setActionNeeded] = useState(false);
  const [allOwners, toggleAllOwners] = useState(false);

  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const getPersons = () => {
    const item = window.localStorage.getItem("worklist.favorite.persons");
    let persons = JSON.parse(item);
    return persons ? persons.sort() : [];
  };

  // React.useEffect(() => {
  //   doAddPersonToLocalStorage(initialValue.owner);
  // }, []);

  const doAddPersonToLocalStorage = (newPerson) => {
    const item = window.localStorage.getItem("worklist.favorite.persons");
    let persons = [];
    if (!item || item.length === 0) {
      persons = [];
    } else {
      persons = JSON.parse(item);
      console.log("do", item, persons, typeof persons);
    }
    persons = persons
      .filter((person) => newPerson !== person.name)
      .concat({ name: newPerson });

    window.localStorage.setItem(
      "worklist.favorite.persons",
      JSON.stringify(persons)
    );
    // setPersons(persons);
    return persons;
  };

  function toggleSet(value) {
    console.log("toggle selectedProducts", selectedProducts, value);
    if (selectedProducts.indexOf(value) >= 0) {
      setSelectedProducts(selectedProducts.filter((prod) => prod !== value));
    } else {
      setSelectedProducts(selectedProducts.concat(value));
    }
  }

  function getValue(value) {
    return selectedProducts.indexOf(value) >= 0;
  }
  const persons = getPersons() || [];
  console.log(persons);
  return (
    // <Paper className={classes.paper2}>
    <div className="mb-4 rounded shadow-lg bg-white px-3 py-2 flex items-center w-full text-gray-700 flex-wrap">
      <div className="rounded-md shadow-sm">
        <input
          className="form-input"
          type="text"
          placeholder="enter name of person"
          value={ownerVal}
          disabled={!isValidSuperUser}
          onChange={(event) => {
            setOwnerVal(event.target.value);
          }}
          onMouseDown={(e) => {
            console.log(e);
            if (e.nativeEvent.which === 3) {
              doAddPersonToLocalStorage(ownerVal);
            }
          }}
        />
      </div>
      {/* <TextField
        value={ownerVal}
        disabled={!isValidSuperUser}
        onMouseDown={(e) => {
          if (e.nativeEvent.which === 3) {
            doAddPersonToLocalStorage(ownerVal);
          }
        }}
        onChange={(event) => {
          setOwnerVal(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            console.log(event.target);
          }
        }}
        placeholder="name of person"
      /> */}
      {/* {isValidSuperUser && <FormLabel>Clear Owner / All Owners</FormLabel>} */}
      {isValidSuperUser && (
        <label className="ml-2">
          All owners
          <Switch
            checked={allOwners}
            onChange={(e) => {
              if (!allOwners) {
                setOwnerVal("");
              } else {
                setOwnerVal(initialValue.owner);
              }
              toggleAllOwners(!allOwners);
            }}
            value={allOwners}
            color="primary"
          />
        </label>
      )}
      <button
        color="primary"
        className="btn-tw bg-purp text-white mr-3"
        // disabled={!criteriaChange}
        variant="contained"
        onClick={() => {
          onChange({
            owner: ownerVal,
            products: selectedProducts,
            region: region,
          });
        }}
      >
        Search
      </button>
      {/* <FormLabel> Only Actions Needed</FormLabel>
      <Switch
        checked={actionNeeded}
        onChange={(e) => {
          setActionNeeded(!actionNeeded);
        }}
        value={actionNeeded}
        color="secondary"
      /> */}
      <div className="border border-gray-200 p-2 m-2 rounded">
        {PRODUCT_LIST.map((product) => (
          <label className="inline-flex items-center" key={product}>
            {/* control={ */}
            <input
              type="checkbox"
              className="form-checkbox mx-2"
              defaultChecked={getValue(product)}
              onChange={() => toggleSet(product)}
              value={getValue(product)}
              color="primary"
            />
            <span className="mr-3">{product}</span>
          </label>
        ))}
      </div>
      <div className="border-gray-50 p-2 m-2 rounded">
        {/* <FormControl variant="outlined" className={classes.formControl}> */}
        <label className="flex mr-4 items-center px-4">
          <span className="text-gray-700">Region</span>
          <select
            className="form-select block w-full mt-1 ml-2"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {REGION_LIST.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        {/* <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Region
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          labelWidth={labelWidth}
        >
          {REGION_LIST.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select> */}
        {/* </FormControl>
         */}
      </div>
      <div className="tracking-wide inline-flex items-center">
        <svg
          className="fill-current w-4 h-4 text-gray-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"></path>
        </svg>
        last update {initialValue.lastUpdated}
      </div>
      {isValidSuperUser && (
        <button
          className="btn-tw bg-pink-200 text-pink-800 hover:bg-pink-300"
          onClick={onNavigateToParams}
        >
          Parameters
        </button>
      )}

      {persons && persons.length > 0 && (
        <label className="flex mr-4 items-center px-4">
          <span className="text-gray-700">People</span>
          <select
            className="form-select block w-full mt-1 ml-2"
            value={ownerVal}
            onChange={(e) => setOwnerVal(e.target.value)}
          >
            {persons.map(({ name }) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};
export default SelectionForm;
