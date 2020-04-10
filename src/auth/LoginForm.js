import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Link, useHistory } from "react-router-dom";
import { UserContext, useUserContext } from "../globalState/UserProvider";

const MUTATION_SIGNIN = gql`
  mutation loginUser($input: AUTH_PROVIDER_EMAIL) {
    signinUser(input: $input) {
      token
      user {
        id
        fullname
        email
        role
        image
        permissions {
          permission
        }
      }
      error
    }
  }
`;

const LoginForm = ({}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userContext = useUserContext();
  const history = useHistory();

  const { user, login } = userContext;
  const [signinMutation] = useMutation(MUTATION_SIGNIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = { email, password };
    // let result = await signinMutation({ variables: { input } });
    let result = await login(email, password);
    console.log(result, userContext.user);
    if (result.data.signinUser.token) {
      await history.push("/");
    }
  };
  return (
    <div className="w-full max-w-lg  rounded shadow-lg pb-5 flex items-center flex-col justify-center bg-white">
      <img
        className=""
        src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80"
        alt=""
      />
      <p className="text-xl text-bold font-pop uppercase">
        Login to your account
      </p>
      <form onSubmit={handleSubmit} className="px-10 w-full">
        <label className="text-sm text-gray-600 font-semibold">
          Email
          <div className="rounded-md shadow-sm">
            <input
              className="relative block w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>
        <label className="text-sm text-gray-600 font-semibold">
          <div className="mb-4">
            Password
            <input
              className="relative block w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-blue-700  text-center py-2 px-4 m-2 rounded text-white inline-flex w-48 items-center"
          >
            Login
          </button>
          <div className="text-sm leading-5">
            <a
              href="/forgot"
              className="font-medium text-purp hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end"></div>
      </form>
    </div>
  );
};
export default LoginForm;
