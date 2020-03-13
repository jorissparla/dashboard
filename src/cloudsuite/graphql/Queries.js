import gql from 'graphql-tag';
const SuitesFragment = gql`
  fragment SuiteDetails on CloudSuite {
    id
    name
    description
    imageURL
    products {
      product {
        id
        name
        type
        description
      }
      type
    }
  }
`;
export const QUERY_PRODUCTS_SUITES = gql`
  ${SuitesFragment}
  query QUERY_PRODUCTS_SUITES {
    products: cloudsuiteproducts {
      id
      name
      description
      type
    }
    suites: cloudsuites {
      ...SuiteDetails
    }
  }
`;
export const QUERY_PRODUCTS_SINGLE_SUITE = gql`
  ${SuitesFragment}
  query QUERY_PRODUCTS_SINGLE_SUITE($id: ID!) {
    products: cloudsuiteproducts {
      id
      name
      description
      type
    }
    suite: cloudsuite(id: $id) {
      ...SuiteDetails
    }
  }
`;
export const MUTATION_ADD_PRODUCT_TO_SUITE = gql`
  ${SuitesFragment}
  mutation MUTATION_ADD_PRODUCT_TO_SUITE($input: InputAddProductToSuite) {
    addproducttosuite(input: $input) {
      ...SuiteDetails
    }
  }
`;
export const ProductFragment = gql`
  fragment ProductDetails on CloudSuiteProduct {
    id
    name
    description
    type
    content
    contactinfo
    contacts {
      id
      contacttype
      organisation
      value
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  ${ProductFragment}
  query QUERY_SINGLE_PRODUCT($id: ID!) {
    cloudsuiteproduct(id: $id) {
      ...ProductDetails
    }
  }
`;
export const MUTATION_ADD_PRODUCT_CONTACT = gql`
  ${ProductFragment}
  mutation MUTATION_ADD_PRODUCT_CONTACT($input: InputAddContactToProduct) {
    addcontacttoproduct(input: $input) {
      ...ProductDetails
    }
  }
`;

export const MUTATION_REMOVE_PRODUCT_CONTACT = gql`
  ${ProductFragment}
  mutation MUTATION_REMOVE_PRODUCT_CONTACT($input: InputRemoveContactFromProduct) {
    removecontactfromproduct(input: $input) {
      ...ProductDetails
    }
  }
`;

export const ReadinessFragment = gql`
  fragment ReadinessFragment on CloudReadiness {
    id
    maintext
    text2
    text3
    text4
    imageURL
  }
`;

export const CLOUD_READINESS_QUERY = gql`
  ${ReadinessFragment}
  query CLOUD_READINESS_QUERY {
    cloudreadiness {
      ...ReadinessFragment
    }
  }
`;

export const MUTATION_UPDATE_CLOUD_READINESS = gql`
  ${ReadinessFragment}
  mutation MUTATION_UPDATE_CLOUD_READINESS($input: CloudReadinessInput!) {
    updatecloudreadiness(input: $input) {
      ...ReadinessFragment
    }
  }
`;
