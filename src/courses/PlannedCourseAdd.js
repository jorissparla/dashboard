import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';
import { withRouter } from 'react-router';
import PlannedCourseFormNew from './PlannedCourseFormNew';
import {addHours} from 'date-fns';
import { QUERY_ALL_COURSES } from '../pages/CourseList';
import { QUERY_SINGLE_COURSE } from './CourseEdit';

const ADD_PLANNEDCOURSE_MUTATION = gql`
  mutation ADD_PLANNEDCOURSE_MUTATION($input: InputPlannedCourseType) {
    addPlannedCourse(input: $input) {
      course {
        id
      }
    }
  }
`;

const PlannedCourseAdd = ({
  history,
  match: {
    params: { id }
  }
}) => (
  <Query query={QUERY_SINGLE_COURSE} variables={{ id }}>
    {({ data, loading, error }) => {
      if (loading) {
        return 'loading';
      }
      const { course } = data;
      return (
        <Mutation
          mutation={ADD_PLANNEDCOURSE_MUTATION}
          refetchQueries={[{ query: QUERY_ALL_COURSES }]}
        >
          {addPlannedCourse => {
            return (
              <PlannedCourseFormNew
                id={id}
                course={course}
                onSave={async values => {
                  let input = _.pick(values, [
                    'courseid',
                    'team',
                    'startdate',
                    'enddate',
                    'type',
                    'hours',
                    'status',
                    'applicable',
                    'trainer'
                  ]);
                  let { startdate, enddate } = input;
                  input = {
                    startdate: addHours(new Date(startdate), 13),
                    enddate: addHours(new Date(enddate), 13),
                    ...input
                  };
                  console.log('input', input);
                  const result = await addPlannedCourse({ variables: { input } });
                  console.log('Result', result);
                  if (result) {
                    const id2 = result.data.addPlannedCourse.course.id;
                    history.push(`/scheduledcourses/${id}/edit/${id2}`);
                  }
                }}
              />
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

export default withRouter(PlannedCourseAdd);
