import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import ProfilePage from "./ProfilePage";

const USER_QUERY = gql`
  query USER_QUERY($id: ID) {
    account(id: $id) {
      id
      fullname
      email
      image
      role
      team
      region
      navid
      permissions {
        permission
      }
      lastlogin
    }
  }
`;

const UserPage = (props) => {
  const { id } = props.match.params;
  const { data, loading } = useQuery(USER_QUERY, { variables: { id } });
  if (loading) return <div>Loading</div>;

  return <ProfilePage active={data.account} />;
};

export default UserPage;
