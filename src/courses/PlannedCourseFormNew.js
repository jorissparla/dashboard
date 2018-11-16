import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as yup from 'yup';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';
import { distanceInWordsToNow } from 'date-fns';

const validationSchema = yup.object().shape({
  startdate: yup.string().required(),
  enddate: yup.string().required(),
  hours: yup.string().required()
});
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
    margin: theme.spacing.unit,
    width: 200,
    margin: 10
  },

  block: {
    display: 'flex',
    margin: 10,
    alignItems: 'center'
  },
  buttonDel: {
    margin: theme.spacing.unit,
    color: '#FFF',
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20
  },
  titleField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20,
    width: '90%'
  },
  hourField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20,
    width: 50
  },
  error: {
    color: '#f44336'
  }
});

const QUERY_ALL_FIELDS = gql`
  query QUERY_ALL_FIELDS {
    coursetypes {
      name
    }
    coursecategories {
      id
      name
    }
    statuses(type: "Course") {
      id
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

const teams = [
  { id: 1, name: 'Logistics' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Tools' },
  { id: 4, name: 'General' }
];

class PlannedCourseForm extends React.Component {
  state = {
    initialValues: this.props.initialValues || {
      courseid: this.props.course.id,
      hours: 4,
      trainer: 'LN Employee',
      status: 'Released',
      team: 'Logistics',
      type: 'Class Room Training',
      category: 'Product',
      startdate: format(addHours(Date.now(), 24), 'YYYY-MM-DD'),
      enddate: format(addHours(Date.now(), 24), 'YYYY-MM-DD'),
      updatedAt: ''
    }
  };

  render() {
    console.log(this.props);
    const { classes, history, id } = this.props;
    return (
      <Query query={QUERY_ALL_FIELDS}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'Loading...';
          }

          const { coursetypes, coursecategories, statuses, locations, supportfolks } = data;
          const { course, id } = this.props;
          const nstartdate = format(addHours(Date.now(), 24), 'YYYY-MM-DD');
          const nenddate = format(addHours(Date.now(), 24), 'YYYY-MM-DD');
          return (
            <Formik
              initialValues={this.state.initialValues}
              onSubmit={async values => {
                console.log(values);
                this.props.onSave(values);
              }}
              validationSchema={validationSchema}
            >
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
                    <Typography variant="h5" gutterBottom>
                      {id
                        ? `Edit Scheduled Training for ${course.title}`
                        : `New Scheduled Training for ${course.title}`}
                    </Typography>
                    <div className={classes.block}>
                      <TextField
                        id="startdate"
                        label="StartDate"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="startdate"
                        value={values.startdate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <TextField
                        id="enddate"
                        label="StartDate"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="enddate"
                        value={values.enddate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <TextField
                        name="hours"
                        className={classes.hourField}
                        label="hours"
                        value={values.hours}
                        type="number"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.startdate &&
                      errors.startdate && <div className={classes.error}>{errors.startdate}</div>}
                    {touched.enddate &&
                      errors.enddate && <div className={classes.error}>{errors.enddate}</div>}
                    {touched.hours &&
                      errors.hours && <div className={classes.error}>{errors.hours}</div>}

                    <div className={classes.block}>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="type">
                          Course Type
                        </InputLabel>
                        <Select
                          id="type"
                          name="type"
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.button}
                        >
                          {coursetypes.map(({ name }) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="trainer">
                          Trainer
                        </InputLabel>
                        <Select
                          id="trainer"
                          name="trainer"
                          value={values.trainer}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.button}
                        >
                          {supportfolks.map(({ fullname }) => (
                            <MenuItem key={fullname} value={fullname}>
                              {fullname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="status">
                          Status
                        </InputLabel>
                        <Select
                          id="status"
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.button}
                        >
                          {statuses.map(({ value }) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="team">
                          Team
                        </InputLabel>
                        <Select
                          id="team"
                          name="team"
                          value={values.team}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.button}
                        >
                          {teams.map(({ name }) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.block}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => history.push('/courses')}
                      >
                        Back to courses
                      </Button>
                      {id && (
                        <React.Fragment>
                          <Button
                            variant="contained"
                            className={classes.buttonDel}
                            onClick={() => console.log(id)}
                          >
                            Delete course
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => history.push('/scheduledcourses/' + id)}
                          >
                            Schedule Courses
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => history.push('/scheduledcourses/' + id + '/new')}
                          >
                            Schedule New Course
                          </Button>
                        </React.Fragment>
                      )}
                      <Chip
                        label={
                          values.updatedAt
                            ? `Last updated  ${distanceInWordsToNow(values.updatedAt)} ago`
                            : 'not Saved yet'
                        }
                      />
                    </div>
                  </Paper>
                </form>
              )}
            </Formik>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(PlannedCourseForm));
