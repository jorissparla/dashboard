import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router";
import styled from "styled-components";
import _ from "lodash";
//import format from 'date-fns/format';
import { format } from "../utils/format";
import Card from "../courses/NewCard";
import SearchBar from "../common/SearchBar";
import AddCard from "../courses/AddCard";
import withAuth from "../utils/withAuth";
const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  pointer-events: ${(props) => (props.readonly === true ? "none" : "all")};
`;
const QUERY_ALL_COURSES = gql`
  query QUERY_ALL_COURSES {
    courses {
      id
      team
      title
      documentnr

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

const CourseList = (props) => {
  const [searchText, setSearchText] = useState("");
  // state = { searchText: '' };
  const { loading, data } = useQuery(QUERY_ALL_COURSES);
  if (loading) {
    return <p>Loading ...</p>;
  }
  const { courses } = data;
  const handleSearchTextChange = (val) => {
    setSearchText(val);
  };
  const { user } = props;
  let validRole = false;
  if (user) {
    validRole = user.role !== "Guest";
  }

  const filteredCourses = _.chain(courses)
    .filter((course) => course.title.toUpperCase().includes(searchText.toUpperCase()) || course.team.toUpperCase().includes(searchText.toUpperCase()))
    .orderBy((o) => (o.plannedcourses[0] ? format(o.plannedcourses[0].startdate, "yyyyMMdd") : o.lastmodified), "desc")
    .value();
  return (
    <div className="w-full bg-gray-200">
      <SearchBar style={{ display: "flex" }} onChange={handleSearchTextChange} hintText="Search for title or team...." />
      <StyledContainer readonly={!user}>
        {validRole && <AddCard />}
        {filteredCourses.map((course, i) => (
          <Card key={course.id} course={course} index={i} count={course._studentsMeta.count} validRole={validRole} />
        ))}
      </StyledContainer>
    </div>
  );
};

export default withAuth(withRouter(CourseList));

export { QUERY_ALL_COURSES };
