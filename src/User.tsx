import React, { useEffect, Children } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useQuery } from "react-apollo-hooks";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      fullname
      email
      image
      role
      permissions {
        permission
      }
    }
  }
`;
const User = (props: any) => {
  const { children } = props;
  return (
    <Query query={CURRENT_USER_QUERY}>{payload => children(payload)}</Query>
  );
};

// User.propTypes = {
//   children: PropTypes.func.isRequired
// };
export default User;

export { CURRENT_USER_QUERY };

export function withUser() {
  const result = useQuery(CURRENT_USER_QUERY, { suspend: false });
  if (result.loading) {
    return <h1>loading";</h1>;
  }
  const data = result.data;

  if (data) {
    if (data.me) {
      return data.me;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
