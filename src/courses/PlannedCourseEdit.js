import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import _ from 'lodash';
import format from 'date-fns/format';
import { withRouter } from 'react-router';
import PlannedCourseFormNew from './PlannedCourseFormNew';
import EditStudentsOnCourse from './EditStudentsOnCourse';
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
      course {
        id
        title
      }
    }
  }
`;

const Composed = adopt({
  updatePlannedCourse: ({ render }) => (
    <Mutation
      mutation={PLANNEDCOURSE_UPDATE_MUTATION}
      awaitRefetchQueries={true}
      refetchQueries={[{ query: QUERY_SINGLE_PLANNEDCOURSE }]}
    >
      {render}
    </Mutation>
  ),
  deletePlannedCourse: ({ render }) => (
    <Mutation mutation={PLANNEDCOURSE_DELETE_MUTATION}>{render}</Mutation>
  )
});

class PlannedCourseEdit extends React.Component {
  state = {
    id: this.props.match.params.id,
    id2: this.props.match.params.ida2
  };
  handleSave = async (values, updatePlannedCourse) => {
    const input = {
      ...values,
      id: this.state.id2,
      updatedAt: format(values.updatedAt, 'YYYY-MM-DD')
    };
    console.log('input', input);
    const result = await updatePlannedCourse({ variables: { input } });
  };
  render() {
    const id = this.props.match.params.id;
    const id2 = this.props.match.params.id2;
    console.log('id2', id2);
    const { history } = this.props;

    return (
      <Query query={QUERY_SINGLE_PLANNEDCOURSE} variables={{ id: id2 }}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'loading...';
          }
          console.log('data', data);
          let {
            plannedcourse: { startdate, enddate }
          } = data;

          startdate = format(startdate, 'YYYY-MM-DD');
          enddate = format(enddate, 'YYYY-MM-DD');
          const dates = { startdate, enddate };
          console.log('start', startdate, enddate);
          //return <h1>pcEdut</h1>;
          return (
            <Composed>
              {({ updatePlannedCourse, deletePlannedCourse }) => {
                return (
                  <React.Fragment>
                    <PlannedCourseFormNew
                      course={data.plannedcourse.course}
                      id={id}
                      initialValues={{ ...data.plannedcourse, ...dates }}
                      onDelete={async id => {
                        console.log('ID is', id);
                        await deletePlannedCourse({ variables: { input: { id } } });
                        history.push('/courses');
                      }}
                      onSave={async values => {
                        const input = _.pick(values, [
                          'id',
                          'courseid',
                          'team',
                          'startdate',
                          'enddate',
                          'link',
                          'type',
                          'hours',
                          'status',
                          'applicable',
                          'trainer'
                        ]);
                        this.handleSave(input, updatePlannedCourse);
                      }}
                    />
                    <EditStudentsOnCourse id={id2} />
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
