import gql from 'graphql-tag';
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      fullname
      email
      image
      role
      permissions {
        permission
      }
    }
  }
`;
export const QUERY_VIDEO_CATEGORIES = gql`
  query QUERY_VIDEO_CATEGORIES {
    videocategories {
      id
      name: category
      sequence
    }
  }
`;
