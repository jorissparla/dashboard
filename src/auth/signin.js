import React from "react";
import { signinUser } from "../actions";
import { connect } from "react-redux";
//import ErrorDialog from "../errordialog";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Button, Input, Form, Error } from "../styles";

const isRequired = value => (value ? true : false);
const isValidemail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? false : true;

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    emailError: "",
    passwordError: ""
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
      passwordError: "",
      submitError: ""
    };
    const { email, password } = this.state;

    if (!isValidemail(email)) {
      isError = true;
      errors.emailError = "Invalid email address";
      this.setState({
        ...this.state,
        ...errors
      });
    }

    if (!isRequired(password)) {
      isError = true;
      errors.passwordError = "Password cannot be empty";
      this.setState({
        ...this.state,
        ...errors
      });
    }
    return isError;
  };

  onChangeEmail = ({ target: { value } }) => this.setState({ email: value });
  onChangePassword = ({ target: { value } }) => this.setState({ password: value });

  _onSubmit = async e => {
    e.preventDefault();
    const errors = {
      emailError: "",
      passwordError: "",
      submitError: ""
    };
    const { email, password } = this.state;
    const err = this.validate();
    if (!err) {
      const result = await this.props.signinUser({ email, password });
      if (!result.error) {
        this.props.history.push("/");
      } else {
        errors.submitError = "invalid email or password";
        this.setState({
          ...this.state,
          ...errors
        });
      }
    }
  };

  renderAlert = () => {
    //const { errorMessage } = this.props;

    const error = [this.state.emailError, this.state.passwordError, this.state.submitError].join(
      " "
    );

    //|| errorMessage;
    if (this.state.emailError || this.state.passwordError || this.state.submitError) {
      return <Error>{error}</Error>;
    }
  };
  render() {
    return (
      <Form>
        <Input
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.onChangeEmail}
          errorText={this.state.emailError}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.onChangePassword}
          errorText={this.state.passwordError}
        />
        {this.renderAlert()}
        <Button label="Login" primary={true} width="300px" type="submit" onClick={this._onSubmit}>
          Login
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signinUser })(withRouter(Signin));
