import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { withRouter } from "react-router";
import { Button, Input, Form, Error, Row } from "../styles";

class RequestResetPassword extends Component {
  state = { email: "", errors: "" };

  onChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value });
  };
  render() {
    const { errors } = this.state;
    return (
      <Form>
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onChangeEmail}
          type="email"
          width="300px"
          placeholder="email address"
        />
        <Row>
          <Button onClick={this._doSubmit}>Send verification email </Button>
          <Button color="black" onClick={this._doCancel}>
            Cancel
          </Button>
        </Row>
        {errors & <Error>{this.state.errors}</Error>}
      </Form>
    );
  }
  _doCancel = async () => {
    this.props.history.push("/");
  };
  _doSubmit = async () => {
    try {
      await this.props.requestReset({
        variables: { email: this.state.email }
      });
      this.setState({ errors: "" });
    } catch (e) {
      this.setState({ errors: JSON.stringify(e, null, 2) });
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
