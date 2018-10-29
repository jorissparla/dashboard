import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Component from '../common/component-component';
import SaveIcon from '@material-ui/icons/Save';
import { StyledMultiple } from './StyledDropdowns';

import { Formik } from 'formik';

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
      }
    }
  }
`;

class EditStudentsOnCourse extends React.Component {
  state = {
    plannedCourseId: ''
  };
  render() {
    return (
      <Query
        query={QUERY_PLANNEDCOURSE_WITHPARTICIPANTS}
        variables={{ id: this.props.id || '611E0A88-8690-4102-A629-F7E3B28874A3' }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return 'Loading';
          }
          if (!data) {
            return 'No data';
          }
          const { plannedcourse, supportfolks } = data;
          const suggestions = supportfolks;
          const participants = plannedcourse
            ? plannedcourse.students.map(({ fullname }) => fullname)
            : [];
          return (
            <Component
              initialValue={{
                participants,
                inputValue: '',
                selectedItem: [...participants],
                suggestions: []
              }}
            >
              {({ state, setState }) => {
                return (
                  <Mutation mutation={ADD_PARTICIPANTS_TO_COURSE}>
                    {updatePlannedCourseParticipants => {
                      return (
                        <React.Fragment>
                          <StyledMultiple
                            id="participants"
                            name="participants"
                            state={state}
                            setState={async v => {
                              await setState(v);
                              console.log('z');
                              //if (v.selectedItem) this.props.onChange(v.selectedItem);
                            }}
                            suggestions={suggestions}
                            onChange={async participants => {
                              this.props.onChange(state);
                              //console.log('Change-added', a, state);
                              await updatePlannedCourseParticipants({
                                variables: { participants, id: this.props.id }
                              });
                            }}
                            onDelete={async deletedValue => {
                              const participants = state.selectedItem
                                .filter(name => name !== deletedValue)
                                .join(';');
                              await updatePlannedCourseParticipants({
                                variables: { participants, id: this.props.id }
                              });
                            }}
                            label="participants"
                            fieldname="fullname"
                            placeholder="select multiple participants"
                          />
                          <SaveIcon
                            type="submit"
                            onClick={() => {
                              console.log(state);
                            }}
                          >
                            Save
                          </SaveIcon>
                        </React.Fragment>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Component>
          );
        }}
      </Query>
    );
  }
}
export default EditStudentsOnCourse;

export { QUERY_PLANNEDCOURSE_WITHPARTICIPANTS, ADD_PARTICIPANTS_TO_COURSE };
