import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import { signinUser } from "../actions";
import { connect } from "react-redux";
import ErrorDialog from "../errordialog";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Button, Input } from "../styles";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: "Segoe UI", Roboto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  border-radius: 2px;
  width: 30%;
  padding: 20px;
  min-width: 300px;
  margin-top: 40px;
  margin-left: 20px;
  text-align: left;
`;

const style = {
  paper: {
    width: "30%",
    paddingLeft: "20px",
    minWidth: "300px",

    marginTop: "40px",
    textAlign: "left",
    display: "flex"
  },
  button: {
    margin: "20px",
    justifyContent: "flex-start",
    alignSelf: "flex-start"
  }
};
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
    const errors = { emailError: "", passwordError: "" };
    const { email, password } = this.state;
    let isError = false;

    if (!isValidemail(email)) {
      isError = true;
      errors.emailError = "Invalid email address";
    }

    if (!isRequired(password)) {
      isError = true;
      errors.passwordError = "Password cannot be empty";
    }
    this.setState({
      ...this.state,
      ...errors
    });
    console.log(this.state);
    return isError;
  };

  onChangeEmail = ({ target: { value } }) => this.setState({ email: value });
  onChangePassword = ({ target: { value } }) => this.setState({ password: value });

  _onSubmit = async e => {
    e.preventDefault();
    this.setState({ error: "" });
    const { email, password } = this.state;

    if (!this.validate()) {
      this.setState({ emailError: "", passwordError: "" });
      const result = await this.props.signinUser({ email, password });
      console.log(result);
      if (!result.error) {
        this.props.history.push("/");
      } else {
        this.setState({ error: "invalid email or password" });
      }
    } else {
      this.setState({ error: "invalid email or password" });
    }
    //location.href = location.href;
  };

  renderAlert = () => {
    const { errorMessage } = this.props;

    const error = this.state.error || errorMessage;
    if (error) {
      return (
        <div className="alert alert-danger">
          <ErrorDialog message={error} />
        </div>
      );
    }
  };
  render() {
    return (
      <Form>
        <Input
          name="email"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.onChangeEmail}
          errorText={this.state.emailError}
        />
        <Input
          name="password"
          type="password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.onChangePassword}
          errorText={this.state.passwordError}
        />
        {this.renderAlert()}
        <Button
          label="Login"
          primary={true}
          width="300px"
          style={style.button}
          type="submit"
          onClick={this._onSubmit}
        >
          Login
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

/* Signin = reduxForm({
  form: "sigin",
  defaultValues: {}
})(Signin);
 */
export default connect(mapStateToProps, { signinUser })(withRouter(Signin));
