import { Button } from "@material-ui/core";
import * as React from "react";
import UserMenu from "../UserMenu";
import { UserContext } from "./../globalState/UserProvider";

interface Props {
  history: any;
}

/*export const AuthenticationSection: React.FC<Props> = (props: any) => {
  let authenticated = true;
  const history = props.history;
  return (
    <User>
      {({ loading, data }: LoadingOrData) => {
        if (loading) return <div>Loading...</div>;
        if (!data || !data.me) {
          authenticated = false;
        }
        if (authenticated && data.me) {
          const { id, image } = data.me;
          return (
            <div>
              {authenticated && (
                <Button>
                  <>
                    <UserMenu id={id} picture={image} />
                  </>
                </Button>
              )}
              <Button onClick={() => history.push('/signout')} color="inherit">
                Logout
              </Button>
            </div>
          );
        } else {
          return (
            <Button onClick={() => history.push('/signin')} color="inherit">
              Login
            </Button>
          );
        }
      }}
    </User>
  );
};
*/
export const AuthenticationSection: React.FC<Props> = (props: any) => {
  const userContext = React.useContext(UserContext);

  let { logout, user, isAuthenticated } = userContext;
  const history = props.history;
  if (isAuthenticated) {
    return (
      <div>
        {user && (
          <Button>
            <>
              <UserMenu id={user?.id} picture={user.image} />
            </>
          </Button>
        )}
        <Button
          onClick={() => {
            logout();
            history.push("/signout");
          }}
          color="inherit"
        >
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <Button onClick={() => history.push("/signin")} color="inherit">
        Login
      </Button>
    );
  }
};
