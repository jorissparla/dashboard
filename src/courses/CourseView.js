import React from "react";
import styled from "styled-components";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import addDays from "date-fns/add_days";
import format from "date-fns/format";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import AddCourseDialog from "./AddCourseDialog";
import StudentListContainer from "./StudentListContainer";
import TrainerView from "./TrainerView";
import StudentChip from "./StudentChip";

const StudentChipList = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2px;
  color: hsla(0, 0%, 93%, 1);
  border-radius: 4px;
  border: solid 1px lightgray;
`;

const Title2 = styled.h3`
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Raleway;
  padding-left: 30px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-grow: 5;
`;

const HeaderRight = styled.div``;

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
  textField: {
    margin: 10,
    width: 250
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
class CourseView extends React.Component {
  state = {
    startdate: format(addDays(new Date(), -7), "YYYY-MM-DD"),
    studentfilterstartdate: format(addDays(new Date(), -180), "YYYY-MM-DD"),
    studentfilterenddate: format(new Date(), "YYYY-MM-DD"),
    open: false,
    course: 1,
    value: "",
    minDate: null,
    defaultDate: new Date(),
    activeTab: "student",
    participants: { show: false, id: null, students: [] }
  };

  componentDidCatch(error) {
    //alert(JSON.stringify(error));
  }
  handleStartDateChange = (e, value) => {
    this.setState({ startdate: value });
  };
  handleStudentFilterStartDateChange = (e, value) => {
    this.setState({ studentfilterstartdate: value });
  };
  handleStudentFilterEndDateChange = (e, value) => {
    this.setState({ studentfilterenddate: value });
  };

  handleChange = (event, index, course) => {
    this.setState({ course });
  };
  toggleDialog = () => {
    this.setState({ open: !this.state.open });
  };

  renderCourses = courses => {
    return (
      <Table headerStyle={styles.headerStyle} ref="id_table">
        <TableHead adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <HeaderColumn>TITLE</HeaderColumn>
            <HeaderColumn style={{ width: 300 }}>DESCRIPTION</HeaderColumn>
            <HeaderColumn style={{ width: 90 }}>STATUS</HeaderColumn>
            <HeaderColumn>ID</HeaderColumn>
            <HeaderColumn style={{ width: 20 }}>👤</HeaderColumn>
            <HeaderColumn>COURSE DATE</HeaderColumn>
          </TableRow>
        </TableHead>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {courses.map(course => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell style={{ width: 300 }}>{course.description}</TableCell>
              <TableCell style={{ width: 90 }}>{course.plannedcourses[0].status}</TableCell>
              <TableCell>
                <Link to={`/courses/edit/${course.id}`}>View Course</Link>
              </TableCell>
              <TableCell
                style={{ width: 20 }}
                onMouseEnter={() =>
                  this.setState({
                    participants: { visible: true, id: course.id, students: course.students }
                  })
                }
                onMouseLeave={() => this.setState({ participants: { visible: false, id: null, students: [] } })}
              >
                {course.students.length}
              </TableCell>
              <TableCell>{format(course.plannedcourses[0].startdate, "ddd, DD-MMM-YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  export = () => {
    const tabel = this.refs;
    if (!window.tabel) {
      window.tabel = tabel;
    }

    console.log(tabel);
  };

  setYear = year => {
    this.setState({
      startdate: new Date(year, 0, 1),
      studentfilterstartdate: new Date(year, 0, 1),
      studentfilterenddate: new Date(year + 1, 0, 1),
      enddate: new Date(year + 1, 0, 1)
    });
  };
  render() {
    const { classes } = this.props;
    const { loading, error, courses, supportfolks } = this.props.data;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const filterDate = this.state.startdate;
    const { open, value, activeTab } = this.state;
    const { role } = this.props.user;
    const enabled = role === "Admin" || role === "PO";
    const currentYear = new Date().getFullYear();
    const filteredCourses = _.chain(courses)
      .filter(
        course =>
          course.plannedcourses[0] ? Date.parse(course.plannedcourses[0].startdate) > Date.parse(filterDate) : false
      )
      .orderBy(o => (o.plannedcourses[0] ? format(o.plannedcourses[0].startdate, "YYYYMMDD") : o.lastmodified), "desc")

      .value();
    console.log(this.state);
    return (
      <React.Fragment>
        <Tabs
          value={this.state.activeTab}
          onChange={(event, value) => {
            console.log("Value", value);
            this.setState({ activeTab: value });
          }}
        >
          <Tab label="Training By Student" value="student" />
          <Tab label="Scheduled Course" value="scheduled" />
          <Tab label="By Trainer" value="trainer" />
        </Tabs>
        {activeTab === "student" && (
          <React.Fragment>
            <HeaderRow>
              <HeaderLeft>
                {" "}
                <Title2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setYear(currentYear - 1)}
                  >
                    {currentYear - 1}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => this.setYear(currentYear)}>
                    {currentYear}
                  </Button>
                  In Period from
                  <TextField
                    type="date"
                    label="Enter StartDate Courses"
                    value={this.state.studentfilterstartdate}
                    name="studentfilterstartdate"
                    onChange={this.handleStudentFilterStartDateChange}
                    className={classes.textField}
                  />
                  to
                  <TextField
                    type="date"
                    label="Enter End Date Courses"
                    value={this.state.studentfilterenddate}
                    name="studentfilterenddate"
                    onChange={this.handleStudentFilterEndDateChange}
                    className={classes.textField}
                  />
                </Title2>
              </HeaderLeft>
              <HeaderRight />
            </HeaderRow>
            <StudentListContainer
              startdate={this.state.studentfilterstartdate}
              enddate={this.state.studentfilterenddate}
            />
          </React.Fragment>
        )}
        {activeTab === "scheduled" && (
          <React.Fragment>
            <HeaderRow>
              <HeaderLeft>
                {" "}
                <Title2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setYear(currentYear - 1)}
                  >
                    {currentYear - 1}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => this.setYear(currentYear)}>
                    {currentYear}
                  </Button>
                  Scheduled Training Starting
                  <TextField
                    type="date"
                    label="Enter StartDate Course"
                    value={this.state.startdate}
                    onChange={(e, value) => this.handleStartDateChange(e, value)}
                    className={classes.textField}
                  />
                </Title2>
              </HeaderLeft>
              <HeaderRight>
                <Button disabled={!enabled} color="primary" onClick={this.toggleDialog}>
                  New
                </Button>
              </HeaderRight>
            </HeaderRow>
            <div>{this.renderCourses(filteredCourses)}</div>,
            <StudentChipList>
              {this.state.participants &&
                this.state.participants.students.map(s => (
                  <StudentChip key={s.id} id={s.id} fullname={s.fullname} image={s.image} />
                ))}
            </StudentChipList>
            <div>
              {open === true && (
                <AddCourseDialog
                  open={open}
                  trainers={supportfolks}
                  courses={courses}
                  onSave={e => console.log("onSave", JSON.stringify(e))}
                  onCancel={() => this.setState({ open: false })}
                />
              )}
            </div>
          </React.Fragment>
        )}
        {activeTab === "trainer" && (
          <React.Fragment>
            <HeaderRow>
              <HeaderLeft>
                {" "}
                <Title2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setYear(currentYear - 1)}
                  >
                    {currentYear - 1}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => this.setYear(currentYear)}>
                    {currentYear}
                  </Button>
                  In Period from
                  <TextField
                    type="date"
                    label="Enter StartDate Courses"
                    value={this.state.studentfilterstartdate}
                    name="studentfilterstartdate"
                    onChange={this.handleStudentFilterStartDateChange}
                    className={classes.textField}
                  />
                  to
                  <TextField
                    type="date"
                    label="Enter End Date Courses"
                    value={this.state.studentfilterenddate}
                    name="studentfilterenddate"
                    onChange={this.handleStudentFilterEndDateChange}
                    className={classes.textField}
                  />
                </Title2>
              </HeaderLeft>
              <HeaderRight />
            </HeaderRow>
            <TrainerView from={this.state.studentfilterstartdate} to={this.state.studentfilterenddate} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const courseQuery = gql`
  query courseQuery {
    courses {
      id
      team
      title
      description
      link
      plannedcourses(limit: 1) {
        startdate
        status
      }
      startdate
      _studentsMeta {
        count
      }
      students {
        id
        fullname
        image
      }
    }
    supportfolks {
      id
      fullname
    }
  }
`;

export default graphql(courseQuery)(withStyles(styles)(CourseView));
