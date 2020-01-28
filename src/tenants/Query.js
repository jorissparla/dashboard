import gql from 'graphql-tag';

export const CREATE_AUDIT_MUTATION = gql`
  mutation CREATE_AUDIT_MUTATION($input: InputAuditType) {
    createAudit(input: $input) {
      id
      page
      linkid
      username
      type
      createdate
    }
  }
`;
