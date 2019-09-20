import gql from 'graphql-tag';

export const ALL_FOLLOWED_QUERY = gql`
  query ALL_FOLLOWED_QUERY {
    customers {
      id
      number
      name
      followedBy
    }
  }
`;
