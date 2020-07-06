import { Button, Grid } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Filter } from "../details/components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  search: {
    flexGrow: 1,
    maxWidth: 480,
    flexBasis: 480,
  },
  filterButton: {
    marginLeft: "auto",
  },
  filterIcon: {
    marginRight: theme.spacing(1),
  },
}));

const FancyFilter = (props) => {
  const { onFilter } = props;
  const [filterActive, setFilterActive] = useState(false);

  const classes = useStyles();

  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  function handleSetFilterActive(value) {
    setFilterActive(value);
  }
  return (
    <>
      <div className="flex flex-col">
        <Button className={classes.filterButton} color="primary" onClick={handleFilterOpen} size="small" variant="outlined">
          <FilterListIcon className={classes.filterIcon} /> Show filters {filterActive ? "***" : ""}
        </Button>
        {filterActive && <span className="bg-teal-200 text-teal-700 text-sm font-sans my-1 p-2">Filter is active</span>}
      </div>
      <Filter
        onClose={handleFilterClose}
        onFilter={(v) => {
          onFilter(v);
          handleFilterClose();
        }}
        open={openFilter}
        onhandleSetFilterActive={setFilterActive}
      />
    </>
  );
};

FancyFilter.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
};

export default FancyFilter;
