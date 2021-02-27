import { gql } from "graphql-request";
// import { gqls } from "@apollo/client";

export const TENANT_NOTE = gql`
  query TENANT_NOTE {
    updatestatus(name: "tenantlist") {
      id
      note
    }
  }
`;
export const ALL_TENANTS = gql`
  query ALL_TENANTS {
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
export const ALL_TENANTS_SIMPLE = gql`
  query ALL_TENANTS_SIMPLE {
    tenants {
      id
      farm
      name
      version
      customerid
      lastupdated
      live
    }
  }
`;

export const QUERY_CUSTOMER_EVENTS = gql`
  query QUERY_CUSTOMER_EVENTS($customerid: String) {
    customerEvents(customerid: $customerid) {
      id
      date
      comment
      eventtype
      nrusers
    }
  }
`;

export const MUTATION_ADD_CUSTOMER_EVENT = gql`
  mutation MUTATION_ADD_CUSTOMER_EVENT($input: CustomerEventInput) {
    addCustomerEvent(input: $input) {
      id
      date
      comment
      eventtype
      nrusers
    }
  }
`;

export const DELETE_CUSTOMER_EVENT = gql`
  mutation DELETE_CUSTOMER_EVENT($where: CustomerEventWhere) {
    deleteCustomerEvent(where: $where) {
      id
      date
      comment
      eventtype
      nrusers
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
      useproxy
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
      useproxy
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
      useproxy
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

export const MUTATION_UPDATE_TENANT_CUSTOMERID = gql`
  mutation MUTATION_UPDATE_TENANT_CUSTOMERID($id: ID, $customerid: String) {
    updatetenantcustomerid(id: $id, customerid: $customerid) {
      id
      farm
      name
      version
      customerid
      lastupdated
      live
    }
  }
`;
