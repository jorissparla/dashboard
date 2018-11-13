import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import Component from './common/component-component';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from './common/SearchBar';
import _ from 'lodash';

const QUERY_SUPPORT_FOLKS = gql`
  query QUERY_SUPPORT_FOLKS {
    supportfolks {
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
      permissions {
        permission
      }
    }
  }
`;

export default class UserSearchList extends React.Component {
  state = { searchText: '', users: [] };
  handleChange = value => {
    this.setState({ searchText: value });
  };
  render() {
    return (
      <Query query={QUERY_SUPPORT_FOLKS}>
        {({ data, loading }) => {
          if (loading) {
            return 'loading';
          }
          const filteredUsers = data.supportfolks.filter(user =>
            _.includes(user.fullname.toUpperCase(), this.state.searchText.toUpperCase())
          );
          return (
            <div>
              <SearchBar onChange={this.handleChange} {...this.props} />
              {this.props.children({ users: filteredUsers })}
            </div>
          );
        }}
      </Query>
    );
  }
}
