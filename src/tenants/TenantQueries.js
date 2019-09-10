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
        number
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

export const QUERY_TENANT_DETAIL = gql`
  query QUERY_TENANT_DETAIL($input: TenantCustomerDetailsWhereInput) {
    tenantcustomerdetail(input: $input) {
      id
      customer {
        name
      }
      customerid
      golivedate
      golivecomments
      csm
      pm
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
