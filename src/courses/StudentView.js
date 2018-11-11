import React, { Component } from 'react';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DownIcon from '@material-ui/icons/ExpandMore';
import DetailsIcon from '@material-ui/icons/Details';
import FileFileDownload from '@material-ui/icons/CloudQueue';
import Chip from '@material-ui/core/Chip';
import format from 'date-fns/format';
import _ from 'lodash';
import SearchBar from '../common/SearchBar';
import withAuth from '../utils/withAuth';
import { Title, HeaderRow, HeaderLeft, StyledInitials } from '../styles';
import { initials } from '../utils/misc';

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
  state = { counter: 0, searchText: '' };

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
      <MenuList
        iconButtonElement={
          <Icon>
            <MoreVertIcon />
          </Icon>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem primaryText="in Progress" />
        <MenuItem primaryText="Completed" />
        <MenuItem primaryText="Planned" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </MenuList>
    );
  }

  showEnrollMenu(enrol, navid) {
    return (
      <MenuList
        iconButtonElement={
          <Icon>
            <DownIcon />
          </Icon>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          primaryText="in Progress"
          onClick={() => this.updateEnrollStatus(enrol, navid, 'In Progress')}
        />
        <MenuItem
          primaryText="Completed"
          onClick={() => this.updateEnrollStatus(enrol, navid, 'Completed')}
        />
        <MenuItem
          primaryText="Planned"
          onClick={() => this.updateEnrollStatus(enrol, navid, 'Planned')}
        />
        <MenuItem
          primaryText="View Course"
          leftIcon={<FileFileDownload />}
          onClick={() => this.props.history.push(`/courses/edit/${enrol.course.id}`)}
        />
      </MenuList>
    );
  }

  updateEnrollStatus(enrol, navid, status) {
    const { updatestatus } = this.props;
    const input = {
      id: enrol.id,
      status: status
    };
    console.log('status', enrol);
    updatestatus({ variables: { input } }).then(this.props.data.refetch());
    this.setState({ counter: this.state.counter + 1 });
  }

  renderCourses(enrollments, navid) {
    const { authenticated, user } = this.props;
    let validRole = false;
    if (user) {
      validRole = user.role !== 'Guest';
    }
    if (!enrollments) return <div>Loading...</div>;

    return (
      <List>
        {enrollments.map((enrol, i) => {
          //  console.log("entroll", enrol);
          return [
            <ListItem key={enrol.id}>
              <ListItemText
                primary={enrol.course.title}
                secondary={
                  <span style={{ display: 'flex' }}>
                    {`${enrol.course.description}, ${enrol.plannedcourse.hours} hours, status: ${
                      enrol.plannedcourse.status
                    }, by trainer: ${enrol.plannedcourse.trainer}`}
                  </span>
                }

                //this.showEnrollMenu(enrol, navid)}
              />
              <ListItemSecondaryAction>
                <Chip
                  label={`Start  ${format(enrol.plannedcourse.startdate, 'ddd, DD-MMM-YYYY')}`}
                  style={{ margin: 2 }}
                />
              </ListItemSecondaryAction>
            </ListItem>,
            <Divider key={i} />
          ];
        })}
      </List>
    );
  }

  render() {
    const { loading, error, account } = this.props.data;
    //const { user } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    let _ = window._;
    const sortedEnrollments = _.chain(account.enrollments)
      .map(o => _.merge({ startdate: Date.parse(o.plannedcourse.startdate) }, o))
      .orderBy(['startdate'], ['desc'])
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
              background: '#F5F5F5',
              display: 'flex'
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
          id
          title
        }
        status
      }
    }
  }
`;

export default graphql(updateStatus, { name: 'updatestatus' })(
  graphql(queryProfile, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  })(withRouter(withAuth(StudentView)))
);
