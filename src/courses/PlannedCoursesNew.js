import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import TrashIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { blue, red, grey, purple } from '@material-ui/core/colors';
import { format } from 'date-fns';
import { withRouter } from 'react-router';
import { Title, HeaderRow, HeaderLeft, HeaderRight } from '../styles';
import withAuth from '../utils/withAuth';
import EditStudentsOnCourse from './EditStudentsOnCourse';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    padding: '10px',
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

const PLANNEDCOURSE_DELETE_MUTATION = gql`
  mutation PLANNEDCOURSE_DELETE_MUTATION($input: InputPlannedCourseType) {
    deletePlannedCourse(input: $input) {
      text
    }
  }
`;

const QUERY_SCHEDULED_COURSES = gql`
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
  return format(val, 'ddd, DD MMM YYYY');
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
    console.log('TTTTTT', this.state);
    return (
      <Query query={QUERY_SCHEDULED_COURSES} variables={{ nid: id }}>
        {props => {
          if (props.loading) {
            return 'loading';
          }
          console.log('props', props);
          if (!props.data) return 'Loading...';
          const { course } = props.data;
          console.log('plannedcourses', course);
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
                    "Back to Courses"
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
                                console.log(selected, plan.id);
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
                          <TrashIcon onClick={() => console.log(plan.id)} />
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
export { QUERY_SCHEDULED_COURSES };