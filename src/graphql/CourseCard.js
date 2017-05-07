import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { Tabs, Tab } from "material-ui/Tabs";
import { blue500 } from "material-ui/styles/colors";
import { withRouter } from "react-router";
import { List, ListItem } from "material-ui/List";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import CourseForm from "./CourseForm";
import CourseStudentList from "./CourseStudentList";

const Div = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex-basis: 30%;
`;
const Right = styled.div`
  flex-basis : 65%;
  flex:1;
`;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    backgroundColor: "#2196F3",
    fontWeight: 400
  }
};

class CourseCard extends Component {
  state = {};
  render() {
    const { loading, error, course } = this.props.data;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    console.log("course", course);
    return (
      <div>
        <Div>

          <Right>
            <CourseForm initialValues={course} course={course} />
          </Right>
          <Left>
            <CourseStudentList students={course.enrollments} />
          </Left>
        </Div>

      </div>
    );
  }
}

const CourseQuery = gql`
  query course($id: ID) {
    course(id: $id ) {
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
        enrollments {
          id
          status
          student {
            fullname
            picture {
              data
            }
          }
        }
        
    }
    }
`;

export default graphql(CourseQuery, {
  options: ownProps => ({ variables: { id: ownProps.params.id } })
})(withRouter(CourseCard));
