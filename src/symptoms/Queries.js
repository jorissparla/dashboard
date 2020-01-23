import gql from 'graphql-tag';

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
      updatedAt
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
      updatedAt
    }
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
      updatedAt
    }
  }
`;
