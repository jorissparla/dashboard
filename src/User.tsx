import { UserContext } from "globalState/UserProvider";
import React, { FunctionComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { useQuery, gql } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY_ME {
    me {
      id
      fullname
      email
      team
      location
      region
      image
      role
      permissions {
        permission
      }
    }
  }
`;

type CurrentUser = {
  id?: string;
  fullname?: string;
  email?: string;
  image?: string;
  team?: string;
  location?: string;
  region?: string;
  role?: string;
  permissions?: { permission: string; ____typename: string }[];
};

interface UserProps {
  children: Function;
}
const User: FunctionComponent<UserProps> = (props: any) => {
  const { children } = props;
  return <Query query={CURRENT_USER_QUERY}>{(payload: any) => children(payload)}</Query>;
};

export const UserProfileComponent: FunctionComponent<any> = (props: any) => {
  const { user: me } = React.useContext(UserContext);
  if (!me) {
    return <div>No user, loading...</div>;
  }
  const profileImage = me.image ? me.image.replace("http:", "https:") : "";
  return (
    <div>
      <h1>Hallo {me.fullname}</h1>
      <img src={profileImage || ""} alt="user my" />
    </div>
  );
};
// comment
export default User;

export { CURRENT_USER_QUERY };

export function useUser() {
  const result = useQuery(CURRENT_USER_QUERY);
  if (result.loading) {
    return null;
  }
  const data = result.data;

  if (data) {
    if (data.me) {
      const me: CurrentUser = data.me;
      return me;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
