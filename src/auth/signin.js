import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import { useMutation } from 'react-apollo';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../globalState/UserProvider';

export const MUTATION_SIGNIN = gql`
  mutation signinUser($input: AUTH_PROVIDER_EMAIL) {
    signinUser(input: $input) {
      token
      user {
        id
        fullname
        email
        role
        image
        permissions {
          permission
        }
      }
      error
    }
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: 150,
    marginRight: 50
  },
  input: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: '100px 300px 100px 300px',
    width: '700px',
    backgroundColor: '#eef'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  cols: {
    flexDirection: 'column',
    marginTop: 30
  }
}));

const Signin = props => {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  let history = useHistory();
  // const setLogin = (user, token) => {
  //   localStorage.setItem('id', user.id);
  //   localStorage.setItem('token', token || 'PIN01');
  //   localStorage.setItem('email', user.email);
  //   localStorage.setItem('name', user.fullname);
  //   localStorage.setItem('picture', user.image);
  //   localStorage.setItem('role', user.role);
  // };

  const classes = useStyles();
  const [signinMutation] = useMutation(MUTATION_SIGNIN);
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Password Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setFieldError /* setValues and other goodies */ }) => {
        const input = values;
        const result = await signinMutation({ variables: { input } });
        // await login(values.email, values.password);

        if (user || result.data.signinUser.token) {
          await history.push('/');
        } else {
          setFieldError('password', 'Invalid email address or password');
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
        return (
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h6" gutterBottom component="h2">
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
                    // disabled={isSubmitting}
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
};

export default Signin;
