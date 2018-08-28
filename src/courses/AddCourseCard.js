import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import CourseForm from "./CourseForm";

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

class AddCourseCard extends Component {
  state = {};

  handleSave = ({
    team = "Logistics",
    title = "",
    description = "",
    link = "",
    type = "",
    hours = 8,
    startdate = new Date(),
    enddate = new Date(),
    status = "",
    applicable = "",
    trainer = ""
  }) => {
    const input = {
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
    };
    console.log(JSON.stringify(input));
    this.props
      .addCourse({
        variables: { input }
      })
      .then(({ data: { addCourse: { id } } }) => {
        console.log("ONSAVE", JSON.stringify(id));
        this.props.history.push(`/courses/edit/${id.toUpperCase()}`);
      })
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };

  render() {
    const {
      data: { coursetypes, coursecategories, loading, statuses, supportfolks }
    } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Div>
          <Right>
            <CourseForm
              coursetypes={coursetypes}
              coursecategories={coursecategories}
              statuses={statuses.filter(s => s.type === "Course")}
              trainers={supportfolks}
              onSave={this.handleSave}
              readOnly={false}
            />
          </Right>
          <Left />
        </Div>
      </div>
    );
  }
}

const queryCourseTypes = gql`
  query coursetypes {
    coursetypes {
      name
    }
    coursecategories {
      id
      name
    }
    statuses {
      id
      type
      value
    }
    supportfolks {
      id
      fullname
    }
  }
`;

const AddCourse = gql`
  mutation addCourse($input: InputCourseType) {
    addCourse(input: $input) {
      id
    }
  }
`;

export default graphql(AddCourse, { name: "addCourse" })(
  graphql(queryCourseTypes)(withRouter(AddCourseCard))
);
