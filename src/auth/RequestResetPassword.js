import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

const style = {
  paper: {
    padding: "0 20px 0 20px",
    display: "flex",
    flexDirection: "column",
    marginRight: "100px",
    marginTop: "40px",
    textAlign: "left",
    flexWrap: "wrap",
    width: "50%"
  },
  button: {
    margin: "20px",
    justifyContent: "flex-start",
    alignSelf: "flex-start"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  input: {
    width: "100%",
    minWidth: "300px",
    marginBottom: "10px"
  }
};

class RequestResetPassword extends Component {
  state = { email: "", errors: "" };

  onChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value });
  };
  render() {
    return (
      <Paper style={style.paper} zDepth={2}>
        <form type="submit" style={style.form}>
          <TextField
            name="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
            type="email"
            floatingLabelText="email address"
            fullWidth={true}
            inputStyle={style.input}
          />
          <RaisedButton
            label="Update"
            primary={true}
            style={style.button}
            onClick={this._doSubmit}
          />
        </form>
        <div>{this.state.errors}</div>
      </Paper>
    );
  }

  _doSubmit = async () => {
    console.log(this.props);
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
export default graphql(requestreset, { name: "requestReset" })(
  RequestResetPassword
);
