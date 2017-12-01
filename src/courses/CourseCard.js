import React, { Component } from "react";
import { gql, graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Tabs, Tab } from "material-ui/Tabs";
import CourseForm from "./CourseForm";
import CourseStudentList from "./CourseStudentList";
import PlannedCourses from "./PlannedCourses";
import YesNoDialog from "../common/YesNoDialog";
import _ from "lodash";

const Div = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex-basis: 30%;
`;
const Right = styled.div`
  flex-basis: 65%;
  flex: 1;
`;

const styles = {
  tabStyle: {
    backgroundColor: "#2196f3",
    fontSize: "1rem"
  }
};

class CourseCard extends Component {
  state = {
    planned: { students: [] },
    toconfirm: false,
    id: null,
    confirmed: false,
    activeTab: "course"
  };

  showConfirmDialog = ({ id }) => {
    this.setState({ toconfirm: true, id });
  };

  confirmedDelete = () => {
    this.setState({ toconfirm: false });
    this.handleDelete(this.state.id);
  };

  cancelDelete = () => this.setState({ toconfirm: false, id: null });

  handleDelete = id => {
    this.props
      .deleteCourse({ variables: { input: { id } } })
      .then(this.props.data.refetch())
      .then(this.setState({ id: null }))
      .then(() => setTimeout((window.location.href = "/courses"), 500))
      .catch(e => alert(JSON.stringify(e, null, 2)));
  };

  handleUpdatePlanned = async ({ id, startdate, enddate, status, hours }) => {
    const input = { id, startdate: new Date(startdate), enddate: new Date(enddate), status, hours };
    console.log("handleUpdatePlanned", JSON.stringify(input));
    await this.props.updatePlannedCourse({ variables: { input } });
    await this.props.data.refetch();
  };
  handleAddPlanned = async ({ id, startdate, enddate, status, hours, courseid }) => {
    const input = {
      id,
      startdate: new Date(startdate),
      enddate: new Date(enddate),
      status,
      hours,
      courseid
    };
    console.log("handleAddPlanned", JSON.stringify(input));
    await this.props.addPlannedCourse({ variables: { input } });
    await this.props.data.refetch();
  };

  handleSave = e => {
    const input = _.pick(e, [
      "id",
      "team",
      "title",
      "description",
      "link",
      "type",
      "hours",
      "startdate",
      "enddate",
      "status",
      "applicable",
      "trainer"
    ]);
    this.props
      .updateCourse({
        variables: {
          input
        }
      })
      .then(this.props.data.refetch())
      .then(alert("Updated"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };

  handlePlannedSelect = (e, i) => {
    this.setState({ planned: e, selected: i });
  };

  render() {
    const { loading, error, course, coursetypes, courses } = this.props.data;
    const { tabStyle } = styles;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const { planned } = this.state;
    const studentlist = planned ? planned.students : [];
    return (
      <Tabs
        inkBarStyle={tabStyle}
        value={this.state.activeTab}
        onChange={value => this.setState({ activeTab: value })}
      >
        <Tab label="Course Details" value="course" key={1}>
          <Div>
            <Right>
              <CourseForm
                initialValues={course}
                coursetypes={coursetypes}
                course={course}
                onSave={this.handleSave}
                onDelete={this.showConfirmDialog}
                readOnly={false}
              />
            </Right>
            <YesNoDialog
              open={this.state.toconfirm}
              handleYes={this.confirmedDelete}
              handleNo={this.cancelDelete}
              question="Delete?"
            />
          </Div>
        </Tab>
        <Tab
          key={2}
          label="Schedules"
          value="schedule"
          onChange={value => this.setState({ activeTab: value })}
        >
          <Left>
            <PlannedCourses
              course={course}
              courses={courses}
              planned={course.plannedcourses}
              hours={course.hours}
              onRowSelected={e => this.setState({ planned: e })}
              onUpdate={v => this.handleUpdatePlanned(v)}
              onAddNew={v => this.handleAddPlanned(v)}
            />
            <CourseStudentList students={studentlist} />
          </Left>
        </Tab>
      </Tabs>
    );
  }
}

const CourseDelete = gql`
  mutation deleteCourse($input: InputCourseType) {
    deleteCourse(input: $input) {
      text
    }
  }
`;

const CourseUpdate = gql`
  mutation updateCourse($input: InputCourseType) {
    updateCourse(input: $input) {
      course {
        id
        applicable
      }
    }
  }
`;

const PlannedCourseUpdate = gql`
  mutation updatePlannedCourse($input: InputCourseType) {
    updatePlannedCourse(input: $input) {
      course {
        id
      }
    }
  }
`;
const PlannedCourseAdd = gql`
  mutation addPlannedCourse($input: InputPlannedCourseType) {
    addPlannedCourse(input: $input) {
      course {
        id
      }
    }
  }
`;

const CourseQuery = gql`
  query course($id: ID) {
    course(id: $id) {
      id
      title
      description
      team
      link
      status
      type
      startdate
      enddate
      hours
      plannedcourses {
        id
        startdate
        enddate
        status
        students {
          id
          fullname
          image
        }
      }
      applicable
      trainer
      lastmodified
      enrollments {
        id
        status
        student {
          id
          fullname
          image
        }
      }
    }
    coursetypes {
      name
    }
    courses {
      id
      title
      hours
    }
  }
`;

export default compose(
  graphql(CourseDelete, { name: "deleteCourse" }),
  graphql(CourseUpdate, { name: "updateCourse" }),
  graphql(PlannedCourseUpdate, { name: "updatePlannedCourse" }),
  graphql(PlannedCourseAdd, { name: "addPlannedCourse" }),
  graphql(CourseQuery, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  })
)(withRouter(CourseCard));
