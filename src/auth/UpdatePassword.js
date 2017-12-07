import React from "react";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Button, Input, Form, Row, Message, Error } from "../styles";

class UpdatePasswordForm extends React.Component {
  state = { success: false, nomatch: false, password: "", confirmpassword: "" };

  doSubmit = async e => {
    e.preventDefault();
    const { password, confirmpassword } = this.state;
    this.setState({ nomatch: password !== confirmpassword });
    if (password === confirmpassword) {
      const result = await this.props.changePassword({
        variables: { email: this.props.email, password }
      });
      this.setState({ success: result.data.changePassword.error === "" });
      // setTimeout(() => this.props.history.push("/signin"), 1500);
    }
  };

  onContinue = () => setTimeout(() => this.props.history.push("/signin"), 1500);
  onChangePassword = ({ target: { value } }) => {
    this.setState({ password: value, nomatch: false });
  };
  onChangeConfirmPassword = ({ target: { value } }) => {
    this.setState({ confirmpassword: value, nomatch: false });
  };

  render() {
    let success = this.state.success;
    let nomatch = this.state.nomatch;
    console.log("Success", success);
    return (
      <Form>
        <Input
          name="password"
          value={this.state.password}
          onChange={this.onChangePassword}
          type="password"
          readonly={!success}
          placeholder="Password"
        />
        <Input
          name="confirmpassword"
          value={this.state.confirmpassword}
          onChange={this.onChangeConfirmPassword}
          type="password"
          readonly={!success}
          placeholder=" Validate Password"
        />
        {nomatch && <Error>Passwords do not match</Error>}
        {success && <Message color="black">Successfully changed password</Message>}
        <Row>
          {!success && (
            <Button width="300px" onClick={this.doSubmit}>
              Update
            </Button>
          )}
          {success && (
            <Button color="green" onClick={this.onContinue}>
              Continue
            </Button>
          )}
        </Row>
      </Form>
    );
  }
}

const changePassword = gql`
  mutation changePassword($email: String!, $password: String) {
    changePassword(input: { email: $email, password: $password }) {
      error
      user {
        id
      }
    }
  }
`;

export default graphql(changePassword, { name: "changePassword" })(withRouter(UpdatePasswordForm));
