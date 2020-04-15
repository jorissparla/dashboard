import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router";
import Button from "../elements/TWButton";
import { Message } from "../styles";

const RequestResetPassword = () => {
  // state = { email: "", errors: "", message: "" };
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [resetRequestMutation] = useMutation(REQUEST_RESET_MUTATION);

  const history = useHistory();

  useEffect(() => {
    if (email) {
      setErrors("");
    } else {
      setErrors("email address is a mandatory field");
    }
  }, [email]);

  const onChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const _doCancel = async () => {
    history.push("/");
  };

  const handleReset = () => {
    setErrors("");
    setMessage("");
    setEmail("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await resetRequestMutation({
        variables: { email },
      });
      console.log(result);
      setMessage("A password update Link was sent per email");
    } catch (e) {
      console.log(e);
      setErrors("Invalid email address");
    }
  };

  return (
    <div className="pt-10 h-screen bg-gray-100">
      <form className="rounded border shadow-lg max-w-xl mx-auto bg-white" onSubmit={handleSubmit}>
        <img className="h-32 mb-2 object-cover w-full" src="https://nlbavwixs.infor.com/images/news/resend.jpg" alt="" />
        <div className="w-full  px-2">
          {errors ? (
            <div>
              <label className="text-gray-700 pl-2 font-semibold mt-2 mb-2" htmlFor="email">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  className="form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                  placeholder="email address"
                  onChange={onChangeEmail}
                  value={email}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-gray-700 pl-2 font-semibold mt-2 mb-2" htmlFor="email">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  className="form-input block w-full pr-10  sm:text-sm sm:leading-5"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  type="email"
                  width="80%"
                  required
                  readOnly={message !== ""}
                  placeholder="email address"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between w-full p-2">
          {!message && (
            <Button color="teal" type="submit">
              Send verification email{" "}
            </Button>
          )}
          <Button color="black" onClick={_doCancel}>
            Cancel
          </Button>
          <Button color="indigo" onClick={handleReset}>
            Reset Value
          </Button>
        </div>
        {message && <Message color="black">{message}</Message>}
        {errors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
      </form>
    </div>
  );
};

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    resetPassword(email: $email) {
      firstname
      email
    }
  }
`;
export default RequestResetPassword;
// export default graphql(requestreset, { name: "requestReset" })(
//   withRouter(RequestResetPassword)
// );
