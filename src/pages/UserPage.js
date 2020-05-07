import React from "react";
import { useMutation } from "react-apollo";
import FileUploader from "../common/FileUploaderNew";
import { UPDATE_PROFILE_PIC_MUTATION } from "../graphql/UPDATE_PROFILE_PIC";
import { DashBoardContext } from "../globalState/Provider";
import { useUserContext } from "globalState/UserProvider";
import { useAlert } from "globalState/AlertContext";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
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
