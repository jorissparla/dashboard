import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import ErrorDialog from "../errordialog";
import { withRouter } from "react-router";
import { Button, Input, Form, Error } from "../styles";

class UpdatePasswordForm extends React.Component {
  state = { nomatch: false, password: "", confirmpassword: "" };

  doSubmit = e => {
    e.preventDefault();
    const { password, confirmpassword } = this.state;
    this.setState({ nomatch: password !== confirmpassword });
    if (password === confirmpassword) {
      setTimeout(() => this.props.history.push("/signin"), 500);
    }
  };
  renderNoMatch = () => {
    return (
      <ErrorDialog message={`Passwords do not match or Other Error ${this.props.errorMessage}`} />
    );
  };

  onChangePassword = ({ target: { value } }) => {
    this.setState({ password: value });
  };
  onChangeConfirmPassword = ({ target: { value } }) => {
    this.setState({ confirmpassword: value });
  };

  render() {
    return (
      <Form width="400px">
        <Input
          name="password"
          value={this.state.password}
          onChange={this.onChangePassword}
          type="password"
          placeholder="Password"
        />
        <Input
          name="confirmpassword"
          value={this.state.confirmpassword}
          onChange={this.onChangeConfirmPassword}
          type="password"
          placeholder=" Validate Password"
        />
        {this.state.nomatch && this.renderNoMatch()}
        <Button width="300px" onClick={this.doSubmit}>
          Update
        </Button>
      </Form>
    );
  }
}

export default withRouter(UpdatePasswordForm);
