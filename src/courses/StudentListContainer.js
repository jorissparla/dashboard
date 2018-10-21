import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import StudentTable from "./StudentTable";
import CircularProgress from "@material-ui/core/CircularProgress";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class StudentListContainer extends Component {
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

const accountsQuery = gql`
  query accountsQuery {
    accounts(region: "EMEA", teams: ["LOG", "FIN", "TLS"]) {
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
