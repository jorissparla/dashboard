import { gql } from "@apollo/client";
import React from "react";
import LoginForm from "./LoginForm";

export const MUTATION_SIGNIN = gql`
  mutation signinUser($input: AUTH_PROVIDER_EMAIL) {
    signinUser(input: $input) {
      token
      user {
        id
        fullname
        email
        role
        image
        navid
        permissions {
          permission
        }
        lastlogin
      }
      error
    }
  }
`;
export const MUTATION_SIGNIN_MICROSOFT = gql`
  mutation signinUsingMicrosoft($email: String!, $username: String) {
    signinUsingMicrosoft(email: $email, username: $username) {
      token
      user {
        id
        fullname
        email
        role
        image
        navid
        permissions {
          permission
        }
        lastlogin
      }
      error
    }
  }
`;

const Signin = (props) => {
  // const [signinMutation] = useMutation(MUTATION_SIGNIN);
  return (
    <div className="font-sans text-lg  bg-gray-200 min-h-screen flex items-center mb-10 flex-col w-full">
      <LoginForm />
    </div>
  );
};

export default Signin;
