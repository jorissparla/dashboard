import { UserContext } from 'globalState/UserProvider';
import gql from 'graphql-tag';
import * as React from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export const MUTATION_SIGNOUT = gql`
  mutation MUTATION_SIGNOUT {
    signout {
      message
    }
  }
`;

interface Props {
  history: any;
}

export const Signout: React.FunctionComponent<RouteComponentProps<any, StaticContext, any>> = ({
  history
}) => {
  const { logout } = React.useContext(UserContext);
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
