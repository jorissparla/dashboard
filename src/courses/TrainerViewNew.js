import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import _ from "lodash";
//import { format } from 'date-fns';
import { FormattedDate } from "../utils/FormattedDate";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
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
});

const QUERY_TRAINERS = gql`
  query QUERY_TRAINERS($from: String!, $to: String!) {
    trainers(from: $from, to: $to) {
      trainer
      totalhours
      totalcourses
    }
  }
`;

const HeaderColumn = ({ style, children }) => {
  const newStyle = { ...styles.headerStyle, style, fontSize: 18 };
  return <TableCell style={newStyle}>{children}</TableCell>;
};

class TrainerView extends React.Component {
  render() {
    console.log("Trainers");
    const { from, to, classes } = this.props;

    return (
      <Query
        query={QUERY_TRAINERS}
        variables={{
          from: FormattedDate(from),
          to: FormattedDate(to)
        }}
      >
        {({ data, loading }) => {
          if (loading) return "Loading";
          const { trainers } = data;
          return (
            <Table className={classes.headerStyle}>
              <TableHead>
                <TableRow>
                  <HeaderColumn>TRAINER</HeaderColumn>
                  <HeaderColumn>COURSES</HeaderColumn>
                  <HeaderColumn>HOURS</HeaderColumn>
                </TableRow>
              </TableHead>
              <TableBody>
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
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(TrainerView);
