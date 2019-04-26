import gql from 'graphql-tag';
export const AUDIT_QUERY = gql`
  query AUDIT_QUERY($linkid: ID!) {
    audits(linkid: $linkid) {
      id
      page
      linkid
      createdate
    }
  }
`;
