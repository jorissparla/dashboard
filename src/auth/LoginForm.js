import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Link, useHistory } from "react-router-dom";
import { UserContext, useUserContext } from "../globalState/UserProvider";
import TWButton from "../elements/TWButton";

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
    <div className="pt-10 h-screen ">
      <div className="max-w-lg mx-auto rounded shadow-lg pb-5 flex items-center flex-col justify-center bg-white">
        <img className="" src="https://nlbavwixs.infor.com/images/news/desktop.jpg" alt="" />
        <p className="text-xl text-bold font-pop uppercase">Login to your account</p>
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
          <div className="flex items-center justify-between">
            <TWButton type="submit">Log In</TWButton>
            <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/forgot">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
