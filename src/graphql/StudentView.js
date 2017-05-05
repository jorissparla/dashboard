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
`;
const Content = styled.div`

`;

class StudentView extends Component {
  state = {};

  showCourseMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

  renderCourses(enrollments) {
    return (
      <List>
        {enrollments.map(enrol => (
          <ListItem
            primaryText={enrol.course.title}
            leftAvatar={
              <Avatar
                color={pinkA200}
                backgroundColor={"#000000"}
                style={{ left: 8 }}
              >
                {enrol.status.slice(0, 3).toUpperCase()}
              </Avatar>
            }
            secondaryText={<p>{enrol.course.description}</p>}
          />
        ))}
      </List>
    );
  }

  render() {
    const { loading, error, account } = this.props.data;

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
            <Title>
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
        status
        course {
          title
          hours
          description
        }
      }
    }
  }
`;

export default graphql(queryProfile, {
  options: ownProps => ({ variables: { id: ownProps.params.id } })
})(withRouter(StudentView));
