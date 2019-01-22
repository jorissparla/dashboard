import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import _ from 'lodash';
import { withRouter } from 'react-router';
import CourseFormNew from './CourseFormNew';
import { QUERY_ALL_COURSES } from './CourseList';

const ADD_COURSE_MUTATION = gql`
  mutation ADD_COURSE_MUTATION($input: InputCourseType) {
    addCourse(input: $input) {
      id
    }
  }
`;

const CourseAdd = props => (
  <Mutation mutation={ADD_COURSE_MUTATION} refetchQueries={[{ query: QUERY_ALL_COURSES }]}>
    {addCourse => {
      return (
        <CourseFormNew
          onSave={async values => {
            const input = _.pick(values, [
              'team',
              'title',
              'description',
              'link',
              'type',
              'hours',
              'status',
              'applicable',
              'trainer'
            ]);

            const result = await addCourse({ variables: { input } });
            console.log('Result', result);
            props.history.push('/courses/edit/' + result.data.addCourse.id);
          }}
        />
      );
    }}
  </Mutation>
);

export default withRouter(CourseAdd);
