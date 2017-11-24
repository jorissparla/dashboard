import React from "react";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import PropTypes from "prop-types";
const PlannedCoursesTable = ({ data, config }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {config.map(({ header }) => <TableHeaderColumn>{header.toUpperCase()}</TableHeaderColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(item => (
        <TableRow>
          {config.map(({ field }) => <TableRowColumn>{item[field]}</TableRowColumn>)}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

PlannedCoursesTable.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.arrayOf(PropTypes.object)
};
