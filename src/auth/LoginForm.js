import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../elements/TWButton";
import { useUserContext } from "../globalState/UserProvider";
import { signIn } from "./msAuth";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const userContext = useUserContext();
  const history = useHistory();
  const location = useLocation();
  // console.log({ location }, process.env.NODE_ENV);
  const { user, login, loginSSO } = userContext;
  const [signinMutation] = useMutation(MUTATION_SIGNIN);
  const handleLoginInfor = async () => {
    const auth = await signIn();
    console.log({ auth });
    if (auth) {
      const { userName: email, name: username } = auth;
      const result = await loginSSO(email, username);
      // console.log("sso", result, userContext.user);
      if (!result) {
        setErrors(" Unregistered email");
        return;
      }
      if (result.data.signinUsingMicrosoft.error || result.data.signinUsingMicrosoft.errors?.length) {
        setErrors(" Invalid email / password");
        return;
      }
      if (result.data.signinUsingMicrosoft.token) {
        await history.push("/");
      } else {
        alert("invalid");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors) {
      return;
    }
    const input = { email, password };
    // let result = await signinMutation({ variables: { input } });
    let result = await login(email, password);
    console.log(result, userContext.user);
    if (result.data.signinUser.error) {
      setErrors(" Invalid email / password");
      return;
    }
    if (result.data.signinUser.token) {
      await history.push("/");
    } else {
      alert("invalid");
    }
  };
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (value === "") {
      setErrors(`${name} cannot be empty`);
    } else {
      setErrors("");
    }
  }
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
                name="email"
                placeholder="email"
                value={email}
                onChange={handleChange}
              />
            </div>
          </label>
          <label className="text-sm text-gray-600 font-semibold">
            <div className="mb-4">
              Password
              <input
                className="relative block w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </label>
          <div className="flex items-center justify-between">
            <Button type="submit">Log In</Button>
            <Button type="button" color="teal" onClick={handleLoginInfor}>
              SSO<span className="text-xs mr-1">*experimental</span>
            </Button>
            <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/forgot">
              Forgot Password?
            </a>
          </div>
          {errors && <p className="mt-2 text-sm font-semibold text-red-600">{errors}</p>}
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
