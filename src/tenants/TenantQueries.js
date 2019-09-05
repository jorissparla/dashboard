import gql from 'graphql-tag';
export const ALL_TENANTS = gql`
  query q {
    tenants {
      id
      farm
      name
      version
      customerid
      customer {
        name
      }
      lastupdated
      live
    }
    updatestatus(name: "TenantList") {
      id
      updatedAt
    }
    tenantlogs {
      id
      date
      log
    }
  }
`;
export const MUTATION_MARK_LIVE = gql`
  mutation MUTATION_MARK_LIVE($input: CustomerStatusInput) {
    markLive(input: $input) {
      id
      farm
      name
      version
      customerid
      customer {
        name
      }
      lastupdated
      live
    }
  }
`;
