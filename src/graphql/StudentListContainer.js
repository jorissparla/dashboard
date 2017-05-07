import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { Link, withRouter } from "react-router";
import styled from "styled-components";
import Card from "./Card";
import SearchBar from "../common/SearchBar";
import StudentList from "./StudentList";
import StudentTable from "./StudentTable";
import CircularProgress from "material-ui/CircularProgress";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

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
    return <StudentTable accounts={accounts} />;
  }
}

const accountsQuery = gql`
  query accountsQuery {
    accounts (region: "EMEA") {
      id
        firstname
        lastname
        fullname
        team
        region
        picture {
          data
        }
        location
        locationdetail {
          location
        }
        _courseMeta {
            count
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
