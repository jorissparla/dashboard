import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import _ from 'lodash';
import format from 'date-fns/format';
import { withRouter } from 'react-router';
import PlannedCourseFormNew from './PlannedCourseFormNew';
import EditStudentsOnCourse from './EditStudentsOnCourse';
import {
  QUERY_PLANNEDCOURSE_WITHPARTICIPANTS,
  ADD_PARTICIPANTS_TO_COURSE
} from './EditStudentsOnCourse';
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
      refetchQueries={[{ query: QUERY_SINGLE_PLANNEDCOURSE }]}
    >
      {render}
    </Mutation>
  ),
  updatePlannedCourseParticipants: ({ render }) => (
    <Mutation
      mutation={ADD_PARTICIPANTS_TO_COURSE}
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
    id2: this.props.match.params.id2,
    participants: []
  };
  handleSave = async (values, updatePlannedCourse, updatePlannedCourseParticipants) => {
    const input = {
      ...values,
      id: this.state.id2,
      updatedAt: format(Date.now(), 'YYYY-MM-DD')
    };
    const result = await updatePlannedCourse({ variables: { input } });
    const participants = this.state.participants.map(p => p.fullname).join(';');
    console.log('Patricipants', participants);
    await updatePlannedCourseParticipants({
      variables: { participants, id: this.state.id2 }
    });
  };

  handleParticipants = participants => this.setState({ participants });
  render() {
    const id = this.props.match.params.id;
    const id2 = this.props.match.params.id2;
    const { history } = this.props;
    // console.log('students', this.state.participants);
    return (
      <Query query={QUERY_SINGLE_PLANNEDCOURSE} variables={{ id: id2 }}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'loading...';
          }
          let {
            plannedcourse: { startdate, enddate },
            plannedcourse: { students }
          } = data;
          /*   if (students && this.state.participants.length === 0) {
            this.setState({ participants: students });
          } */
          startdate = format(startdate, 'YYYY-MM-DD');
          enddate = format(enddate, 'YYYY-MM-DD');
          const dates = { startdate, enddate };
          //return <h1>pcEdut</h1>;
          return (
            <Composed>
              {({ updatePlannedCourse, deletePlannedCourse, updatePlannedCourseParticipants }) => {
                return (
                  <React.Fragment>
                    <PlannedCourseFormNew
                      course={data.plannedcourse.course}
                      id={id}
                      initialValues={{ ...data.plannedcourse, ...dates }}
                      onDelete={async id => {
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
                        this.handleSave(
                          input,
                          updatePlannedCourse,
                          updatePlannedCourseParticipants
                        );
                      }}
                    />
                    <EditStudentsOnCourse
                      id={id2}
                      initialValues={{ students }}
                      onChange={state => this.handleParticipants(state)}
                    />
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
