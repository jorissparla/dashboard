import { PRODUCT_LIST, PRODUCT_LIST_EXT, REGION_LIST, REGION_LIST_2 } from "pages/Stats";
import React, { useState } from "react";

import AutoComplete from "elements/AutoComplete";
import { Switch } from "@material-ui/core";
import TWMulticheck from "elements/TWMulticheck";
import { usePersistentState } from "hooks";

export const SelectionForm = ({ classes, initialValue, valuesChanged, isValidSuperUser, onChange, onNavigateToParams, accounts }) => {
  const [selectedProducts, setSelectedProducts] = usePersistentState("selectedproducts_1", ["LN"]);
  const [selectedRegions, setSelectedRegions] = usePersistentState("selectedRegions", ["EMEA"]);
  const [ownerVal, setOwnerVal] = useState(initialValue.owner);
  const [region, setRegion] = usePersistentState("region", "EMEA");
  const [showDropDown, toggle] = useState(false);
  const [allOwners, toggleAllOwners] = useState(false);

  const getPersons = () => {
    const item = window.localStorage.getItem("worklist.favorite.persons");
    let persons = JSON.parse(item);
    return persons ? persons.sort() : [];
  };

  function toggleSet(value) {
    console.log("toggle selectedProducts", selectedProducts, value);
    if (selectedProducts.indexOf(value) >= 0) {
      setSelectedProducts(selectedProducts.filter((prod) => prod !== value));
    } else {
      setSelectedProducts(selectedProducts.concat(value));
    }
  }

  function handleSetSelectedRegions(value) {
    console.log(value);
    setSelectedRegions(value);
  }
  function getValue(value) {
    return selectedProducts.indexOf(value) >= 0;
  }
  const persons = getPersons() || [];

  const handleSelect = ({ target: { value } }) => {
    toggleDropDown();
    console.log(value);
    setRegion(value);
  };
  function toggleDropDown() {
    toggle(!showDropDown);
  }
  const support = accounts ? accounts.map((s) => s.fullname).sort((a, b) => (a > b ? 1 : -1)) : [];
  return (
    // <Paper className={classes.paper2}>
    <div className="mb-4 rounded shadow-lg bg-white px-3 py-2 flex items-center w-full text-gray-700 flex-wrap">
      <AutoComplete support={support} value={ownerVal} disabled={!isValidSuperUser} onChangeValue={(name) => setOwnerVal(name)} />

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
          console.log(selectedRegions);
          onChange({
            owner: ownerVal,
            products: selectedProducts,
            region: region,
            regions: selectedRegions,
          });
        }}
      >
        Search
      </button>

      <div className="border border-gray-200 p-2 m-2 rounded">
        {PRODUCT_LIST_EXT.map((product) => (
          <label className="inline-flex items-center" key={product.id}>
            {/* control={ */}
            <input
              type="checkbox"
              className="form-checkbox mx-2"
              defaultChecked={getValue(product.id)}
              onChange={() => toggleSet(product.id)}
              value={getValue(product.id)}
              color="primary"
            />
            <span className="mr-3">{product.name}</span>
          </label>
        ))}
      </div>
      {/* <TWMulticheck initialValue={selectedRegions} onChange={handleSetSelectedRegions} allValues={REGION_LIST} /> */}
      <div className="border-gray-50 p-2 m-2 rounded">
        {/* <FormControl variant="outlined" className={classes.formControl}> */}
        <div className="relative inline-block text-left">
          <div>
            <span className="rounded-md shadow-sm">
              <button
                type="button"
                onClick={toggleDropDown}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              >
                {region || "EMEA"}
                <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>

          {showDropDown && (
            <div className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-2xl">
              <div className="rounded-lg bg-white shadow-xs">
                <div className="pt-0">
                  {REGION_LIST_2.map((region, index) => (
                    <>
                      {index === REGION_LIST_2.length - 1 ? (
                        <button
                          value={region.value}
                          onClick={handleSelect}
                          className="z-50 block font-semibold px-4 py-2 text-sm leading-5 w-full bg-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        >
                          {region.title}
                        </button>
                      ) : (
                        <>
                          <button
                            value={region.value}
                            onClick={handleSelect}
                            className="z-50 block px-4 py-2 text-sm font-medium leading-5 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          >
                            {region.title}
                          </button>
                          <div className="border-t border-gray-200"></div>
                        </>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tracking-wide inline-flex items-center">
        <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"></path>
        </svg>
        last updated {initialValue?.lastUpdated || "Data not available yet"}
      </div>
      {/* {isValidSuperUser && ( */}
      <button className="btn-tw bg-pink-200 text-pink-800 hover:bg-pink-300" onClick={onNavigateToParams}>
        Parameters
      </button>
      {/* )} */}
      {persons && persons.length > 0 && (
        <label className="flex mr-4 items-center px-4">
          <span className="text-gray-700">People</span>
          <select className="form-select block w-full mt-1 ml-2" value={ownerVal} onChange={(e) => setOwnerVal(e.target.value)}>
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
