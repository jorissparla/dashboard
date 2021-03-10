import { Mutation, Query } from "@apollo/client/react/components";
import { useMutation, useQuery } from "@apollo/client";

import { CURRENT_USER_QUERY } from "./User";
import React from "react";
import gql from "graphql-tag";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = (props) => (
  <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {(payload) => props.children(payload)}
  </Mutation>
);

export function SignOut2({ children }) {
  const [signout] = useMutation(SIGNOUT_MUTATION, { refetchQueries: CURRENT_USER_QUERY });
  return <div>{children(signout)}</div>;
}

export default Signout;
