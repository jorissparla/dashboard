import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import { SharedSnackbarConsumer } from '../globalState/SharedSnackbar.context';
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
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => {
    setShow(false);
  };
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Composed>
          {({ converttoplannedcourse, deleteplannedcourserequest }) => {
            return (
              <div>
                <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Reject</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To reject this request, type a reason that will be send to the recipient
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Reason"
                      type="text"
                      fullWidth
                      value={message}
                      onChange={({ target: { value } }) => setMessage(value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={async () => {
                        const response = await deleteplannedcourserequest({
                          variables: { input: { id } }
                        });
                        console.log(response);
                        openSnackbar('Item Deleted');
                        handleClose();
                      }}
                      color="primary"
                    >
                      Reject Request
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button onClick={() => setShow(true)}>
                  Reject
                  <ClearIcon />
                </Button>
              </div>
            );
          }}
        </Composed>
      )}
    </SharedSnackbarConsumer>
  );
}
export default DeletePlannedCourseRequest;
