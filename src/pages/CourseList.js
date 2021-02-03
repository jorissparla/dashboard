import { useQuery, gql } from "@apollo/client";
import TWButton from "elements/TWButton";
import { useIsValidEditor } from "globalState/UserProvider";
import _ from "lodash";
import React, { useState } from "react";
import { useHistory, withRouter } from "react-router";
import SearchBar from "../common/SearchBar";
import Card from "../courses/NewCard";
import { format } from "../utils/format";
import withAuth from "../utils/withAuth";

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
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  // const { user } = useUserContext();
  let [validRole, user] = useIsValidEditor("COURSEEDIT");

  const { loading, data } = useQuery(QUERY_ALL_COURSES);
  if (loading) {
    return <p>Loading ...</p>;
  }
  const { courses } = data;
  const handleSearchTextChange = (val) => {
    setSearchText(val);
  };

  const filteredCourses = _.chain(courses)
    .filter((course) => course.title.toUpperCase().includes(searchText.toUpperCase()) || course.team.toUpperCase().includes(searchText.toUpperCase()))
    .orderBy((o) => (o.plannedcourses[0] ? format(o.plannedcourses[0].startdate, "yyyyMMdd") : o.lastmodified), "desc")
    .value();
  return (
    <div className="w-full ">
      <header class="flex items-center justify-between bg-white mx-2">
        <h2 class="text-lg leading-6 font-medium text-black">Courses</h2>
        {validRole && <TWButton onClick={() => history.push("/courses/create")}>New</TWButton>}
      </header>
      <SearchBar style={{ display: "flex" }} onChange={handleSearchTextChange} hintText="Search for title or team...." className="-ml-10 w-5/6" />
      <div className="flex flex-wrap justify-start mt-4 bg-grey-100" readonly={!user}>
        {filteredCourses.map((course, i) => (
          <Card key={course.id} course={course} index={i} count={course._studentsMeta.count} validRole={validRole} />
        ))}
      </div>
    </div>
  );
};

export default withAuth(withRouter(CourseList));

export { QUERY_ALL_COURSES };
