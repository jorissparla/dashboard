import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import _ from "lodash";
import React from "react";
import { useHistory } from "react-router";
import Spinner from "utils/spinner";
import { QUERY_ALL_COURSES } from "../pages/CourseList";
import CourseFormNew from "./CourseFormNew";

const COURSE_DELETE_MUTATION = gql`
  mutation COURSE_DELETE_MUTATION($input: InputCourseType) {
    deleteCourse(input: $input) {
      text
    }
  }
`;

const COURSE_UPDATE_MUTATION = gql`
  mutation COURSE_UPDATE_MUTATION($input: InputCourseType) {
    updateCourse(input: $input) {
      course {
        id
        applicable
      }
    }
  }
`;

const QUERY_SINGLE_COURSE = gql`
  query QUERY_SINGLE_COURSE($id: ID) {
    course(id: $id) {
      id
      title
      description
      team
      trainer
      link
      status
      type
      category
      startdate
      enddate
      documentnr
      hours
      lastmodified
    }
  }
`;

const CourseEdit = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const { view } = props;

  const [updateCourse] = useMutation(COURSE_UPDATE_MUTATION);
  const [deleteCourse] = useMutation(COURSE_DELETE_MUTATION, { refetchQueries: [{ query: QUERY_ALL_COURSES }] });
  const { data, loading } = useQuery(QUERY_SINGLE_COURSE, { variables: { id } });
  if (loading) {
    return <Spinner />;
  }

  const handleSave = async (input, updateCourse) => {
    await updateCourse({ variables: { input } });
  };

  return (
    <CourseFormNew
      id={id}
      view={view}
      initialValues={data.course}
      onDelete={async (id) => {
        console.log("ID is", id);
        await deleteCourse({ variables: { input: { id } } });
        history.push("/courses");
      }}
      onSave={async (values) => {
        const input = _.pick(values, [
          "id",
          "team",
          "title",
          "description",
          "link",
          "type",
          "hours",
          "status",
          "applicable",
          "trainer",
          "documentnr",
        ]);
        handleSave(input, updateCourse);
      }}
    />
  );
};

export default CourseEdit;
export { QUERY_SINGLE_COURSE };
