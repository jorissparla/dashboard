import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import { Button, Input, Form, Message, Row } from "../styles";

class RequestResetPassword extends Component {
  state = { email: "", errors: "", message: "" };

  onChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value, errors: "", message: "" });
  };
  render() {
    const { errors, message } = this.state;
    return (
      <Form>
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onChangeEmail}
          type="email"
          width="80%"
          readonly={message !== ""}
          placeholder="email address"
        />
        <Row>
          {!message && <Button onClick={this._doSubmit}>Send verification email </Button>}
          <Button color="black" onClick={this._doCancel}>
            Cancel
          </Button>
        </Row>
        {message && <Message color="black">{message}</Message>}
        {errors && <Message>{errors}</Message>}
      </Form>
    );
  }
  _doCancel = async () => {
    this.props.history.push("/");
  };
  _doSubmit = async () => {
    try {
      const result = await this.props.requestReset({
        variables: { email: this.state.email }
      });
      console.log(result);
      this.setState({ errors: "", message: "A password update Link was sent per email" });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, errors: "Invalid email address" });
    }
  };
}

const requestreset = gql`
  mutation requestReset($email: String!) {
    resetPassword(email: $email) {
      firstname
      email
    }
  }
`;
export default graphql(requestreset, { name: "requestReset" })(withRouter(RequestResetPassword));
