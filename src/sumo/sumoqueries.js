import { gql } from "@apollo/client";

const sumoFragment = gql`
  fragment sumoFragment on Sumo {
    id
    creator
    created
    summary
    archive
    customername
    farms
    week
    comments
    created
    query
    farms
    incident
    sessioncode
    errormessage
    module
  }
`;
const sumoAlertFragment = gql`
  fragment sumoAlertFragment on SumoAlert {
    id
    creator
    created
    alert
    comments
    environments
    archive
    customerid
    customername
  }
`;

export const ADDSUMO_MUTATION = gql`
  ${sumoFragment}
  mutation ADDSUMO_MUTATION($input: SumologInput) {
    addSumolog(input: $input) {
      ...sumoFragment
    }
  }
`;

export const UPDATE_SUMO_MUTATION = gql`
  ${sumoFragment}
  mutation UPDATE_SUMO_MUTATION($where: SumologWhere, $input: SumologInput) {
    updateSumolog(where: $where, input: $input) {
      ...sumoFragment
    }
  }
`;
export const DELETE_SUMO_MUTATION = gql`
  ${sumoFragment}
  mutation DELETE_SUMO_MUTATION($where: SumologWhere) {
    deleteSumolog(where: $where) {
      ...sumoFragment
    }
  }
`;

export const ALL_SUMOLOGS_QUERY = gql`
  ${sumoFragment}
  query ALL_SUMOLOGS_QUERY {
    sumologs {
      ...sumoFragment
    }
  }
`;

export const ADDSUMOALERT_MUTATION = gql`
  ${sumoAlertFragment}
  mutation ADDSUMOALERT_MUTATION($input: SumoAlertInput) {
    addSumoAlert(input: $input) {
      ...sumoAlertFragment
    }
  }
`;

export const UPDATE_SUMOALERT_MUTATION = gql`
  ${sumoAlertFragment}
  mutation UPDATE_SUMOALERT_MUTATION($where: SumoAlertWhere, $input: SumoAlertInput) {
    updateSumoAlert(where: $where, input: $input) {
      ...sumoAlertFragment
    }
  }
`;
export const DELETE_SUMOALERT_MUTATION = gql`
  ${sumoAlertFragment}
  mutation DELETE_SUMOALERT_MUTATION($where: SumoAlertWhere) {
    deleteSumoAlert(where: $where) {
      ...sumoAlertFragment
    }
  }
`;
export const ALL_SUMOALERTS_QUERY = gql`
  ${sumoAlertFragment}
  query ALL_SUMOALERTS_QUERY {
    sumoalerts {
      ...sumoAlertFragment
    }
  }
`;
