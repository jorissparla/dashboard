import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

function filterOn(object, fields = [], nestedFields = '', value) {
  const res = fields.some(field => _.includes(object[field].toUpperCase(), value.toUpperCase()));
  let res2 = false;
  if (nestedFields) {
    const [field, subfield] = nestedFields.split('.');
    res2 = object[field].some(sf => _.includes(sf[subfield].toUpperCase(), value.toUpperCase()));
  }
  return res || res2;
  //|| nestedFields.some(_.includes(object)));
}

export default class UserSearchList extends React.Component {
  state = { searchText: '', users: [] };
  handleChange = value => {
    this.setState({ searchText: value });
  };

  componentDidCatch() {
    return 'An error has occurred';
  }
  render() {
    const { limit = 5 } = this.props;
    // const { searchFields = ['fullname'] } = this.props;
    return (
      <Query query={QUERY_SUPPORT_FOLKS}>
        {({ data, loading }) => {
          if (loading) {
            return 'loading';
          }
          const filteredUsers = data.supportfolks
            .filter(
              user =>
                filterOn(
                  user,
                  ['fullname', 'team'],
                  'permissions.permission',
                  this.state.searchText
                )
              //_.includes(user.fullname.toUpperCase(), this.state.searchText.toUpperCase())
            )
            .slice(0, limit);
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
