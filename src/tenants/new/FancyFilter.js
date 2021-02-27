import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "elements/ModalComponent";
import TWButton from "elements/TWButton";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Filter } from "../details/components";

const FancyFilter = (props) => {
  const { onFilter, count = 0 } = props;
  const [filterActive, setFilterActive] = useState(false);
  console.log(count);
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  // function handleSetFilterActive(value) {
  //   setFilterActive(value);
  // }
  return (
    <>
      <div className="flex flex-col">
        <TWButton color="transp" onClick={handleFilterOpen}>
          <FilterListIcon className="mx-2" /> Show filters {filterActive ? "***" : ""}
        </TWButton>
        {filterActive && <span className="bg-teal-200 text-teal-700 text-sm font-sans my-1 p-2">Filter is active</span>}
      </div>
      <Filter
        onClose={handleFilterClose}
        onFilter={(v) => {
          onFilter(v);
          setFilterActive(true);
          handleFilterClose();
        }}
        open={openFilter}
        clearFilter={() => setFilterActive(false)}
        onhandleSetFilterActive={() => {
          console.log("toggle");
        }}
      />
      {/* <Modal visible={true} toggle={() => setOpenFilter(!openFilter)}>
        <h1>Header</h1>
        <p>paragraph</p>
        <input className="form-input" type="text" />
      </Modal> */}
    </>
  );
};

FancyFilter.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
};

export default FancyFilter;
