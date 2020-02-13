import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { format } from '../utils/format';
import { withRouter } from 'react-router';
import { LongFormattedDate } from './../utils/FormattedDate';
import { Title, HeaderRow, HeaderLeft, HeaderRight } from '../styles';
import withAuth from '../utils/withAuth';
import EditStudentsOnCourse from './EditStudentsOnCourse';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    minWidth: '200px'
  },
  headerStyle: {
    fontSize: 18,
    width: 200
  },
  headerStyleSmall: {
    fontSize: 18,
    width: 90
  },
  rowStyle: {
    fontSize: 18,
    width: 200
  },
  rowStyleSmall: {
    fontSize: 18,
    width: 90
  },
  button: {
    margin: 12
  },
  button2: {
    margin: 12,
    backgroundColor: 'black',
    primaryColor1: 'black'
  },
  buttonback: {
    margin: 12,
    backgroundColor: 'orange'
  },

  iconStyle0: {
    width: 24,
    color: 'black'
  },
  iconStyle: {
    width: 24,
    color: blue
  },
  iconStyle2: {
    marginLeft: 5,
    width: 24,
    color: red
  }
});

export const PLANNEDCOURSE_DELETE_MUTATION_1 = gql`
  mutation PLANNEDCOURSE_DELETE_MUTATION_1($input: InputPlannedCourseType) {
    deletePlannedCourse(input: $input) {
      text
    }
  }
`;

export const FRAGMENT_PLANNED_COURSE = gql`
  fragment PlannedCourseDetails on PlannedCourseRequest {
    id
    startdate
    enddate
    trainer
    hours
    studentcount
    details
    students {
      fullname
    }
  }
`;

export const QUERY_SCHEDULED_COURSES = gql`
  query QUERY_SCHEDULED_COURSES($nid: ID) {
    course(id: $nid) {
      id
      title
      plannedcourses {
        id
        startdate
        enddate
        trainer
        hours
        studentcount
        students {
          fullname
        }
      }
    }
  }
`;

const fmtDate = val => {
  console.log(val, format(Date.parse(val), 'EEE, dd MMM yyyy'));
  return LongFormattedDate(val);
};

const HeaderColumn = ({ children, small }) => {
  if (small) {
    return <TableCell style={styles.headerStyleSmall}>{children}</TableCell>;
  } else return <TableCell style={styles.headerStyle}>{children}</TableCell>;
};

const RowColumn = ({ children, small }) => {
  if (small) {
    return <TableCell style={styles.rowStyleSmall}>{children}</TableCell>;
  } else return <TableCell style={styles.rowStyle}>{children}</TableCell>;
};

class PlannedCoursesTableNew extends React.Component {
  state = {
    selected: ''
  };
  render() {
    const { classes, authenticated } = this.props;
    const id = this.props.match.params.id;
    const { selected } = this.state;
    return (
      <Query query={QUERY_SCHEDULED_COURSES} variables={{ nid: id }}>
        {props => {
          if (props.loading) {
            return 'loading';
          }
          if (!props.data) return 'Loading...';
          const { course } = props.data;
          return (
            <React.Fragment>
              <HeaderRow>
                <HeaderLeft>
                  <Title>
                    Scheduled Courses for <strong>{course.title}</strong>
                  </Title>
                </HeaderLeft>
                <HeaderRight>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonback}
                    onClick={() => this.props.history.push(`/courses/edit/${course.id}`)}
                  >
                    Back to Course
                  </Button>

                  <Button
                    label="New"
                    variant="contained"
                    color="primary"
                    enabled={authenticated.toString()}
                    className={classes.button}
                    onClick={() => this.props.history.push(`/scheduledcourses/${course.id}/new`)}
                  >
                    New
                  </Button>
                </HeaderRight>
              </HeaderRow>

              <Table>
                <TableHead>
                  <TableRow>
                    <HeaderColumn>STARTDATE</HeaderColumn>
                    <HeaderColumn>ENDDATE</HeaderColumn>
                    <HeaderColumn small={true}>TRAINER</HeaderColumn>
                    <HeaderColumn small={true}>STATUS</HeaderColumn>
                    <HeaderColumn small={true}>HOURS</HeaderColumn>
                    <HeaderColumn small={true}>STUDENTS</HeaderColumn>
                    <HeaderColumn small={true}> </HeaderColumn>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {course.plannedcourses.map((plan, index) => (
                    <React.Fragment key={index}>
                      <TableRow key={index}>
                        <RowColumn>{fmtDate(plan.startdate)}</RowColumn>
                        <RowColumn>{fmtDate(plan.enddate)}</RowColumn>
                        <RowColumn small={true}>{plan.trainer}</RowColumn>
                        <RowColumn small={true}>{plan.status}</RowColumn>
                        <RowColumn small={true}>{plan.hours}</RowColumn>
                        <RowColumn small={true}>
                          {plan.studentcount}{' '}
                          {
                            <PeopleIcon
                              title="Edit registration"
                              onClick={e => {
                                this.setState({ selected: plan.id });
                                /*  if (selected === plan.id) {
                                  this.setState({ selected: '' });
                                } else {
                                  this.setState({ selected: plan.id });
                                } */
                                //  this.editRegisterClick();
                              }}
                            />
                          }
                        </RowColumn>
                        <RowColumn small={true}>
                          <EditIcon
                            onClick={() =>
                              this.props.history.push(
                                `/scheduledcourses/${course.id}/edit/${plan.id}`
                              )
                            }
                          />
                          {/* <TrashIcon onClick={() => console.log(plan.id)} /> */}
                        </RowColumn>
                      </TableRow>
                      {selected === plan.id && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <EditStudentsOnCourse
                              id={plan.id}
                              initialValues={{ students: plan.students }}
                              onChange={state => {
                                console.log('State', state);
                                //this.setState({ selected: '' });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(withStyles(styles)(withRouter(PlannedCoursesTableNew)));
