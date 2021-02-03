import { useMutation, gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import React from "react";
import { useHistory } from "react-router";
import { QUERY_ALL_COURSES } from "../pages/CourseList";
import CourseFormNew from "./CourseFormNew";

const ADD_COURSE_MUTATION = gql`
  mutation ADD_COURSE_MUTATION($input: InputCourseType) {
    addCourse(input: $input) {
      id
      team
      title
      documentnr

      description
      link
      _studentsMeta {
        count
      }
      students {
        fullname
      }
      plannedcourses(limit: 1) {
        startdate
        studentcount
        students {
          id
          fullname
          image
        }
      }
    }
  }
`;

const CourseAdd = () => {
  const history = useHistory();
  const [addCourse] = useMutation(ADD_COURSE_MUTATION);
  return (
    <CourseFormNew
      onSave={async (values) => {
        const input = _.pick(values, ["team", "title", "description", "link", "type", "hours", "status", "applicable", "trainer"]);

        const result = await addCourse({ variables: { input } });
        console.log("Result", result);
        history.push("/courses/edit/" + result.data.addCourse.id);
      }}
    />
  );
};

export default CourseAdd;
