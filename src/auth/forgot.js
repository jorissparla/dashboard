import React from "react";
import { Field, reduxForm } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import { forgotPassword } from "../actions";
import { connect } from "react-redux";
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

let Forgot = React.createClass({
  doSubmit({ email }) {
    this.props.forgotPassword(email);
    setTimeout(() => this.props.history.push("/"), 500);
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

Forgot = reduxForm({
  form: "forgot",
  defaultValues: {}
})(Forgot);

export default connect(mapStateToProps, { forgotPassword })(withRouter(Forgot));
