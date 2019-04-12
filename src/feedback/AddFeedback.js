import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import { Formik } from "formik";
import { TextField, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import format from 'date-fns/format';
import { FormattedDateNow } from "../utils/FormattedDate";
import { withRouter } from "react-router";

const QUERY_SUPPORT_FOLKS = gql`
  query QUERY_SUPPORT_FOLKS {
    supportfolks {
      id
      navid
      fullname
      image
    }
  }
`;

const CREATE_FEEDBACK_MUTATION = gql`
  mutation CREATE_FEEDBACK_MUTATION($input: FeedbackInputType) {
    createFeedback(input: $input) {
      id
    }
  }
`;

const FEEDBACK_QUERY = gql`
  query FEEDBACK_QUERY {
    feedback {
      id
      createdAt
      customername
      text
      forConsultant {
        image
        fullname
      }
    }
  }
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "15px",
    minWidth: "200px"
  },
  button: {
    margin: theme.spacing.unit
  },

  buttonDel: {
    margin: theme.spacing.unit,
    backgroundColor: "#000"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20
  }
});

const AddFeedback = props => {
  const { history, classes } = props;
  return (
    <Query query={QUERY_SUPPORT_FOLKS}>
      {({ data, loading }) => {
        if (loading) {
          return "loading";
        }
        const { supportfolks } = data;
        return (
          <Mutation mutation={CREATE_FEEDBACK_MUTATION} refetchQueries={[{ query: FEEDBACK_QUERY }]}>
            {createFeedback => {
              return (
                <Formik
                  initialValues={{
                    consultant: "Joris Sparla",
                    customername: "",
                    createdAt: FormattedDateNow()
                  }}
                  onSubmit={async values => {
                    const [{ navid }] = supportfolks.filter(person => (person.fullname = values.consultant));
                    await createFeedback({
                      variables: { input: { ...values, navid } }
                    });
                    await history.push("feedback");
                  }}
                >
                  {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                      <Paper className={classes.root}>
                        <TextField
                          name="customername"
                          label="Customer Name"
                          className={classes.textField}
                          value={values.customername}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="consultant-simple">Assigned</InputLabel>
                          <Select
                            value={values.consultant}
                            onChange={handleChange}
                            inputProps={{
                              name: "consultant",
                              id: "consultant-simple"
                            }}
                          >
                            {supportfolks.map(({ id, navid, image, fullname }) => (
                              <MenuItem key={id} value={fullname}>
                                {fullname}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          name="createdAt"
                          type="date"
                          value={values.createdAt}
                          className={classes.textField}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextField
                          name="text"
                          label="Enter feedback text"
                          className={classes.textField}
                          value={values.text}
                          multiline
                          rows={4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <div>
                          <Button variant="contained" className={classes.button} color="primary" type="submit">
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => history.push("feedback")}
                            className={classes.button}
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Paper>
                    </form>
                  )}
                </Formik>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default withRouter(withStyles(styles)(AddFeedback));
