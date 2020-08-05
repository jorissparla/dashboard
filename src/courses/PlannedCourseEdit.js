import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import gql from "graphql-tag";
import _ from "lodash";
import React from "react";
import { adopt } from "react-adopt";
import { Query, Mutation } from "@apollo/client/react/components";
import { withRouter } from "react-router";
//import format from 'date-fns/format';
import { format } from "../utils/format";
import EditStudentsOnCourse, { ADD_PARTICIPANTS_TO_COURSE } from "./EditStudentsOnCourse";
import PlannedCourseFormNew from "./PlannedCourseFormNew";
import { QUERY_SCHEDULED_COURSES } from "./PlannedCoursesNew";
const PLANNEDCOURSE_DELETE_MUTATION = gql`
  mutation PLANNEDCOURSE_DELETE_MUTATION($input: InputPlannedCourseType) {
    deletePlannedCourse(input: $input) {
      text
    }
  }
`;

const PLANNEDCOURSE_UPDATE_MUTATION = gql`
  mutation PLANNEDCOURSE_UPDATE_MUTATION($input: InputPlannedCourseType) {
    updatePlannedCourse(input: $input) {
      course {
        id
        students {
          fullname
        }
      }
    }
  }
`;

const QUERY_SINGLE_PLANNEDCOURSE = gql`
  query QUERY_SINGLE_PLANNEDCOURSE($id: ID) {
    plannedcourse(id: $id) {
      courseid
      startdate
      enddate
      team
      trainer
      status
      type
      hours
      updatedAt
      details

      course {
        id
        title
      }
      students {
        fullname
      }
    }
  }
`;

const Composed = adopt({
  updatePlannedCourse: ({ render }) => (
    <Mutation
      mutation={PLANNEDCOURSE_UPDATE_MUTATION}
      awaitRefetchQueries={true}
      refetchQueries={[{ query: QUERY_SINGLE_PLANNEDCOURSE }, { query: QUERY_SCHEDULED_COURSES }]}
    >
      {render}
    </Mutation>
  ),
  updatePlannedCourseParticipants: ({ render }) => (
    <Mutation
      mutation={ADD_PARTICIPANTS_TO_COURSE}
      awaitRefetchQueries={true}
      // refetchQueries={[{ query: QUERY_SINGLE_PLANNEDCOURSE }]}
    >
      {render}
    </Mutation>
  ),
  deletePlannedCourse: ({ render }) => (
    <Mutation mutation={PLANNEDCOURSE_DELETE_MUTATION} refetchQueries={[{ query: QUERY_SINGLE_PLANNEDCOURSE }, { query: QUERY_SCHEDULED_COURSES }]}>
      {render}
    </Mutation>
  ),
});

class PlannedCourseEdit extends React.Component {
  state = {
    id: this.props.match.params.id,
    id2: this.props.match.params.id2,
    participants: [],
    open: false,
    message: "",
  };
  handleSave = async (values, updatePlannedCourse, updatePlannedCourseParticipants) => {
    const input = {
      ...values,
      id: this.state.id2,
      updatedAt: format(Date.now(), "yyyy-MM-dd"),
    };
    const res = await updatePlannedCourse({ variables: { input } });
    const lop = res.data.updatePlannedCourse.course.students;
    const participants = lop.map((p) => p.fullname).join(";");
    const result = await updatePlannedCourseParticipants({
      variables: { participants, id: this.state.id2 },
    });
    console.log(result);
    if (result.data) {
      this.setState({ open: true, message: "Schedule Updated" });
    } else {
      this.setState({ open: true, message: "An error has occurred" });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false, message: "" });
  };

  handleParticipants = (participants) => this.setState({ participants });

  render() {
    const id = this.props.match.params.id;
    const id2 = this.props.match.params.id2;
    const { history } = this.props;
    return (
      <Query query={QUERY_SINGLE_PLANNEDCOURSE} variables={{ id: id2 }}>
        {({ data, loading, error }) => {
          if (loading) {
            return "loading...";
          }
          if (!data || !data.plannedcourse) {
            history.push(`/courses/edit/${id}`);
          }
          let {
            plannedcourse: { startdate, enddate },
            plannedcourse: { students },
          } = data;
          /*   if (students && this.state.participants.length === 0) {
            this.setState({ participants: students });
          } */
          startdate = format(Date.parse(startdate), "yyyy-MM-dd");
          enddate = format(Date.parse(enddate), "yyyy-MM-dd");
          const dates = { startdate, enddate };
          //return <h1>pcEdut</h1>;
          return (
            <Composed>
              {({ updatePlannedCourse, deletePlannedCourse, updatePlannedCourseParticipants }) => {
                return (
                  <React.Fragment>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      open={this.state.open}
                      autoHideDuration={3000}
                      onClose={this.handleClose}
                      ContentProps={{
                        "aria-describedby": "message-id",
                      }}
                      message={<span id="message-id">Data Submitted</span>}
                      action={[
                        <Button key="undo" color="primary" size="small" onClick={this.handleClose}>
                          {this.state.message}
                        </Button>,
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          // className={classes.close}
                          onClick={this.handleClose}
                        >
                          <CloseIcon />
                        </IconButton>,
                      ]}
                    />
                    <PlannedCourseFormNew
                      course={data.plannedcourse.course}
                      id={id}
                      id2={id2}
                      initialValues={{ ...data.plannedcourse, ...dates }}
                      onDelete={async (id) => {
                        await deletePlannedCourse({
                          variables: { input: { id } },
                        });
                        history.push(`/courses/edit/${this.props.match.params.id}`);
                      }}
                      onSave={async (values) => {
                        const input = _.pick(values, [
                          "id",
                          "courseid",
                          "team",
                          "startdate",
                          "enddate",
                          "link",
                          "type",
                          "hours",
                          "status",
                          "applicable",
                          "details",
                          "trainer",
                        ]);
                        this.handleSave(input, updatePlannedCourse, updatePlannedCourseParticipants);
                      }}
                    />
                    <EditStudentsOnCourse id={id2} initialValues={{ students }} onChange={(state) => this.handleParticipants(state)} />
                  </React.Fragment>
                );
              }}
            </Composed>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(PlannedCourseEdit);
export { QUERY_SINGLE_PLANNEDCOURSE };
