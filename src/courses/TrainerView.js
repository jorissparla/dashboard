import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _ from "lodash";
import { format } from "date-fns";

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
  return <TableCell style={newStyle}>{children}</TableCell>;
};

class TrainerView extends React.Component {
  render() {
    const {
      data: { loading, trainers }
    } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    console.log("Trainers", trainers);
    return <div>{this.renderTrainers(trainers || [])}</div>;
  }
  renderTrainers = trainers => {
    return (
      <Table headerStyle={styles.headerStyle}>
        <TableHead adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <HeaderColumn>TRAINER</HeaderColumn>
            <HeaderColumn>COURSES</HeaderColumn>
            <HeaderColumn>HOURS</HeaderColumn>
          </TableRow>
        </TableHead>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {trainers.map(({ trainer, totalcourses, totalhours }, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{trainer}</TableCell>
                <TableCell>{totalcourses}</TableCell>
                <TableCell>{totalhours}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };
}

const trainerQuery = gql`
  query trainerQuery($from: String!, $to: String!) {
    trainers(from: $from, to: $to) {
      trainer
      totalhours
      totalcourses
    }
  }
`;
export default graphql(trainerQuery, {
  options: props => ({
    variables: {
      from: format(Date.parse(props.from), "YYYY-MM-DD"),
      to: format(Date.parse(props.to), "YYYY-MM-DD")
    }
  })
})(TrainerView);
