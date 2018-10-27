import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import StudentTable from './StudentTable';
import CircularProgress from '@material-ui/core/CircularProgress';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class StudentListContainer extends Component {
  render() {
    const { loading, error, supportfolks } = this.props.data;

    if (loading) {
      return (
        <Div>
          <CircularProgress size={60} thickness={7} />
        </Div>
      );
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <StudentTable
        accounts={supportfolks}
        startdate={this.props.startdate}
        enddate={this.props.enddate}
      />
    );
  }
}

const accountsQuery = gql`
  query accountsQuery {
    supportfolks {
      id
      firstname
      lastname
      fullname
      team
      region
      image
      location
      locationdetail {
        location
      }
      plannedcourses {
        course {
          trainer
          title
        }
        hours
        startdate
        enddate
      }
    }
  }
`;

export default graphql(accountsQuery)(withRouter(StudentListContainer));
