import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import { signinUser } from "../actions";
import { connect } from "react-redux";
import ErrorDialog from "../errordialog";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? false
    : true;

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
  onChangePassword = ({ target: { value } }) =>
    this.setState({ password: value });

  doSubmit = async e => {
    e.preventDefault();
    this.setState({ error: "" });
    const { email, password } = this.state;

    if (!this.validate()) {
      this.setState({ emailError: "", passwordError: "" });
      await this.props.signinUser({ email, password });
      this.props.history.push("/");
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
      <Paper style={style.paper} zDepth={2}>
        <Form>
          <TextField
            name="email"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.onChange}
            errorText={this.state.emailError}
          />
          <TextField
            name="password"
            type="password"
            floatingLabelText="Password"
            value={this.state.password}
            onChange={this.onChangePassword}
            errorText={this.state.passwordError}
          />
          {this.renderAlert()}
          <RaisedButton
            label="Login"
            primary={true}
            style={style.button}
            type="submit"
            onClick={this.doSubmit}
          />
        </Form>
      </Paper>
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
