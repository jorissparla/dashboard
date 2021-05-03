import gql from "graphql-tag";
export const AUDIT_QUERY = gql`
  query AUDIT_QUERY($linkid: ID!) {
    audits(linkid: $linkid) {
      id
      page
      linkid
      createdate
    }
  }
`;
const suppCardFragment = gql`
  fragment SupportCardDetailsSingle on SupportCard {
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
export const QUERY_SINGLE_SUPPORTCARD = gql`
  ${suppCardFragment}
  query QUERY_SINGLE_SUPPORTCARD($id: String) {
    supportcard(id: $id) {
      ...SupportCardDetailsSingle
    }
  }
`;
