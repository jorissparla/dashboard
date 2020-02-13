import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import _ from 'lodash';
//import format from 'date-fns/format';
import { format } from '../utils/format';
import Spinner from 'utils/spinner';

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
      trainer
      course {
        id
        title
        description
      }
    }
  }
`;

const ScheduledCoursesInPeriod = ({ startdate }) => {
  const { data, loading } = useQuery(COURSESINPERIOD, { variables: { startdate } });
  if (loading) {
    return <Spinner />;
  }
  const { plannedcourses } = data;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeaderColumn style={{ width: 200 }}>TITLE</HeaderColumn>
          <HeaderColumn style={{ width: 600 }}>DESCRIPTION</HeaderColumn>
          <HeaderColumn style={{ width: 90 }}>STATUS</HeaderColumn>
          <HeaderColumn style={{ width: 90 }}>TRAINER</HeaderColumn>
          <HeaderColumn style={{ width: 90 }}>ID</HeaderColumn>
          <HeaderColumn style={{ width: 20 }}>
            <span role="img" aria-label="people">
              👤
            </span>
          </HeaderColumn>
          <HeaderColumn>COURSE DATE</HeaderColumn>
        </TableRow>
      </TableHead>
      <TableBody>
        {plannedcourses.map(({ course, id, status, students, trainer, startdate }) => (
          <TableRow key={id}>
            <TableCell>{course.title}</TableCell>
            <TableCell style={{ width: 300 }}>{course.description}</TableCell>
            <TableCell style={{ width: 90 }}>{status}</TableCell>
            <TableCell style={{ width: 90 }}>{trainer}</TableCell>
            <TableCell>
              <Link to={`/courses/edit/${course.id}`}>View Course</Link>
            </TableCell>
            <TableCell style={{ width: 20 }}>{students.length}</TableCell>
            <TableCell>{format(Date.parse(startdate), 'EEE, dd-MMM-yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduledCoursesInPeriod;
