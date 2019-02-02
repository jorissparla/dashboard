import React, { useState } from "react";
import { withRouter } from "react-router";
import Check from "@material-ui/icons/CheckCircleOutline";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { adopt } from "react-adopt";
import { Button } from "@material-ui/core";

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

function AcceptPlannedCourseRequest({ id, history, courseid, approver }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("Thank you");
  const handleClose = () => {
    setShow(false);
  };

  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Composed>
          {({ converttoplannedcourse, deleteplannedcourserequest }) => {
            const accept = async goto => {
              setShow(true);
              const res = await converttoplannedcourse({
                variables: { input: { id, approver } }
              });
              console.log(res);
              const response = await deleteplannedcourserequest({
                variables: { input: { id } }
              });
              console.log(response);
              if (goto && res && res.data && res.data.converttoplannedcourse) {
                history.push(
                  `/scheduledcourses/${courseid}/edit/${
                    res.data.converttoplannedcourse.id
                  }`
                );
              }
              openSnackbar("Item converted");
            };
            return (
              <div>
                <Dialog
                  open={show}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Accept</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To accept this request, type any extra information that be
                      send to the recipient
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
                        await accept(false);
                      }}
                      color="primary"
                    >
                      Accept Request
                    </Button>
                    <Button
                      onClick={async () => {
                        await accept(true);
                      }}
                      color="secondary"
                    >
                      Accept and Goto Request
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button onClick={() => setShow(true)}>
                  Accept
                  <Check />
                </Button>
              </div>
            );
          }}
        </Composed>
      )}
    </SharedSnackbarConsumer>
  );
}
export default withRouter(AcceptPlannedCourseRequest);
