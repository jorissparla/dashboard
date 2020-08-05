import React from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "./User";
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

export default Signout;
