import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _ from "lodash";

const styles = {
  headerStyle: {
    fontSize: 18
  },
  button: {
    margin: 12,
    background: "#2196f3"
  },
  tabStyle: {
    backgroundColor: "#2196f3",
    fontSize: "1rem"
  },
  datePicker: {
    marginLeft: 12,
    width: 150
  }
};

const HeaderColumn = ({ style, children }) => {
  const newStyle = _.extend({}, styles.headerStyle, style);
  return <TableHeaderColumn style={newStyle}>{children}</TableHeaderColumn>;
};

class TrainerView extends React.Component {
  render() {
    const { data: { loading, trainers } } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return <div>{this.renderTrainers(trainers)}</div>;
  }
  renderTrainers = trainers => {
    return (
      <Table headerStyle={styles.headerStyle}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <HeaderColumn>TRAINER</HeaderColumn>
            <HeaderColumn>COURSES</HeaderColumn>
            <HeaderColumn>HOURS</HeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {trainers.map(({ trainer, totalcourses, totalhours }, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>{trainer}</TableRowColumn>
                <TableRowColumn>{totalcourses}</TableRowColumn>
                <TableRowColumn>{totalhours}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };
}

const trainerQuery = gql`
  query trainerQuery($from: String, $to: String) {
    trainers(from: $from, to: $to) {
      trainer
      totalhours
      totalcourses
    }
  }
`;
export default graphql(trainerQuery, {
  options: props => ({
    variables: { from: props.from, to: props.to }
  })
})(TrainerView);
