import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Component from '../common/component-component';
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
  mutation ADD_PARTICIPANTS_TO_COURSE($participants: String, $id: ID) {
    updatePlannedCourseParticipants(participants: $participants, where: { id: $id }) {
      course {
        id
      }
    }
  }
`;

class EditStudentsOnCourse extends React.Component {
  state = {
    plannedCourseId: '',
    participants: ''
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
          console.log(
            this.props.id,
            plannedcourse.students.map(({ fullname }) => fullname).join(';')
          );
          const suggestions = supportfolks;
          const participants = plannedcourse
            ? plannedcourse.students.map(({ fullname }) => fullname).join(';')
            : '';
          return (
            <Formik
              initialValues={{ participants, id: 0 }}
              onSubmit={values => console.log(values)}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                touched,
                errors,
                isSubmitting
              }) => (
                <Component
                  initialValue={{
                    participants,
                    inputValue: '',
                    selectedItem: [],
                    suggestions: []
                  }}
                >
                  {({ state, setState }) => {
                    console.log(values);
                    return (
                      <React.Fragment>
                        <StyledMultiple
                          id="participants"
                          name="participants"
                          state={state}
                          setState={setState}
                          suggestions={suggestions}
                          onChange={item => {
                            setFieldValue('participants', item);
                          }}
                          onBlur={handleBlur}
                          label="participants"
                          fieldname="fullname"
                          placeholder="select multiple participants"
                        />
                        <button type="submit" onClick={handleSubmit}>
                          Save
                        </button>
                      </React.Fragment>
                    );
                  }}
                </Component>
              )}
            </Formik>
          );
        }}
      </Query>
    );
  }
}
export default EditStudentsOnCourse;
