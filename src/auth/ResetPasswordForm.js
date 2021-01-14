import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "@apollo/client/react/hoc";
import jwt from "jsonwebtoken";
import { emailsecret } from "./config";
import UpdatePassword from "./UpdatePassword";

class ResetPasswordForm extends Component {
  state = { id: null };

  checkisValid = (token) => {
    try {
      const res = jwt.verify(token, emailsecret);

      return [true, res];
    } catch (err) {
      return [true, { error: err }];
    }
  };

  componentDidMount() {
    const token = this.props.match.params.token;

    const result = this.checkisValid(token);
    console.log(token, result);
    if (result[0]) {
      this.setState({ id: result[1].user });
    }
  }

  render() {
    if (!this.state.id) {
      return <div>Invalid User</div>;
    }
    return (
      <div>
        <WrappedPW token={this.state.id} />
      </div>
    );
  }
}

const userquery = gql`
  query account($id: ID) {
    account(id: $id) {
      id
      fullname
      email
    }
  }
`;

const ResetPassword = (props) => {
  const { account, loading } = props.data;
  if (loading) return <div>Loading</div>;
  console.log(props);
  if (!account) return <div> Error, contact your admin </div>;
  return (
    <div>
      Password Reset for {account.fullname}
      <UpdatePassword id={account.id} email={account.email} />
    </div>
  );
};

const WrappedPW = graphql(userquery, {
  options: (ownProps) => ({ variables: { id: ownProps.token } }),
})(ResetPassword);

export default ResetPasswordForm;
