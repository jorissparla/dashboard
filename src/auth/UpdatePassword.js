import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import ErrorDialog from "../errordialog";
import { withRouter } from "react-router";

const style = {
  paper: {
    width: "30%",
    paddingLeft: "20px",

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

class UpdatePasswordForm extends React.Component {
  state = { nomatch: false, password: "", confirmpassword: "" };

  doSubmit = e => {
    e.preventDefault();
    const { password, confirmpassword } = this.state;
    this.setState({ nomatch: password !== confirmpassword });
    if (this.state.nomatch) return;

    setTimeout(() => this.props.history.push("/signin"), 500);
  };
  renderNoMatch = () => {
    return (
      <ErrorDialog
        message={`Passwords do not match or Other Error ${this.props.errorMessage}`}
      />
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
      <Paper style={style.paper} zDepth={2}>
        <form type="submit">
          <div>
            <TextField
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              type="password"
              floatingLabelText="Password"
            />
          </div>
          <div>
            <TextField
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.onChangeConfirmPassword}
              type="password"
              floatingLabelText=" Validate Password"
            />
          </div>
          {this.state.nomatch && this.renderNoMatch()}
          <div>
            <RaisedButton
              label="Update"
              primary={true}
              style={style.button}
              onClick={this.doSubmit}
            />
          </div>
        </form>
      </Paper>
    );
  }
}

export default withRouter(UpdatePasswordForm);
