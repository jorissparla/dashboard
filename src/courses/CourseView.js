import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { Tabs, Tab } from "material-ui/Tabs";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import addDays from "date-fns/add_days";
import format from "date-fns/format";
import _ from "lodash";
import AddCourseDialog from "./AddCourseDialog";
import StudentListContainer from "./StudentListContainer";
import TrainerView from "./TrainerView";

const Title = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
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
  datePicker: {
    marginLeft: 12,
    width: 150
  }
};

const HeaderColumn = ({ style, children }) => {
  const newStyle = _.extend({}, styles.headerStyle, style);
  return <TableHeaderColumn style={newStyle}>{children}</TableHeaderColumn>;
};
class CourseView extends React.Component {
  state = {
    startdate: addDays(new Date(), -7),
    studentfilterstartdate: addDays(new Date(), -180),
    studentfilterenddate: new Date(),
    open: false,
    course: 1,
    value: "",
    minDate: null,
    defaultDate: new Date(),
    activeTab: "scheduled"
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
      <Table headerStyle={styles.headerStyle}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <HeaderColumn>TITLE</HeaderColumn>
            <HeaderColumn style={{ width: 300 }}>DESCRIPTION</HeaderColumn>
            <HeaderColumn style={{ width: 90 }}>STATUS</HeaderColumn>
            <HeaderColumn>ID</HeaderColumn>
            <HeaderColumn style={{ width: 20 }}>👤</HeaderColumn>
            <HeaderColumn>COURSE DATE</HeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {courses.map(course => (
            <TableRow key={course.id}>
              <TableRowColumn>{course.title}</TableRowColumn>
              <TableRowColumn style={{ width: 300 }}>{course.description}</TableRowColumn>
              <TableRowColumn style={{ width: 90 }}>
                {course.plannedcourses[0].status}
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/courses/edit/${course.id}`}>{course.id}</Link>
              </TableRowColumn>
              <TableRowColumn style={{ width: 20 }}>{course.students.length}</TableRowColumn>
              <TableRowColumn>
                {format(course.plannedcourses[0].startdate, "ddd, DD-MMM-YYYY")}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  render() {
    const { loading, error, courses, supportfolks } = this.props.data;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const filterDate = this.state.startdate;
    const { open } = this.state;
    const { role } = this.props.user;
    const enabled = role === "Admin" || role === "PO";
    console.log("====================>", enabled);

    const filteredCourses = _.chain(courses)
      .filter(course => Date.parse(course.plannedcourses[0].startdate) > Date.parse(filterDate))
      .orderBy(["course.plannedcourses[0].startdate"])
      .value();

    return (
      <Tabs
        inkBarStyle={styles.tabStyle}
        value={this.state.activeTab}
        onChange={value => this.setState({ activeTab: value })}
      >
        <Tab label="Scheduled Course" value="scheduled">
          <HeaderRow>
            <HeaderLeft>
              {" "}
              <Title>
                Scheduled Training Starting<DatePicker
                  hintText="Enter StartDate Course"
                  value={this.state.startdate}
                  onChange={(e, value) => this.handleStartDateChange(e, value)}
                />
              </Title>
            </HeaderLeft>
            <HeaderRight>
              <RaisedButton
                disabled={!enabled}
                label="New"
                primary={true}
                style={styles.button}
                onClick={this.toggleDialog}
              />
            </HeaderRight>
          </HeaderRow>
          <div>{this.renderCourses(filteredCourses)}</div>,
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
        </Tab>
        <Tab label="Training By Student" value="student">
          <HeaderRow>
            <HeaderLeft>
              {" "}
              <Title2>
                In Period from
                <DatePicker
                  hintText="Enter StartDate Courses"
                  value={this.state.studentfilterstartdate}
                  name="studentfilterstartdate"
                  onChange={this.handleStudentFilterStartDateChange}
                  style={styles.datePicker}
                />
                to
                <DatePicker
                  hintText="Enter End Date Courses"
                  value={this.state.studentfilterenddate}
                  name="studentfilterenddate"
                  onChange={this.handleStudentFilterEndDateChange}
                  style={styles.datePicker}
                />
              </Title2>
            </HeaderLeft>
            <HeaderRight />
          </HeaderRow>
          <StudentListContainer
            startdate={this.state.studentfilterstartdate}
            enddate={this.state.studentfilterenddate}
          />
        </Tab>
        <Tab label="By Trainer" value="trainer">
          <HeaderRow>
            <HeaderLeft>
              {" "}
              <Title2>
                In Period from
                <DatePicker
                  hintText="Enter StartDate Courses"
                  value={this.state.studentfilterstartdate}
                  name="studentfilterstartdate"
                  onChange={this.handleStudentFilterStartDateChange}
                  style={styles.datePicker}
                />
                to
                <DatePicker
                  hintText="Enter End Date Courses"
                  value={this.state.studentfilterenddate}
                  name="studentfilterenddate"
                  onChange={this.handleStudentFilterEndDateChange}
                  style={styles.datePicker}
                />
              </Title2>
            </HeaderLeft>
            <HeaderRight />
          </HeaderRow>
          <TrainerView
            from={this.state.studentfilterstartdate}
            to={this.state.studentfilterenddate}
          />
        </Tab>
      </Tabs>
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
        fullname
      }
    }
    supportfolks {
      id
      fullname
    }
  }
`;

export default graphql(courseQuery)(CourseView);
