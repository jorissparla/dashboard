import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { signoutUser } from '../actions';
import { StaticContext } from 'react-router';
import { DashBoardContext } from '../Provider';

interface Props {
  history: any;
}

export const Signout: React.FunctionComponent<RouteComponentProps<any, StaticContext, any>> = ({
  history
}) => {
  let userCtx: any;
  userCtx = React.useContext(DashBoardContext);
  React.useEffect(() => {
    signoutUser();
    userCtx.clearUser();
    const h = setTimeout(() => {
      window.location.reload();
      history.replace('/');
    }, 2000);
    return clearTimeout(h);
  }, []);
  return <div>Sorry to see you go...</div>;
};

export default withRouter(Signout);
