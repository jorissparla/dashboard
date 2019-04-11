import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { DashBoardContext } from "../Provider";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

export const MUTATION_SIGNOUT = gql`
  mutation MUTATION_SIGNOUT {
    signout {
      message
    }
  }
`;

const signoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.setItem("email", "");
  localStorage.setItem("picture", "");
  localStorage.setItem("role", "");
};

interface Props {
  history: any;
}

export const Signout: React.FunctionComponent<RouteComponentProps<any, StaticContext, any>> = ({ history }) => {
  let userCtx: any;
  userCtx = React.useContext(DashBoardContext);
  const mutation = useMutation(MUTATION_SIGNOUT);
  signoutUser();
  mutation();
  console.log("mutation done");
  userCtx.clearUser();
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
