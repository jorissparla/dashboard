import React from "react";
import { withRouter } from "react-router";
import { Button, Input, Form, Error } from "../styles";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const isRequired = value => (value ? true : false);
const isValidemail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? false : true;

class Signin extends React.Component {
  state = {
    email: "",
    PIN: "",
    error: "",
    emailError: "",
    PINError: ""
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      PINError: "",
      submitError: ""
    };
    const { email, PIN } = this.state;

    if (!isValidemail(email)) {
      isError = true;
      errors.emailError = "Invalid email address";
      this.setState({
        ...this.state,
        ...errors
      });
    }

    if (!isRequired(PIN)) {
      isError = true;
      errors.PINError = "Password cannot be empty";
      this.setState({
        ...this.state,
        ...errors
      });
    }
    return isError;
  };

  onChangeEmail = ({ target: { value } }) => this.setState({ email: value });
  onChangePassword = ({ target: { value } }) => this.setState({ PIN: value });

  _onSubmit = async e => {
    e.preventDefault();
    const errors = {
      emailError: "",
      PINError: "",
      submitError: ""
    };
    const { email, PIN } = this.state;
    const err = this.validate();
    if (!err) {
      const result = await this.props.signinUser({ email, PIN });
      if (!result.error) {
        this.props.history.push("/");
      } else {
        errors.submitError = "invalid email or PIN";
        this.setState({
          ...this.state,
          ...errors
        });
      }
    }
  };

  _onGeneratePIN = async () => {
    const result = await this.props.generateTempPIN({ variables: { email: this.state.email } });
    console.log(result);
  };

  renderAlert = () => {
    //const { errorMessage } = this.props;

    const error = [this.state.emailError, this.state.PINError, this.state.submitError].join(" ");

    //|| errorMessage;
    if (this.state.emailError || this.state.PINError || this.state.submitError) {
      return <Error>{error}</Error>;
    }
  };
  render() {
    console.log("Props", this.props);
    return (
      <Form style={{ width: "400px" }}>
        <Input
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.onChangeEmail}
          errorText={this.state.emailError}
        />
        <Input
          name="PIN"
          type="PIN"
          placeholder="PIN"
          value={this.state.PIN}
          onChange={this.onChangePassword}
          errorText={this.state.PINError}
        />
        {this.renderAlert()}
        <Button label="Login" primary={true} width="200px" type="submit" onClick={this._onSubmit}>
          Login
        </Button>
        <Button
          label="New PIN"
          primary={true}
          width="200px"
          color="green"
          type="submit"
          onClick={this._onGeneratePIN}
        >
          New PIN
        </Button>
      </Form>
    );
  }
}

const generateTempPIN = gql`
  mutation generateTempPIN($email: String!) {
    generateTempPIN(email: $email) {
      error
      user {
        id
      }
    }
  }
`;

export default compose(graphql(generateTempPIN, { name: "generateTempPIN" }))(withRouter(Signin));
