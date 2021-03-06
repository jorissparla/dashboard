import { useUserContext } from "globalState/UserProvider";
import gql from "graphql-tag";
import * as React from "react";
import { withRouter } from "react-router-dom";

export const MUTATION_SIGNOUT = gql`
  mutation MUTATION_SIGNOUT {
    signout {
      message
    }
  }
`;

export const Signout = ({ history }) => {
  const { logout } = useUserContext();

  logout();
  React.useEffect(() => {
    const h = setTimeout(() => {
      console.log("push2history");
      history.push("/");
    }, 500);
    return clearTimeout(h);
  }, []);
  return <div>Sorry to see you go...</div>;
};

export default withRouter(Signout);
