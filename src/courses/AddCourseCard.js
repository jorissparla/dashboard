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

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
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
      .addCourse({
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
      .then(v => {
        window.location.href = "/courses";
      })
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  render() {
    const { data: { coursetypes, loading } } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Div>
          <Right>
            <CourseForm coursetypes={coursetypes} onSave={this.handleSave} readOnly={false} />
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
  }
`;

const AddCourse = gql`
  mutation addCourse($input: InputCourseType) {
    addCourse(input: $input) {
      course {
        id
        applicable
      }
    }
  }
`;

export default graphql(AddCourse, {
  props: ({ mutate }) => ({
    addCourse: input =>
      mutate({
        variables: {
          input
        }
      })
  })
})(graphql(queryCourseTypes)(withRouter(AddCourseCard)));
