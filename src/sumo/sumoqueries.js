import { gql } from "@apollo/client";

export const ADDSUMO_MUTATION = gql`
  mutation ADDSUMO_MUTATION($input: SumologInput) {
    addSumolog(input: $input) {
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
  }
`;
export const UPDATE_SUMO_MUTATION = gql`
  mutation UPDATE_SUMO_MUTATION($where: SumologWhere, $input: SumologInput) {
    updateSumolog(where: $where, input: $input) {
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
  }
`;
export const DELETE_SUMO_MUTATION = gql`
  mutation DELETE_SUMO_MUTATION($where: SumologWhere) {
    deleteSumolog(where: $where) {
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
  }
`;

export const ALL_SUMOLOGS_QUERY = gql`
  query ALL_SUMOLOGS_QUERY {
    sumologs {
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
  }
`;
