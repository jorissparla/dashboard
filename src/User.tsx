import React, { useEffect, FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import { CurrentUserQueryComponent, CurrentUserQueryMe } from './generated/apolloComponents.old';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      fullname
      email
      team
      location
      region
      image
      role
      permissions {
        permission
      }
    }
  }
`;

type CurrentUser = {
  id?: string;
  fullname?: string;
  email?: string;
  image?: string;
  team?: string;
  location?: string;
  region?: string;
  role?: string;
  permissions?: { permission: string; ____typename: string }[];
};

interface UserProps {
  children: Function;
}
const User: FunctionComponent<UserProps> = (props: any) => {
  const { children } = props;
  return <Query query={CURRENT_USER_QUERY}>{(payload: any) => children(payload)}</Query>;
};

export const UserProfileComponent: FunctionComponent<any> = (props: any) => {
  return (
    <CurrentUserQueryComponent>
      {({ data, loading }) => {
        if (loading) {
          return 'Loading';
        }
        if (!data) {
          return 'Error';
        }
        if (!data.me) {
          return 'Error';
        }
        const me: CurrentUserQueryMe = data.me;
        return (
          <div>
            <h1>Hallo {me.fullname}</h1>
            <img src={me.image || ''} />
          </div>
        );
      }}
    </CurrentUserQueryComponent>
  );
};

export default User;

export { CURRENT_USER_QUERY };

export function withUser() {
  const result = useQuery(CURRENT_USER_QUERY, { suspend: false });
  if (result.loading) {
    return null;
  }
  const data = result.data;

  if (data) {
    if (data.me) {
      const me: CurrentUser = data.me;
      return me;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
