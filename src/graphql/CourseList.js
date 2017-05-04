import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { SmallCard } from "../common/SmallCard";
import { Link, withRouter } from "react-router";
import styled from "styled-components";
import Card from "./Card";
import SearchBar from "../common/SearchBar";

const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
 
`;

class CourseList extends Component {
  state = {};

  render() {
    const { loading, error, supportcard, courses } = this.props.data;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const count = 1; //courses._studentsMeta.count;
    console.log(courses);
    return (
      <div>
        <SearchBar />
        <StyledContainer>

          {courses.map((course, i) => (
            <div>
              <Card
                course={course}
                index={i}
                count={course._studentsMeta.count}
              />
            </div>
          ))}
        </StyledContainer>
      </div>
    );
  }
}

const courseQuery = gql`
  query courseQuery {
    courses {
        id
        team
        title
        description
        link
        _studentsMeta {
          count
        }
        students {
          fullname

        }
    }
  }
`;

export default graphql(courseQuery)(withRouter(CourseList));
