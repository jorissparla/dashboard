import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SharedSnackbarConsumer } from '../SharedSnackbar.context';

const CONVERT_TO_PLANNED_COURSE_MUTATION = gql`
  mutation CONVERT_TO_PLANNED_COURSE_MUTATION($input: PlannedCourseRequestInput) {
    converttoplannedcourse(input: $input) {
      id
    }
  }
`;

function AcceptPlannedCourseRequest({ id }) {
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Mutation mutation={CONVERT_TO_PLANNED_COURSE_MUTATION} variables={{ input: { id } }}>
          {(converttoplannedcourse, { loading }) => {
            if (loading) {
              return <div />;
            }
            return (
              <ClearIcon
                disabled={loading}
                onClick={async () => {
                  const res = await converttoplannedcourse();
                  console.log(res);
                  openSnackbar('Item converted');
                }}
              />
            );
          }}
        </Mutation>
      )}
    </SharedSnackbarConsumer>
  );
}
export default AcceptPlannedCourseRequest;
