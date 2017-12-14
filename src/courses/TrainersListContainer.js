import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import StudentTable from "./StudentTable";
import CircularProgress from "material-ui/CircularProgress";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class TrainersListContainer extends Component {
  render() {
    const { loading, error, accounts } = this.props.data;

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
    return <StudentTable accounts={accounts} startdate={this.props.startdate} enddate={this.props.enddate} />;
  }
}

const trainersQuery = gql`
  query trainersQuery {
    {
      plannedcourses {
        id
        trainer
        hours
        course {
          title
        }
        startdate
        enddate
      }
    }
  }
`;

export default graphql(trainersQuery)(withRouter(TrainersListContainer));
