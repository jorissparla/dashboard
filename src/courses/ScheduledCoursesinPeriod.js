import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import _ from "lodash";
import { LongFormattedDate } from "../utils/FormattedDate";

const HeaderColumn = ({ style, children }) => {
  const newStyle = _.extend({}, { fontSize: 18 }, style);
  return <TableCell style={newStyle}>{children}</TableCell>;
};

const COURSESINPERIOD = gql`
  query COURSESINPERIOD($startdate: String!) {
    plannedcourses(startdate: $startdate) {
      id
      startdate
      status
      students {
        fullname
      }
      course {
        id
        title
        description
      }
    }
  }
`;

const ScheduledCoursesInPeriod = ({ startdate }) => {
  return (
    <Query query={COURSESINPERIOD} variables={{ startdate }}>
      {({ data, loading }) => {
        if (loading) {
          return "loading";
        }
        const { plannedcourses } = data;
        return (
          <Table ref="id_table">
            <TableHead>
              <TableRow>
                <HeaderColumn>TITLE</HeaderColumn>
                <HeaderColumn style={{ width: 300 }}>DESCRIPTION</HeaderColumn>
                <HeaderColumn style={{ width: 90 }}>STATUS</HeaderColumn>
                <HeaderColumn>ID</HeaderColumn>
                <HeaderColumn style={{ width: 20 }}>
                  <span role="img" aria-label="people">
                    👤
                  </span>
                </HeaderColumn>
                <HeaderColumn>COURSE DATE</HeaderColumn>
              </TableRow>
            </TableHead>
            <TableBody>
              {plannedcourses.map(({ course, id, status, students, startdate }) => (
                <TableRow key={id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell style={{ width: 300 }}>{course.description}</TableCell>
                  <TableCell style={{ width: 90 }}>{status}</TableCell>
                  <TableCell>
                    <Link to={`/courses/edit/${course.id}`}>View Course</Link>
                  </TableCell>
                  <TableCell style={{ width: 20 }}>{students.length}</TableCell>
                  <TableCell>{LongFormattedDate(startdate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      }}
    </Query>
  );
};

export default ScheduledCoursesInPeriod;
