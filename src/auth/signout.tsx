import gql from 'graphql-tag';
import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { StaticContext } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DashBoardContext } from '../globalState/Provider';
import { UserContext } from 'globalState/UserProvider';

export const MUTATION_SIGNOUT = gql`
  mutation MUTATION_SIGNOUT {
    signout {
      message
    }
  }
`;

const signoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('id');
  localStorage.removeItem('role');
  localStorage.setItem('email', '');
  localStorage.setItem('picture', '');
  localStorage.setItem('role', '');
};

interface Props {
  history: any;
}

export const Signout: React.FunctionComponent<RouteComponentProps<any, StaticContext, any>> = ({
  history
}) => {
  let userCtx: any;
  const { user, logout } = React.useContext(UserContext);
  logout();
  React.useEffect(() => {
    const h = setTimeout(() => {
      console.log('push2history');
      history.push('/');
    }, 500);
    return clearTimeout(h);
  }, [history]);
  return <div>Sorry to see you go...</div>;
};

export default withRouter(Signout);
