import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/CheckCircleOutline";
import { adopt } from "react-adopt";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { SharedSnackbarConsumer } from "../SharedSnackbar.context";
import { QUERY_PLANNEDCOURSEREQUESTS } from "../pages/PlannedCourseRequestList";
import { QUERY_SCHEDULED_COURSES } from "./PlannedCoursesNew";

const CONVERT_TO_PLANNED_COURSE_MUTATION = gql`
  mutation CONVERT_TO_PLANNED_COURSE_MUTATION(
    $input: PlannedCourseRequestInput
  ) {
    converttoplannedcourse(input: $input) {
      id
    }
  }
`;

const DELETE_PLANNING_REQUEST_MUTATION = gql`
  mutation DELETE_PLANNING_REQUEST_MUTATION($input: PlannedCourseRequestInput) {
    deleteplannedcourserequest(input: $input)
  }
`;

const Composed = adopt({
  converttoplannedcourse: ({ render }) => (
    <Mutation
      mutation={CONVERT_TO_PLANNED_COURSE_MUTATION}
      refetchQueries={[
        { query: QUERY_PLANNEDCOURSEREQUESTS },
        { query: QUERY_SCHEDULED_COURSES }
      ]}
    >
      {render}
    </Mutation>
  ),
  deleteplannedcourserequest: ({ render }) => (
    <Mutation
      mutation={DELETE_PLANNING_REQUEST_MUTATION}
      refetchQueries={[
        { query: QUERY_PLANNEDCOURSEREQUESTS },
        { query: QUERY_SCHEDULED_COURSES }
      ]}
    >
      {render}
    </Mutation>
  )
});

function AcceptPlannedCourseRequest({ id }) {
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Composed>
          {({ converttoplannedcourse, deleteplannedcourserequest }) => {
            return (
              <Check
                onClick={async () => {
                  const res = await converttoplannedcourse({
                    variables: { input: { id } }
                  });
                  console.log(res);
                  const response = await deleteplannedcourserequest({
                    variables: { input: { id } }
                  });
                  console.log(response);
                  openSnackbar("Item converted");
                }}
              />
            );
          }}
        </Composed>
      )}
    </SharedSnackbarConsumer>
  );
}
export default AcceptPlannedCourseRequest;
