import React from "react";
import { Field, reduxForm } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import { signinUser } from "../actions";
import { connect } from "react-redux";
import ErrorDialog from "../errordialog";
import Dialog from "material-ui/Dialog";
import { withRouter } from "react-router-dom";

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
const required = value => (value == null ? "Required" : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

let Signin = React.createClass({
  doSubmit({ email, password }) {
    /*    window.alert(
      `You submitted Parent:\n\n${JSON.stringify({ email, password }, null, 2)}`
    );*/
    this.props.signinUser({ email, password });
    this.props.history.push("/");
  },

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <ErrorDialog message={this.props.errorMessage} />
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  },
  render() {
    const { handleSubmit } = this.props;
    return (
      <Paper style={style.paper} zDepth={2}>
        <form onSubmit={handleSubmit(this.doSubmit)}>
          <div>
            <Field
              name="email"
              component={TextField}
              floatingLabelText="Email"
              validate={[required, email]}
              ref="email"
              withRef
            />
          </div>
          <div>
            <Field
              name="password"
              component={TextField}
              type="password"
              floatingLabelText="Password"
              validate={required}
              ref="password"
              withRef
            />
          </div>
          <div>
            {this.renderAlert()}
            <RaisedButton
              label="Login"
              primary={true}
              style={style.button}
              type="submit"
            />
          </div>
        </form>
      </Paper>
    );
  }
});

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: "sigin",
  defaultValues: {}
})(Signin);

export default connect(mapStateToProps, { signinUser })(withRouter(Signin));
