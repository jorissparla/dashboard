// import { gql } from "graphql-request";
import { gql } from "@apollo/client";

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
