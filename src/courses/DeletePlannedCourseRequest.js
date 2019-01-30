import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/CheckCircleOutline';
import { adopt } from 'react-adopt';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SharedSnackbarConsumer } from '../SharedSnackbar.context';
import { QUERY_PLANNEDCOURSEREQUESTS } from '../pages/PlannedCourseRequestList';

const CONVERT_TO_PLANNED_COURSE_MUTATION = gql`
  mutation CONVERT_TO_PLANNED_COURSE_MUTATION($input: PlannedCourseRequestInput) {
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
      refetchQueries={[{ query: QUERY_PLANNEDCOURSEREQUESTS }]}
    >
      {render}
    </Mutation>
  ),
  deleteplannedcourserequest: ({ render }) => (
    <Mutation
      mutation={DELETE_PLANNING_REQUEST_MUTATION}
      refetchQueries={[{ query: QUERY_PLANNEDCOURSEREQUESTS }]}
    >
      {render}
    </Mutation>
  )
});

function DeletePlannedCourseRequest({ id }) {
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Composed>
          {({ converttoplannedcourse, deleteplannedcourserequest }) => {
            return (
              <ClearIcon
                onClick={async () => {
                  const response = await deleteplannedcourserequest({
                    variables: { input: { id } }
                  });
                  console.log(response);
                  openSnackbar('Item Deleted');
                }}
              />
            );
          }}
        </Composed>
      )}
    </SharedSnackbarConsumer>
  );
}
export default DeletePlannedCourseRequest;
