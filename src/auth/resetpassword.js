import React from "react";
import { Field, reduxForm } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import { UpdatePassword } from "../actions";
import { connect } from "react-redux";
import ErrorDialog from "../errordialog";
import { browserHistory } from "react-router";

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

class UpdatePasswordForm extends React.Component {
  state = { nomatch: false };

  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.renderNoMatch = this.renderNoMatch.bind(this);
  }

  doSubmit({ password, confirmpassword }) {
    //window.alert(`You submitted Parent:\n\n${JSON.stringify(v, null, 2)}`);
    console.log(this.props);
    this.setState({ nomatch: password !== confirmpassword });
    if (this.state.nomatch) return;
    const { token } = this.props.params;
    this.props.UpdatePassword({ token, password }).catch(e => {
      console.log(e);
      return;
    });
    setTimeout(() => browserHistory.push("/"), 1000);
  }
  renderNoMatch() {
    return (
      <ErrorDialog
        message={`Passwords do not match or Other Error ${this.props.errorMessage}`}
      />
    );
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <Paper style={style.paper} zDepth={2}>
        <form onSubmit={handleSubmit(this.doSubmit)}>
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
            <Field
              name="passwordconfirm"
              component={TextField}
              type="password"
              floatingLabelText="ConfirmPassword"
              validate={required}
              ref="passwordconfirm"
              withRef
            />
          </div>
          {this.state.nomatch && this.renderNoMatch()}
          <div>
            <RaisedButton
              label="Update"
              primary={true}
              style={style.button}
              type="submit"
            />
          </div>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

UpdatePasswordForm = reduxForm({
  form: "updatepassword",
  defaultValues: {}
})(UpdatePasswordForm);

export default connect(mapStateToProps, { UpdatePassword })(UpdatePasswordForm);
