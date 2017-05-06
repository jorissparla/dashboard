import React, { Component } from "react";
import { withRouter } from "react-router";
import { gql, graphql } from "react-apollo";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { pinkA200, transparent } from "material-ui/styles/colors";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import DropDownIcon
  from "material-ui/svg-icons/navigation/arrow-drop-down-circle";
import System from "material-ui/svg-icons/action/done-all";
import MapsPlace from "material-ui/svg-icons/maps/place";
import RaisedButton from "material-ui/RaisedButton";
import ContentFilter from "material-ui/svg-icons/content/filter-list";
import FileFileDownload from "material-ui/svg-icons/file/file-download";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between
`;

const ProfilePicture = styled.div`
  flex-base: 20%;
  flex: 0;
  margin: 20px;
`;
const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 20px;

`;
const Title = styled.div`
  font-family:Oswald;
  font-size: 24px;
  flex:1;
  background:${props => (props.background ? "lightblue" : "white")}
`;
const Content = styled.div`

`;

class StudentView extends Component {
  state = { counter: 0 };

  constructor(props) {
    super(props);
    this.renderCourses = this.renderCourses.bind(this);
    this.updateEnrollStatus = this.updateEnrollStatus.bind(this);
  }

  showCourseMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem primaryText="in Progress" />
        <MenuItem primaryText="Completed" />
        <MenuItem primaryText="Planned" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

  showEnrollMenu(enrol) {
    return (
      <IconMenu
        iconButtonElement={<IconButton><DropDownIcon /></IconButton>}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText="in Progress"
          onClick={() => this.updateEnrollStatus(enrol, "In Progress")}
        />
        <MenuItem
          primaryText="Completed"
          onClick={() => this.updateEnrollStatus(enrol, "Completed")}
        />
        <MenuItem
          primaryText="Planned"
          onClick={() => this.updateEnrollStatus(enrol, "Planned")}
        />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

  updateEnrollStatus(enrol, status) {
    const { updateStatus } = this.props;
    updateStatus(enrol.id, enrol.course.id, enrol.navid, status).then(
      this.props.data.refetch()
    );
    this.setState({ counter: this.state.counter++ });
  }
  renderCourses(enrollments) {
    console.log("Props", this.props);
    var _self = this.props;
    return (
      <List>
        {enrollments.map(enrol => (
          <ListItem
            primaryText={enrol.course.title}
            leftAvatar={
              <Avatar
                color={pinkA200}
                backgroundColor={"#FFFFFF"}
                style={{ left: 8 }}
              >
                {enrol.status.slice(0, 3).toUpperCase()}
              </Avatar>
            }
            secondaryText={
              <p
              >{`${enrol.course.description}, ${enrol.course.hours} hours`}</p>
            }
            rightToggle={this.showEnrollMenu(enrol)}
          />
        ))}
      </List>
    );
  }

  render() {
    const { loading, error, account } = this.props.data;
    console.log("rerender");
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Paper>
          <Container>
            <ProfilePicture>
              {account.picture
                ? <Avatar src={account.picture.data} size={80} />
                : <Avatar
                    src="https://randomuser.me/api/portraits/men/48.jpg"
                    size={80}
                  />}
            </ProfilePicture>
            <Details>
              <Title>
                {account.fullname}
              </Title>
              <Content>
                {`in Team ${account.team}, Location ${account.locationdetail ? account.locationdetail.location : account.location}`}
              </Content>
            </Details>

          </Container>
        </Paper>
        <Paper style={{ marginTop: 40 }}>
          <Container>
            <Title background>
              Courses {this.showCourseMenu()}
            </Title>

          </Container>
          <Content>
            {this.renderCourses(account.enrollments)}
          </Content>
        </Paper>
      </div>
    );
  }
}

const queryProfile = gql`
  query queryProfile($id: ID) {
    account(id: $id ) {
      navid
      login
      fullname
      team
      location
      locationdetail {
        location
      }
      picture {
        data
      }
      enrollments {
        id
        status
        course {
          id
          title
          hours
          description
        }
      }
    }
  }
`;

const updateStatus = gql`
  mutation updateStatus($id: ID, $courseid: String, $navid: String, $status: String) {
    setStudentCourseStatus(id: $id, courseid: $courseid, navid: $navid, status: $status) {
      course {
        title
      }
      status
    }
  }
`;

export default graphql(updateStatus, {
  props: ({ mutate }) => ({
    updateStatus: (id, courseid, navid, status) =>
      mutate({
        variables: { id, courseid, navid, status }
      })
  })
})(
  graphql(queryProfile, {
    options: ownProps => ({ variables: { id: ownProps.params.id } })
  })(withRouter(StudentView))
);
