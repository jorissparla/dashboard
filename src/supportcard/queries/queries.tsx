import { gql } from "graphql-request";

const suppCardFragment = gql`
  fragment SupportCardDetails on SupportCard {
    id
    title
    description
    link
    created
    createdby
    updatedAt
    updatedBy
    isfavorite
    accessed
    product
    category {
      name
      color
      backgroundcolor
    }
    keywords
  }
`;

export const QUERY_ALL_SUPPORTCARDS = gql`
  ${suppCardFragment}
  query QUERY_ALL_SUPPORTCARDS {
    supportcards {
      ...SupportCardDetails
    }
  }
`;
