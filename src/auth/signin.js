import React from "react";
import { signinUser } from "../actions";
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo'
import { connect } from "react-redux";
//import ErrorDialog from "../errordialog";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//import styled from "styled-components";
import { Button, Input, Form, Error } from "../styles";


const MUTATION_SIGNIN = gql`
  mutation signinUser ($input: AUTH_PROVIDER_EMAIL) {
    signinUser(input: $input) {
      token
      user {
        id
        fullname
        email
        role
        image
      }
    }
  }

`

/* 

 localStorage.setItem("id", response.data.uic);
      localStorage.setItem("token", response.data.token || "PIN01");
      localStorage.setItem("email", email);
      localStorage.setItem("name", response.data.user.fullname);
      localStorage.setItem("picture", response.data.user.pic);
      localStorage.setItem("role", response.data.user.role);

      */


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
      const input = { email, password }
      console.log('input', input)
      const gres = await this.props.data({ variables: { input } });
      const { token, user } = gres.data.signinUser;
      console.log('GRES', token, user)
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
    console.log('this.props', this.props)
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
        <Link to="/forgot">Forgot Password?</Link>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signinUser })(
  graphql(MUTATION_SIGNIN, { name: 'data' })(
    withRouter(Signin)));
