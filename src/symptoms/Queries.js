import gql from "graphql-tag";

export const ALL_SYMPTOMS = gql`
  query ALL_SYMPTOMS {
    symptoms {
      symptom
      symptom_category
    }
    symptom_categories {
      id
      symptom_category
    }
    symptomrequests {
      id
      symptom
      incident
      symptom_category
      status
      note
      email
      statusname
      updatedAt
    }
    statuses: symptomrequest_statuses {
      id
      statusname
    }
  }
`;
export const ALL_SYMPTOM_CATEGORIES = gql`
  query ALL_SYMPTOM_CATEGORIES {
    symptom_categories {
      id
      symptom_category
    }
  }
`;

export const ADD_SYMPTOM_REQUEST_MUTATION = gql`
  mutation ADD_SYMPTOM_REQUEST_MUTATION($input: SymptomRequestInput) {
    createSymptomRequest(input: $input) {
      id
      symptom
      symptom_category
      incident
      status
      note
      updatedAt
    }
  }
`;

export const TOGGLE_STATUS_COMPLETE_MUTATION = gql`
  mutation TOGGLE_STATUS_COMPLETE_MUTATION($where: SymptomRequestWhereInput!) {
    toggleCompleteStatusSymptomRequest(where: $where) {
      id
      symptom
      symptom_category
      incident
      status
      note
      updatedAt
    }
  }
`;
export const UPDATE_SYMPTOM_REQUEST_MUTATION = gql`
  mutation UPDATE_SYMPTOM_REQUEST_MUTATION($where: SymptomRequestWhereInput!, $input: SymptomRequestUpdate) {
    updateSymptomRequest(where: $where, input: $input) {
      id
      symptom
      symptom_category
      incident
      status
      note
      updatedAt
    }
  }
`;
export const UPDATE_SYMPTOM_REQUEST_NOTIFY_MUTATION = gql`
  mutation UPDATE_SYMPTOM_REQUEST_NOTIFY_MUTATION($where: SymptomRequestWhereInput!, $comment: String) {
    notifySymptomRequest(where: $where, comment: $comment)
  }
`;

export const DELETE_SYMPTOM_REQUEST_MUTATION = gql`
  mutation DELETE_SYMPTOM_REQUEST_MUTATION($where: SymptomRequestWhereInput!) {
    deleteSymptomRequest(where: $where) {
      id
      symptom
      symptom_category
      incident
      status
      note
      updatedAt
    }
  }
`;
