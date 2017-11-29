import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import CourseForm from "./CourseForm";
import CourseStudentList from "./CourseStudentList";
import PlannedCourses from "./PlannedCourses";
import YesNoDialog from "../common/YesNoDialog";

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

class CourseCard extends Component {
  state = { planned: { students: [] }, toconfirm: false, id: null, confirmed: false };

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  showConfirmDialog = ({ id }) => {
    this.setState({ toconfirm: true, id });
  };

  confirmedDelete = () => {
    this.setState({ toconfirm: false });
    this.handleDelete(this.state.id);
  };

  cancelDelete = () => this.setState({ toconfirm: false, id: null });

  handleDelete(id) {
    this.props
      .deleteCourse({ id })
      .then(this.props.data.refetch())
      .then(this.setState({ id: null }))
      .then(() => setTimeout((window.location.href = "/courses"), 500))
      .catch(e => alert(JSON.stringify(e, null, 2)));
  }

  handleSave({
    id,
    team,
    title,
    description,
    link,
    type,
    hours,
    startdate,
    enddate,
    status,
    applicable,
    trainer
  }) {
    this.props
      .updateCourse({
        id,
        team,
        title,
        description,
        link,
        type,
        hours,
        startdate,
        enddate,
        status,
        applicable,
        trainer
      })
      .then(this.props.data.refetch())
      .then(alert("Updated"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  handlePlannedSelect = e => {};

  render() {
    const { loading, error, course, coursetypes } = this.props.data;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    console.log(this.state);
    return (
      <div>
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
        <Left>
          <PlannedCourses
            planned={course.plannedcourses}
            rowSelected={e => this.setState({ planned: e })}
          />
          <CourseStudentList students={this.state.planned.students} />
        </Left>
      </div>
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
  }
`;

export default graphql(CourseDelete, {
  props: ({ mutate }) => ({
    deleteCourse: input =>
      mutate({
        variables: {
          input
        }
      })
  })
})(
  graphql(CourseUpdate, {
    props: ({ mutate }) => ({
      updateCourse: input =>
        mutate({
          variables: {
            input
          }
        })
    })
  })(
    graphql(CourseQuery, {
      options: ownProps => ({ variables: { id: ownProps.match.params.id } })
    })(withRouter(CourseCard))
  )
);
