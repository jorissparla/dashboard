import React, { useState } from "react";

import { Filter } from "../details/components";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "elements/ModalComponent";
import PropTypes from "prop-types";
import TWButton from "elements/TWButton";

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
      <div className="flex flex-row">
        {filterActive && <span className="bg-green-200 text-green-700 text-sm font-pop my-1 p-2">Filter is active</span>}
        <TWButton color="green" onClick={handleFilterOpen}>
          <FilterListIcon className="mx-2" /> Show filter
        </TWButton>
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
