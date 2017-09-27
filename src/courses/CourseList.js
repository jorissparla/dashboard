import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import Card from "./Card";
import SearchBar from "../common/SearchBar";
import { TitleBar } from "../common/TitleBar";
import AddCard from "./AddCard";
import withAuth from "../utils/withAuth";
const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

class CourseList extends Component {
  state = { searchText: "" };

  constructor(props) {
    super(props);
    console.log(props);
  }

  handleSearchTextChange = val => {
    this.setState({ searchText: val });
  };
  render() {
    const { loading, error, courses } = this.props.data;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const filteredCourses = courses.filter(
      course =>
        course.title.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
        course.team.toUpperCase().includes(this.state.searchText.toUpperCase())
    );
    return (
      <div>
        <TitleBar>Courses</TitleBar>
        <SearchBar
          style={{ display: "flex" }}
          onChange={this.handleSearchTextChange}
          hintText="Search for title or team...."
        />
        <StyledContainer>
          <AddCard />
          {filteredCourses.map((course, i) => (
            <Card key={course.id} course={course} index={i} count={course._studentsMeta.count} />
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

export default graphql(courseQuery)(withAuth(withRouter(CourseList)));
