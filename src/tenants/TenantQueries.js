import gql from "graphql-tag";

export const TENANT_NOTE = gql`
  query TENANT_NOTE {
    updatestatus(name: "tenantlist") {
      id
      note
    }
  }
`;
export const ALL_TENANTS = gql`
  query q {
    tenants {
      id
      farm
      name
      version
      customerid
      tenant_status
      operational_status
      process_status
      updatedAt
      frozen
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
      info
      temperature
      comments
      comments_updated
      updated
      tenants {
        id
        farm
        name
        version
        lastupdated
        live
      }
    }
  }
`;
export const QUERY_ALL_TENANT_DETAILS = gql`
  query QUERY_ALL_TENANT_DETAILS {
    tenantcustomerdetails {
      id
      customer {
        name
      }
      customerid
      golivedate
      golivecomments
      csm
      pm
      info
      temperature
      comments
      comments_updated
      updated
      tenants {
        id
        farm
        name
        version
        lastupdated
        live
      }
    }
  }
`;

export const MUTATION_UPDATE_DETAIL = gql`
  mutation updateTenantCustomerDetails($input: TenantCustomerDetailsInput) {
    updateTenantCustomerDetails(input: $input) {
      id
      customer {
        name
      }
      customerid
      golivedate
      golivecomments
      csm
      pm
      info
      temperature
      comments
      comments_updated
      updated
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
      details {
        comments
        comments_updated
        updated
      }
    }
  }
`;
