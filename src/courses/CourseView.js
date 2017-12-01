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
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import { gql, graphql } from "react-apollo";
import { Link } from "react-router-dom";
import _ from "lodash";
import AddCourseDialog from "./AddCourseDialog";

const Title = styled.h3`
  font-weight: 200;
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
  }
};

const HeaderColumn = ({ style, children }) => {
  const newStyle = _.extend({}, styles.headerStyle, style);
  return <TableHeaderColumn style={newStyle}>{children}</TableHeaderColumn>;
};
class CourseView extends React.Component {
  state = {
    startdate: new Date(),
    open: false,
    course: 1,
    value: "",
    minDate: null,
    defaultDate: Date.now()
  };

  componentDidCatch(error) {
    //alert(JSON.stringify(error));
  }
  handleStartDateChange = (e, value) => {
    console.log(value);
    this.setState({ startdate: value });
  };

  handleChange = (event, index, course) => {
    console.log(" course ", course, event);
    this.setState({ course });
  };
  toggleDialog = () => {
    console.log(this.state);
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
            <HeaderColumn>NEXT COURSE DATE</HeaderColumn>
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
              <TableRowColumn>{course.plannedcourses[0].startdate}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  render() {
    const { loading, error, courses } = this.props.data;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const filterDate = this.state.startdate;
    const { open } = this.state;
    console.log(this.state.date);
    const filteredCourses = filterDate
      ? courses.filter(
          course => Date.parse(course.plannedcourses[0].startdate) > Date.parse(filterDate)
        )
      : courses;

    return [
      <HeaderRow>
        <HeaderLeft>
          {" "}
          <Title>
            Scheduled Courses Starting<DatePicker
              hintText="Enter StartDate Course"
              value={this.state.startdate}
              onChange={this.handleStartDateChange}
            />
          </Title>
        </HeaderLeft>
        <HeaderRight>
          <RaisedButton
            label="New"
            primary={true}
            style={styles.button}
            onClick={this.toggleDialog}
          />
        </HeaderRight>
      </HeaderRow>,
      <div>{this.renderCourses(filteredCourses)}</div>,
      <div>
        {open === true && (
          <AddCourseDialog
            open={open}
            courses={courses}
            onSave={e => console.log("onSave", JSON.stringify(e))}
            onCancel={() => this.setState({ open: false })}
          />
        )}
      </div>
    ];
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
  }
`;

export default graphql(courseQuery)(CourseView);
