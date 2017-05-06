import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import { red500 } from "material-ui/styles/colors";
import { withRouter } from "react-router";
import styled from "styled-components";
import SearchBar from "../common/SearchBar";
import CircularProgress from "material-ui/CircularProgress";
import Checkbox from "material-ui/Checkbox";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";

const Container = styled.div`
  display: flex;
  justify-content: space-between
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const Div1 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: right;
`;

const Title = styled.div`
  font-family:Oswald;
  font-size: 24px;
  flex:1;
  background:${props => (props.background ? "lightblue" : "white")}
`;

class AddStudentsToCourse extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.renderStudents = this.renderStudents.bind(this);
  }

  renderStudents(students) {
    return students.map(student => (
      <Chip
        onRequestDelete={() =>
          this.props
            .removeStudentFromCourse(this.props.data.course.id, student.navid)
            .then(this.props.data.refetch())}
        style={{ margin: 4 }}
      >
        {student.picture
          ? <Avatar src={student.picture.data} />
          : <Avatar src={`https://randomuser.me/api/portraits/men/18.jpg`} />}
        {student.fullname}
      </Chip>
    ));
  }

  render() {
    const { data: { loading, error, accounts, course } } = this.props;
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
    const studentsAsString = course.students
      .map(student => student.fullname)
      .join(" ");
    const filteredAccounts = accounts.filter(
      account => !studentsAsString.includes(account.fullname)
    );
    console.log(this.props);
    return (
      <div>
        <Paper>
          <Title>Add Students to Course ' {course.title}'</Title>
        </Paper>
        <Paper>
          <Div1>

            {this.renderStudents(course.students)}
          </Div1>
        </Paper>
        <Paper zDepth={3}>
          <SearchBar onChange={() => console.log("jaja")} />
        </Paper>
        <List>
          <Divider />
          {filteredAccounts.map((item, index) => {
            const { id, picture, fullname, location, team, navid } = item;
            const enabled = false;
            return (
              <ListItem
                key={id}
                leftAvatar={
                  <Avatar
                    src={`https://randomuser.me/api/portraits/men/28.jpg`}
                  />
                }
                primaryText={fullname}
                secondaryText={`located in ${location}, in team ${team}`}
                rightIcon={
                  <FloatingActionButton
                    mini={true}
                    backgroundColor={red500}
                    style={{ marginRight: 20 }}
                    onClick={() => {
                      console.log(`clicked ${course.id} ${navid}`);
                      this.props
                        .addStudentToCourse(course.id, navid)
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
      </div>
    );
  }
}

const addStudentToCourse = gql`
   mutation addStudentToCourse($courseid:ID, $navid: String){
      addStudentToCourse(courseid:$courseid, navid: $navid) {
        title
        _studentsMeta {
          count
        }
      }

}`;
const removeStudentFromCourse = gql`
   mutation removeStudentFromCourse($courseid:ID, $navid: String){
      removeStudentFromCourse(courseid:$courseid, navid: $navid) {
        title
        _studentsMeta {
          count
        }
      }
  }

`;
const selectedCourse = gql`
  query selectedCourse($id: ID) {
    course(id: $id) {
      id
      title
        students {
          id
          navid
          fullname
          team
          picture {
            data
          }
        }
    }
    accounts (region: "EMEA"){
      id
      navid
      fullname
      team,
      location
    }
  }
`;
export default graphql(removeStudentFromCourse, {
  props: ({ mutate }) => ({
    removeStudentFromCourse: (courseid, navid) =>
      mutate({
        variables: { courseid, navid }
      })
  })
})(
  graphql(addStudentToCourse, {
    props: ({ mutate }) => ({
      addStudentToCourse: (courseid, navid) =>
        mutate({
          variables: { courseid, navid }
        })
    })
  })(
    graphql(selectedCourse, {
      options: ownProps => ({ variables: { id: ownProps.params.id } })
    })(withRouter(AddStudentsToCourse))
  )
);
