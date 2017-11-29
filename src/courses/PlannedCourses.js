import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import _ from "lodash";
import styled from "styled-components";

const styles = {
  headerStyle: {
    fontSize: 18
  },
  button: {
    margin: 12,
    background: "#2196f3"
  }
};

const Title = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
`;

const HeaderColumn = ({ style, children }) => {
  const newStyle = _.extend({}, styles.headerStyle, style);
  return <TableHeaderColumn style={newStyle}>{children}</TableHeaderColumn>;
};

const PlannedCoursesTable = ({ planned, rowSelected }) => (
  <div>
    <Title>Scheduled</Title>
    <Table
      onRowSelection={e =>
        rowSelected && e.length > 0 ? rowSelected(planned[e[0]]) : console.log(e)}
    >
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <HeaderColumn>STARTDATE</HeaderColumn>
          <HeaderColumn>ENDDATE</HeaderColumn>
          <HeaderColumn>STATUS</HeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {planned.map(plan => (
          <TableRow key={plan.id}>
            <TableRowColumn>{plan.startdate}</TableRowColumn>
            <TableRowColumn>{plan.enddate}</TableRowColumn>
            <TableRowColumn>{plan.status}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PlannedCoursesTable;
