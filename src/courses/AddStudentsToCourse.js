import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import Paper from "material-ui/Paper";
import { red500 } from "material-ui/styles/colors";
import { withRouter } from "react-router";
import styled from "styled-components";
import SearchBar from "../common/SearchBar";
import CircularProgress from "material-ui/CircularProgress";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";
import { pinkA200, transparent } from "material-ui/styles/colors";
import _ from "lodash";
import { TitleBar } from "../common/TitleBar";
import withAuth from "../utils/withAuth";

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Div1 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Left = styled.div`
  flex-basis: 30%;
  margin-left: 5px;
`;
const Right = styled.div`
  flex-basis: 65%;
  flex: 1;
`;

class AddStudentsToCourse extends Component {
  state = { searchText: "" };

  handleSearchChange = val => {
    this.setState({ searchText: val });
  };
  renderStudents = students => {
    return students.map(
      student =>
        student ? (
          <Chip
            onRequestDelete={() => {
              console.log("RequestDelete", this.props.data);
              const { plannedcourses } = this.props.data;
              const thiscourse = plannedcourses[0];
              const input = {
                plannedcourseid: thiscourse.id,
                courseid: thiscourse.course.id,
                navid: student.navid
              };
              this.props
                .removeStudentFromCourse({
                  variables: {
                    input
                  }
                })
                .then(this.props.data.refetch());
            }}
            style={{ margin: 4 }}
            key={student.navid}
          >
            {student.image ? (
              <Avatar src={student.image} />
            ) : (
              <Avatar color={pinkA200} backgroundColor={transparent} style={{ left: 8 }}>
                {student.fullname.slice(0, 1).concat(student.lastname.slice(0, 1))}
              </Avatar>
            )}

            {student.fullname}
          </Chip>
        ) : (
          <div />
        )
    );
  };

  render() {
    const { data: { loading, error, accounts, plannedcourses } } = this.props;
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
    console.log("PROPS", this.props);
    const plannedcourse = plannedcourses[0];
    const filteredAccounts0 = _.chain(accounts)
      .filter(account => account.locationdetail && account.team)
      // .filter(account => !studentsAsString.includes(account.fullname))
      .filter(
        account =>
          account.fullname.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          account.locationdetail.location.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          account.team.toUpperCase().includes(this.state.searchText.toUpperCase())
      )
      .value();
    const filteredAccounts = _.uniqBy(filteredAccounts0, item => item.navid);
    console.log(`filteredAccounts (${filteredAccounts.length})`, filteredAccounts);
    //const { id, course, students } = plannedcourse;
    return (
      <div>
        <Paper>
          <TitleBar>
            Add Students to Course ' {plannedcourse.course.title}
            '
            <RaisedButton
              style={{ marginLeft: 20 }}
              label="back to course"
              onClick={() => (window.location.href = `/courses/edit/${plannedcourse.course.id}`)}
            />
          </TitleBar>
        </Paper>

        <Div>
          <Right>
            <Paper zDepth={3}>
              <SearchBar
                onChange={this.handleSearchChange}
                hintText="Search on name or team or location.."
                style={{
                  background: "#FAFAFA",
                  display: "flex",
                  borderBottom: "1px solid rgba(0,0,0,0.12)"
                }}
              />
            </Paper>
            <Paper>
              <List>
                <Divider />
                {filteredAccounts.map((item, index) => {
                  const { id, fullname, lastname, location, locationdetail, team, navid, image } = item;
                  return (
                    <ListItem
                      key={`${id}.${index}`}
                      leftAvatar={
                        image ? (
                          <Avatar src={image} />
                        ) : (
                          <Avatar color={pinkA200} backgroundColor={transparent} style={{ left: 8 }}>
                            {fullname.slice(0, 1).concat(lastname.slice(0, 1))}
                          </Avatar>
                        )
                      }
                      primaryText={fullname}
                      secondaryText={`located in ${locationdetail.location}(${location}), in team ${team}`}
                      rightIcon={
                        <FloatingActionButton
                          mini={true}
                          backgroundColor={red500}
                          style={{ marginRight: 20 }}
                          onClick={() => {
                            console.log(`clicked ${plannedcourse.id} ${navid}`);
                            this.props
                              .addStudentToCourse({
                                variables: {
                                  input: {
                                    plannedcourseid: plannedcourse.id,
                                    courseid: plannedcourse.course.id,
                                    navid: navid
                                  }
                                }
                              })
                              .then(this.props.data.refetch());
                          }}
                        >
                          <ContentAdd />
                        </FloatingActionButton>
                      }
                    />
                  );
                })}
              </List>
            </Paper>
          </Right>
          <Left>
            <Paper>
              <Div1>{this.renderStudents(plannedcourse.students)}</Div1>
            </Paper>
          </Left>
        </Div>
      </div>
    );
  }
}

const addStudentToCourse = gql`
  mutation addStudentToCourse($input: InputEnrollment) {
    addStudentToCourse(input: $input) {
      plannedcourse {
        course {
          title
          _studentsMeta {
            count
          }
        }
      }
    }
  }
`;
const removeStudentFromCourse = gql`
  mutation removeStudentFromCourse($input: InputEnrollment) {
    removeStudentFromCourse(input: $input) {
      title
      _studentsMeta {
        count
      }
    }
  }
`;
const selectedCourse = gql`
  query selectedCourse($id: ID) {
    plannedcourses(id: $id) {
      id
      course {
        id
        title
      }
      students {
        id
        navid
        fullname
        lastname
        team
        image
      }
    }
    accounts(region: "EMEA") {
      id
      navid
      fullname
      firstname
      lastname
      team
      location
      locationdetail {
        name
        location
      }
      image
    }
  }
`;
export default compose(
  graphql(removeStudentFromCourse, { name: "removeStudentFromCourse" }),
  graphql(addStudentToCourse, { name: "addStudentToCourse" }),
  graphql(selectedCourse, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  })
)(withRouter(withAuth(AddStudentsToCourse)));
