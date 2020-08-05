import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "@apollo/client/react/components";
import Component from "../common/component-component";
import { StyledMultiple } from "./StyledDropdowns";
import { adopt } from "react-adopt";

const QUERY_PLANNEDCOURSE_WITHPARTICIPANTS = gql`
  query QUERY_PLANNEDCOURSE_WITHPARTICIPANTS($id: ID) {
    plannedcourse(id: $id) {
      id
      course {
        id
        title
      }
      status
      students {
        fullname
        navid
      }
    }
    supportfolks {
      id
      fullname
    }
  }
`;

const ADD_PARTICIPANTS_TO_COURSE = gql`
  mutation ADD_PARTICIPANTS_TO_COURSE($participants: String!, $id: ID!) {
    updatePlannedCourseParticipants(participants: $participants, where: { id: $id }) {
      course {
        id
        studentcount
        students {
          id
          fullname
        }
      }
    }
  }
`;

const Composed = adopt({
  plannedcoursewithparticipants: ({ id, render }) => (
    <Query query={QUERY_PLANNEDCOURSE_WITHPARTICIPANTS} variables={{ id }}>
      {render}
    </Query>
  ),
  updatePlannedCourseParticipants: ({ render }) => (
    <Mutation mutation={ADD_PARTICIPANTS_TO_COURSE} refetchQueries={[{ query: QUERY_PLANNEDCOURSE_WITHPARTICIPANTS }]}>
      {render}
    </Mutation>
  ),
});

class EditStudentsOnCourse extends React.Component {
  state = {
    plannedCourseId: this.props.id,
    participants: this.props.initialValues.students || [],
  };

  render() {
    if (!this.props.id) {
      return null;
    }
    return (
      <React.Fragment>
        <React.Suspense fallback={<div>Loading</div>}>
          <Composed id={this.props.id}>
            {({ updatePlannedCourseParticipants, plannedcoursewithparticipants }) => {
              const { data, loading } = plannedcoursewithparticipants;
              if (loading) {
                return "Loading...";
              }
              const { plannedcourse, supportfolks: suggestions } = data;
              let participants = [];
              if (plannedcourse && plannedcourse.students) {
                participants = plannedcourse ? plannedcourse.students.map(({ fullname }) => fullname) : [];
              }

              return (
                <Component
                  initialValue={{
                    participants,
                    inputValue: "",
                    selectedItem: [...participants],
                    suggestions: suggestions,
                  }}
                >
                  {({ state, setState }) => {
                    return (
                      <React.Fragment>
                        <StyledMultiple
                          id="participants"
                          name="participants"
                          state={state}
                          setState={async (v) => {
                            await setState(v);
                            //if (v.selectedItem) this.props.onChange(v.selectedItem);
                          }}
                          suggestions={state.suggestions}
                          onChange={async (participants) => {
                            const result = await updatePlannedCourseParticipants({
                              variables: { participants, id: this.props.id },
                            });
                            this.props.onChange(result);
                          }}
                          onDelete={async (deletedValue) => {
                            const participants = state.selectedItem.filter((name) => name !== deletedValue).join(";");
                            const result = await updatePlannedCourseParticipants({
                              variables: { participants, id: this.props.id },
                            });
                            this.props.onChange(result);
                          }}
                          label="participants"
                          fieldname="fullname"
                          placeholder="select multiple participants"
                        />
                      </React.Fragment>
                    );
                  }}
                </Component>
              );
            }}
          </Composed>
        </React.Suspense>
      </React.Fragment>
    );
  }
}
export default EditStudentsOnCourse;

export { QUERY_PLANNEDCOURSE_WITHPARTICIPANTS, ADD_PARTICIPANTS_TO_COURSE };
