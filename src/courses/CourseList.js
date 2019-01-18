import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import _ from 'lodash';
import format from 'date-fns/format';
//import Card from "./Card";
import Card from './NewCard';
import SearchBar from '../common/SearchBar';
import { TitleBar } from '../common/TitleBar';
import AddCard from './AddCard';
import withAuth from '../utils/withAuth';
const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  pointer-events: ${props => (props.readonly === true ? 'none' : 'all')};
`;

class CourseList extends Component {
  state = { searchText: '' };

  handleSearchTextChange = val => {
    this.setState({ searchText: val });
  };
  render() {
    const { user } = this.props;
    let validRole = false;
    if (user) {
      validRole = user.role !== 'Guest';
    }
    console.log('CourseList', user);
    const { loading, error, courses } = this.props.data;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const filteredCourses = _.chain(courses)
      .filter(
        course =>
          course.title.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          course.team.toUpperCase().includes(this.state.searchText.toUpperCase())
      )
      .orderBy(
        o =>
          o.plannedcourses[0] ? format(o.plannedcourses[0].startdate, 'YYYYMMDD') : o.lastmodified,
        'desc'
      )
      .value();
    return (
      <div>
        <SearchBar
          style={{ display: 'flex' }}
          onChange={this.handleSearchTextChange}
          hintText="Search for title or team...."
        />
        <StyledContainer readonly={Object.keys(user).length === 0}>
          {validRole && <AddCard />}
          {filteredCourses.map((course, i) => (
            <Card
              key={course.id}
              course={course}
              index={i}
              count={course._studentsMeta.count}
              validRole={validRole}
            />
          ))}
        </StyledContainer>
      </div>
    );
  }
}

const QUERY_ALL_COURSES = gql`
  query QUERY_ALL_COURSES {
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
      plannedcourses(limit: 1) {
        startdate
        studentcount
        students {
          id
          fullname
          image
        }
      }
    }
  }
`;

export default graphql(QUERY_ALL_COURSES)(withAuth(withRouter(CourseList)));

export { QUERY_ALL_COURSES };
