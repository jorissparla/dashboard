import { Mutation, Query } from "@apollo/client/react/components";
import React, { Children, useEffect, useState } from "react";
import Signout, { SignOut2 } from "./Signout";
import { useMutation, useQuery } from "@apollo/client";

import Button from "elements/TWButton";
import { ChatOutlined } from "@material-ui/icons";
import { fql } from "utils/fql";
import gql from "graphql-tag";

const qq = fql`
  query MY_CURRENT_USER_QUERY {
    me {
      id
      firstname
      fullname
      email
      image
      role
      permissions {
        permission
      }
    }
  }
`;

const EMAILUSER = fql`{
  user: findAccountByEmail(email:"joris.sparla@infor.com") {
    email
    fullname
    image
  }
}
`;

const MY_CURRENT_USER_QUERY = gql(qq);

const SIGNIN_MUTATION = gql`
  mutation m {
    signinUser(input: { email: "joris.sparla@infor.com", password: "Infor2019" }) {
      user {
        firstname
        fullname
        image
      }
    }
  }
`;

function Me({ children }) {
  const { data, loading } = useQuery(gql(EMAILUSER));
  if (loading || !data) return null;
  console.log("data", data?.user);
  const user = data.user;
  return children(user);
}

const Index = () => {
  const [signin] = useMutation(SIGNIN_MUTATION);
  const [currentUser, setCurrentUser] = useState(null);
  const { data, loading } = useQuery(MY_CURRENT_USER_QUERY);
  useEffect(() => {
    if (data) {
      setCurrentUser(data?.me);
    }
  }, [data]);
  if (loading) return null;
  console.log("data", data);
  return (
    <div>
      <h1>
        <Me>
          {(user) => (
            <div>
              hello {user.fullname}
              <img src={user.image} alt="" className="w-48 rounded m-2 p-2 shadow-xl" />
            </div>
          )}
        </Me>
      </h1>
      <SignOut2>
        {(signout) => (
          <Button
            color="teal"
            onClick={async () => {
              console.log("signout", signout);
              const res = await signout();
              console.log("res", res);
            }}
          >
            Signout again
          </Button>
        )}
      </SignOut2>
      <React.Fragment>
        {!currentUser ? (
          <Button
            onClick={async () => {
              const result = await signin();
              console.log("result", result);
              const curr = result?.data?.signinUser?.user?.fullname;
              console.log("curr", curr);
              if (curr) {
                setCurrentUser(curr);
              }
            }}
          >
            Sign Me in{" "}
          </Button>
        ) : (
          <Signout>
            {(signout) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 10,
                    width: 200,
                  }}
                >
                  <img src={currentUser?.image} className="rounded-full w-48" style={{ borderRadius: "50%", width: 48 }} alt="me" />
                  <Button variant="contained" onClick={signout}>
                    Sign you out
                    {currentUser.fullname}
                  </Button>
                </div>
              );
            }}
          </Signout>
        )}
      </React.Fragment>
    </div>
  );
};

export default Index;
