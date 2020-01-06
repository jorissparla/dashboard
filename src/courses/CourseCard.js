import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CourseStudentList from './CourseStudentList';
import PlannedCourses from './PlannedCourses';
import { Title } from '../styles';
import _ from 'lodash';
import {addHours} from 'date-fns';

const Div = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex-basis: 30%;
`;
const Right = styled.div`
  flex-basis: 65%;
  flex: 1;
`;

const styles = {
  tabStyle: {
    backgroundColor: '#2196f3',
    fontSize: '1rem'
  }
};

class CourseCard extends Component {
  state = {
    planned: { students: [] },
    toConfirmDeleteCourse: false,
    toConfirmDeletePlanned: false,
    id: null,
    planid: null,
    confirmed: false,
    activeTab: 'course',
    showMessage: false,
    message: 'Done'
  };

  handleMessage = message => {
    this.setState({ showMessage: true, message });
  };

  autoCloseMessage = () => {
    this.setState({ showMessage: false, message: '' });
  };
  showConfirmDialog = ({ id }) => {
    this.setState({ toConfirmDeleteCourse: true, id });
  };
  showConfirmDeletePlannedDialog = id => {
    console.log('hier', id);
    this.setState({ toConfirmDeletePlanned: true, planid: id });
  };

  confirmedDeleteCourse = () => {
    this.setState({ toConfirmDeleteCourse: false });
    this.handleDelete(this.state.id);
  };
  confirmedDeletePlanned = () => {
    this.setState({ toConfirmDeletePlanned: false });
    console.log('deleting', this.state.planid);
    this.handleDeletePlanned(this.state.planid);
  };

  cancelDelete = () =>
    this.setState({ toConfirmDeletePlanned: false, toConfirmDeleteCourse: false, id: null });

  handleDelete = id => {
    this.props
      .deleteCourse({ variables: { input: { id } } })
      .then(this.props.history.push(`/courses`))
      .then(this.props.data.refetch())
      .then(this.setState({ id: null }))
      //.then(() => setTimeout((window.location.href = "/courses"), 500))
      .catch(e => this.handleMessage(JSON.stringify(e, null, 2)));
  };

  handleDeletePlanned = async id => {
    await this.props.deletePlannedCourse({ variables: { input: { id } } });
    await this.props.data.refetch();
    this.setState({ planid: null });
    this.props.history.push('/courses');
  };

  handleRefetch = async () => {
    await this.props.data.refetch();
  };

  handleUpdatePlanned = async ({
    id,
    startdate,
    enddate,
    status,
    trainer,
    hours,
    location,
    type
  }) => {
    const input = {
      id,
      startdate: addHours(startdate, 13),
      enddate: new Date(addHours(enddate, 13)),
      trainer,
      status,
      hours,
      location,
      type
    };
    await this.props.updatePlannedCourse({ variables: { input } });
    await this.props.data.refetch();
  };
  handleAddPlanned = async ({
    id,
    startdate,
    enddate,
    status,
    hours,
    trainer,
    courseid,
    location,
    type
  }) => {
    const input = {
      id,
      startdate: addHours(new Date(startdate), 13),
      enddate: addHours(new Date(enddate), 13),
      trainer,
      status,
      hours,
      courseid,
      location,
      type
    };
    await this.props.addPlannedCourse({ variables: { input } });
    await this.props.data.refetch();
  };

  handleSave = e => {
    const input = _.pick(e, [
      'id',
      'team',
      'title',
      'description',
      'link',
      'type',
      'hours',
      'startdate',
      'enddate',
      'status',
      'applicable',
      'trainer'
    ]);
    this.props
      .updateCourse({
        variables: {
          input
        }
      })
      .then(this.props.data.refetch())
      .then(this.handleMessage('Updated'))
      .catch(e => this.handleMessage(JSON.stringify(e, null, 2)));
  };

  handlePlannedSelect = (e, i) => {
    this.setState({ planned: e, selected: i });
  };

  render() {
    const {
      loading,
      error,
      course,
      coursetypes,
      courses,
      supportfolks,
      locations,
      statuses
    } = this.props.data;

    const viewMode = this.props.view || false;
    console.log('viewMode', viewMode);
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const { planned, activeTab } = this.state;
    const trainer = planned ? planned.trainer : '';
    const studentlist = planned ? planned.students : [];
    console.log(this.state);
    return (
      <React.Fragment>
        <Tabs
          value={this.state.activeTab}
          onChange={(event, value) => {
            console.log('Value', value);
            this.setState({ activeTab: value });
          }}
        >
          <Tab label="Course Details" value="course" key={1} />
          {!viewMode && <Tab key={2} label="Schedules" value="schedule" />}
          <Tab label="Admin" value="admin" />
        </Tabs>
        {activeTab === 'course' && (
          <Div>
            <Right>
              {/*               <CourseForm
                initialValues={course}
                coursetypes={coursetypes}
                coursecategories={coursecategories}
                statuses={statuses.filter(s => s.type === 'Course')}
                course={course}
                trainers={supportfolks}
                onSave={this.handleSave}
                onDelete={this.showConfirmDialog}
                onRefetch={this.handleRefetch}
                readOnly={viewMode}
              /> */}
            </Right>
          </Div>
        )}
        {activeTab === 'schedule' && (
          <Left>
            <PlannedCourses
              accounts={supportfolks}
              course={course}
              coursetypes={coursetypes}
              courses={courses}
              trainer={trainer}
              locations={locations}
              statuses={statuses.filter(s => s.type === 'Planned')}
              planned={course ? course.plannedcourses : []}
              hours={course ? course.hours : ''}
              onCancel={() => this.props.history.push('/courses')}
              onRowSelected={e => this.setState({ planned: e })}
              onUpdate={v => this.handleUpdatePlanned(v)}
              onAddNew={v => this.handleAddPlanned(v)}
              onDelete={id => this.showConfirmDeletePlannedDialog(id)}
              onRegister={e => this.props.history.push(`/courses/addstudents/${e.id}`)}
            />
            <CourseStudentList students={studentlist} />
          </Left>
        )}
        {activeTab === 'admin' && <Title>No Information Yet</Title>}
      </React.Fragment>
    );
  }
}

const CourseDelete = gql`
  mutation deleteCourse($input: InputCourseType) {
    deleteCourse(input: $input) {
      text
    }
  }
`;

const CourseUpdate = gql`
  mutation updateCourse($input: InputCourseType) {
    updateCourse(input: $input) {
      course {
        id
        applicable
      }
    }
  }
`;

const PlannedCourseUpdate = gql`
  mutation updatePlannedCourse($input: InputPlannedCourseType) {
    updatePlannedCourse(input: $input) {
      course {
        id
      }
    }
  }
`;
const PlannedCourseAdd = gql`
  mutation addPlannedCourse($input: InputPlannedCourseType) {
    addPlannedCourse(input: $input) {
      course {
        id
      }
    }
  }
`;

const PlannedCourseDelete = gql`
  mutation deletePlannedCourse($input: InputPlannedCourseType) {
    deletePlannedCourse(input: $input) {
      text
    }
  }
`;

const CourseQuery = gql`
  query course($id: ID) {
    course(id: $id) {
      id
      title
      description
      team
      link
      status
      type
      category
      startdate
      enddate
      hours
      plannedcourses {
        id
        startdate
        enddate
        status
        trainer
        hours
        team
        type

        location
        students {
          id
          fullname
          image
        }
        studentcount
      }
      applicable
      trainer
      lastmodified
      enrollments {
        id
        status
        student {
          id
          fullname
          image
        }
      }
    }
    coursetypes {
      name
    }
    coursecategories {
      id
      name
    }
    courses {
      id
      title
      hours
    }
    statuses {
      id
      type
      value
    }
    locations(filter: ["ESBA", "NLBA", "CZPA4"]) {
      type
      description
    }
    supportfolks {
      id
      fullname
    }
  }
`;

export default compose(
  graphql(CourseDelete, { name: 'deleteCourse' }),
  graphql(CourseUpdate, { name: 'updateCourse' }),
  graphql(PlannedCourseUpdate, { name: 'updatePlannedCourse' }),
  graphql(PlannedCourseAdd, { name: 'addPlannedCourse' }),
  graphql(PlannedCourseDelete, { name: 'deletePlannedCourse' }),
  graphql(CourseQuery, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  })
)(withRouter(CourseCard));
