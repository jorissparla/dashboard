import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const MUTATION_SIGNIN = gql`
  mutation signinUser($input: AUTH_PROVIDER_EMAIL) {
    signinUser(input: $input) {
      token
      user {
        id
        fullname
        email
        role
        image
      }
      error
    }
  }
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 150,
    marginRight: 50
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "100px 300px 100px 300px",
    width: "700px",
    backgroundColor: "#eef"
  },
  form: {
    display: "flex"
  },
  cols: {
    flexDirection: "column",
    marginTop: 30
  }
});

class Signin extends React.Component {
  setLogin = (user, token) => {
    localStorage.setItem("id", user.id);
    localStorage.setItem("token", token || "PIN01");
    localStorage.setItem("email", user.email);
    localStorage.setItem("name", user.fullname);
    localStorage.setItem("picture", user.image);
    localStorage.setItem("role", user.role);
  };

  render() {
    console.log("signin this.props", this.props);
    const { classes } = this.props;
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          // same as above, but feel free to move this into a class method now.
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors /* setValues and other goodies */ }) => {
          console.log({ values });
          const input = values;
          const result = await this.props.data({ variables: { input } });
          if (!result.data.signinUser.error) {
            const { token, user } = result.data.signinUser;
            this.setLogin(user, token);
            window.location.reload();
            await this.props.history.push("/");
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
          return (
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h4  " gutterBottom>
                Log in
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.cols}>
                  <div className={classes.form}>
                    <TextField
                      id="email"
                      name="email"
                      label="email"
                      type="email"
                      placeholder="Email"
                      className={classes.textField}
                      value={values.email}
                      onChange={handleChange}
                      margin="normal"
                    />
                    {touched.email && errors.email && <div>{errors.email}</div>}
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      label="password"
                      placeholder="Password"
                      className={classes.textField}
                      value={values.password}
                      onChange={handleChange}
                      margin="normal"
                    />
                    {touched.password && errors.password && <div>{errors.password}</div>}
                  </div>
                  <div className={classes.form} />
                  <div className={classes.cols}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>

                    <Link to="/forgot">Forgot Password?</Link>
                  </div>
                </div>
              </form>
            </Paper>
          );
        }}
      </Formik>
    );
  }
}

export default graphql(MUTATION_SIGNIN, { name: "data" })(withStyles(styles)(withRouter(Signin)));
