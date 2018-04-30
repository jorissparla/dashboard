import React, { Component } from "react";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { pinkA200 } from "material-ui/styles/colors";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import DownIcon from "material-ui/svg-icons/navigation/expand-more";
import DetailsIcon from "material-ui/svg-icons/image/details";
import FileFileDownload from "material-ui/svg-icons/file/file-download";
import Chip from "material-ui/Chip";
import format from "date-fns/format";
import _ from "lodash";
import { TitleBar } from "../common/TitleBar";
import SearchBar from "../common/SearchBar";
import withAuth from "../utils/withAuth";
import { Title, HeaderRow, HeaderLeft, HeaderRight, StyledInitials } from "../styles";
import { initials } from "../utils/misc";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfilePicture = styled.div`
  flex: 0;
  margin: 20px;
`;
const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div``;

class StudentView extends Component {
  state = { counter: 0, searchText: "" };

  constructor(props) {
    super(props);
    this.renderCourses = this.renderCourses.bind(this);
    this.updateEnrollStatus = this.updateEnrollStatus.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(val) {
    this.setState({ searchText: val });
  }
  showCourseMenu() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
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

  showEnrollMenu(enrol, navid) {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <DownIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText="in Progress"
          onClick={() => this.updateEnrollStatus(enrol, navid, "In Progress")}
        />
        <MenuItem
          primaryText="Completed"
          onClick={() => this.updateEnrollStatus(enrol, navid, "Completed")}
        />
        <MenuItem
          primaryText="Planned"
          onClick={() => this.updateEnrollStatus(enrol, navid, "Planned")}
        />
        <MenuItem
          primaryText="View Course"
          leftIcon={<FileFileDownload />}
          onClick={() => this.props.history.push(`/courses/edit/${enrol.course.id}`)}
        />
      </IconMenu>
    );
  }

  updateEnrollStatus(enrol, navid, status) {
    const { updatestatus } = this.props;
    const input = {
      id: enrol.id,
      status: status
    };
    console.log("status", enrol);
    updatestatus({ variables: { input } }).then(this.props.data.refetch());
    this.setState({ counter: this.state.counter + 1 });
  }

  renderCourses(enrollments, navid) {
    const { history, authenticated, user } = this.props;
    let validRole = false;
    if (user) {
      validRole = user.role !== "Guest";
    }
    if (!enrollments) return <div>Loading...</div>;

    return (
      <List>
        {enrollments.map((enrol, i) => {
          //  console.log("entroll", enrol);
          return [
            <ListItem
              key={enrol.id}
              primaryText={enrol.course.title}
              secondaryText={
                <div style={{ display: "flex" }}>
                  <div style={{ margin: 4 }}>
                    {`${enrol.course.description}, ${enrol.plannedcourse.hours} hours, status: ${
                      enrol.plannedcourse.status
                    }, by trainer: ${enrol.plannedcourse.trainer}`}
                  </div>
                  <Chip style={{ margin: 2 }}>{`Start  ${format(
                    enrol.plannedcourse.startdate,
                    "ddd, DD-MMM-YYYY"
                  )}`}</Chip>
                </div>
              }
              secondaryTextLines={2}
              rightToggle={
                authenticated &&
                validRole && (
                  <DetailsIcon
                    onClick={() => this.props.history.push(`/courses/edit/${enrol.course.id}`)}
                  />
                )
              } //this.showEnrollMenu(enrol, navid)}
            />,
            <Divider key={i} />
          ];
        })}
      </List>
    );
  }

  render() {
    const { loading, error, account } = this.props.data;
    const { history, authenticated, user } = this.props;
    let validRole = false;
    if (user) {
      validRole = user.role !== "Guest";
    }
    console.log("PROPS", this.props);
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    let _ = window._;
    const sortedEnrollments = _.chain(account.enrollments)
      .map(o => _.merge({ startdate: Date.parse(o.plannedcourse.startdate) }, o))
      .orderBy(["startdate"], ["desc"])
      .value();
    //console.log(sortedEnrollments);
    return (
      <div>
        <Container>
          <ProfilePicture>
            {account.image ? (
              <Avatar src={account.image} size={80} />
            ) : (
              <StyledInitials>{initials(account.fullname)}</StyledInitials>
            )}
          </ProfilePicture>

          <Details>
            <Title>{account.fullname}</Title>
            <Content>
              {`in Team ${account.team}, Location ${
                account.locationdetail ? account.locationdetail.location : account.location
              }`}
            </Content>
          </Details>
        </Container>
        <Paper style={{ marginTop: 10 }}>
          <SearchBar
            onChange={this.handleSearchTextChange}
            hintText="Search on title.."
            style={{
              background: "#F5F5F5",
              display: "flex"
            }}
          />
          <HeaderRow>
            <HeaderLeft>
              <Title>Registered</Title>
            </HeaderLeft>
          </HeaderRow>

          <Container />
          <Content>{this.renderCourses(sortedEnrollments, account.navid)}</Content>
        </Paper>
      </div>
    );
  }
}

const queryProfile = gql`
  query queryProfile($id: ID) {
    account(id: $id) {
      navid
      login
      fullname
      team
      location
      image
      locationdetail {
        location
      }
      enrollments {
        id
        status
        course {
          id
          title
          description
        }
        plannedcourse {
          startdate
          status
          hours
          trainer
        }
      }
    }
  }
`;

const updateStatus = gql`
  mutation updateStatus($input: UpdateEnrollment) {
    setStudentCourseStatus(input: $input) {
      enrollment {
        course {
          title
        }
        status
      }
    }
  }
`;

export default graphql(updateStatus, { name: "updatestatus" })(
  graphql(queryProfile, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  })(withRouter(withAuth(StudentView)))
);
