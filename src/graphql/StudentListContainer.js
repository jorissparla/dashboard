import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { SmallCard } from "../common/SmallCard";
import { Link, withRouter } from "react-router";
import styled from "styled-components";
import Card from "./Card";
import SearchBar from "../common/SearchBar";
import StudentList from "./StudentList";
import CircularProgress from "material-ui/CircularProgress";

const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
 
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;

class StudentListContainer extends Component {
  render() {
    const { loading, error, account } = this.props.data;

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
    const count = 1; //accounts._studentsMeta.count;
    console.log("rerender");
    return <StudentList accounts={account} />;
  }
}

const accountsQuery = gql`
  query accountsQuery {
    account (region: "EMEA" ) {
      id
        fullname
        team
        picture {
          data
        }
        locationdetail {
          location
        }
        enrollments {
          status
          course {
            title
          }
        }
    }
  }
`;

export default graphql(accountsQuery)(withRouter(StudentListContainer));
