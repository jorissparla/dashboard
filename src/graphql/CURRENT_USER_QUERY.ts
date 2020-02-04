import gql from 'graphql-tag';
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      fullname
      email
      image
      role
      team
      region
      permissions {
        permission
      }
    }
  }
`;
