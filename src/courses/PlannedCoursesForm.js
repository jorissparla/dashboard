import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

const QUERY_SINGLE_COURSE_WITHDATA = gql`
  query QUERY_SINGLE_COURSE_WITHDATA($id: ID) {
    course(id: $id) {
      id
      title
      description
      team
      link
      status
      type
      category
      startdate
      enddate
      hours
      plannedcourses {
        id
        startdate
        enddate
        status
        trainer
        hours
        team
        type

        location
        students {
          id
          fullname
          image
        }
        studentcount
      }
      applicable
      trainer
      lastmodified
      enrollments {
        id
        status
        student {
          id
          fullname
          image
        }
      }
    }
    coursetypes {
      name
    }
    coursecategories {
      id
      name
    }
    courses {
      id
      title
      hours
    }
    statuses {
      id
      type
      value
    }
    locations(filter: ["ESBA", "NLBA", "CZPA4"]) {
      type
      description
    }
    supportfolks {
      id
      fullname
    }
  }
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    padding: '10px',
    minWidth: '200px'
  },
  button: {
    margin: theme.spacing.unit
  },

  buttonDel: {
    margin: theme.spacing.unit,
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20
  }
});

class PlannedCoursesForm extends React.Component {
  static propTypes = {
    courseid: PropTypes.string.isRequired
  };
  render() {
    return (
      <div>
        <Formik initialValues={{ courseid: this.props.courseid }}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            errors,
            isSubmitting
          }) => (
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
                      name: 'consultant',
                      id: 'consultant-simple'
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
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => history.push('feedback')}
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
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(PlannedCoursesForm));
