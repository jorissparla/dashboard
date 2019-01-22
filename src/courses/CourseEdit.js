import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import _ from 'lodash';
import { withRouter } from 'react-router';
import CourseFormNew from './CourseFormNew';
import { QUERY_ALL_COURSES } from './CourseList';

const COURSE_DELETE_MUTATION = gql`
  mutation COURSE_DELETE_MUTATION($input: InputCourseType) {
    deleteCourse(input: $input) {
      text
    }
  }
`;

const COURSE_UPDATE_MUTATION = gql`
  mutation COURSE_UPDATE_MUTATION($input: InputCourseType) {
    updateCourse(input: $input) {
      course {
        id
        applicable
      }
    }
  }
`;

const QUERY_SINGLE_COURSE = gql`
  query QUERY_SINGLE_COURSE($id: ID) {
    course(id: $id) {
      id
      title
      description
      team
      trainer
      link
      status
      type
      category
      startdate
      enddate
      hours
      lastmodified
    }
  }
`;

const Composed = adopt({
  updateCourse: ({ render }) => (
    <Mutation
      mutation={COURSE_UPDATE_MUTATION}
      awaitRefetchQueries={true}
      refetchQueries={[{ query: QUERY_SINGLE_COURSE }]}
    >
      {render}
    </Mutation>
  ),
  deleteCourse: ({ render }) => (
    <Mutation mutation={COURSE_DELETE_MUTATION} refetchQueries={[{ query: QUERY_ALL_COURSES }]}>
      {render}
    </Mutation>
  )
});

class CourseEdit extends React.Component {
  state = {
    id: this.props.match.params.id
  };
  handleSave = async (input, updateCourse) => {
    await updateCourse({ variables: { input } });
  };
  render() {
    const id = this.props.match.params.id;
    const { history } = this.props;
    const { view } = this.props;
    return (
      <Query query={QUERY_SINGLE_COURSE} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'loading...';
          }
          return (
            <Composed>
              {({ updateCourse, deleteCourse }) => {
                return (
                  <CourseFormNew
                    id={id}
                    view={view}
                    initialValues={data.course}
                    onDelete={async id => {
                      console.log('ID is', id);
                      await deleteCourse({ variables: { input: { id } } });
                      history.push('/courses');
                    }}
                    onSave={async values => {
                      const input = _.pick(values, [
                        'id',
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
                      this.handleSave(input, updateCourse);
                    }}
                  />
                );
              }}
            </Composed>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(CourseEdit);
export { QUERY_SINGLE_COURSE };
