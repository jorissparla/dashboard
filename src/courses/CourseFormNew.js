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
import { distanceInWordsToNow } from 'date-fns';

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
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

class CourseForm extends React.Component {
  state = {
    initialValues: this.props.initialValues || {
      title: '',
      hours: 4,
      trainer: 'LN Employee',
      status: 'Released',
      team: 'Logistics',
      type: 'Class Room Training',
      category: 'Product',
      description: '',
      link: ''
    }
  };

  render() {
    console.log('rendering initialValues', this.state.initialValues);
    const { classes, history, id, view } = this.props;
    return (
      <Query query={QUERY_ALL_FIELDS}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'Loading...';
          }

          const { coursetypes, coursecategories, statuses, locations, supportfolks } = data;
          const { title } = this.state.initialValues;
          const optionalProps = ['disabled'];
          return (
            <Formik
              initialValues={this.state.initialValues}
              onSubmit={async values => {
                this.setState({
                  initialValues: { title: values.title, ...this.state.initialValues }
                });
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
                      {title ? `Edit ${values.title}` : 'New Course'}
                    </Typography>
                    <div className={classes.block}>
                      <TextField
                        name="title"
                        className={classes.titleField}
                        label="title"
                        fullWidth
                        disabled={view}
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <TextField
                        name="hours"
                        className={classes.hourField}
                        label="hours"
                        value={values.hours}
                        type="number"
                        fullWidth
                        disabled={view}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.title && errors.title && <div>{errors.title}</div>}
                    {touched.hours && errors.hours && <div>{errors.hours}</div>}
                    <TextField
                      name="description"
                      fullWidth
                      disabled={view}
                      multiline
                      rows={4}
                      className={classes.textField}
                      label="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                    />
                    {touched.description && errors.description && <div>{errors.description}</div>}
                    <div className={classes.block}>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="type">
                          Course Type
                        </InputLabel>
                        <Select
                          id="type"
                          name="type"
                          disabled={view}
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
                          disabled={view}
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
                          disabled={view}
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
                          disabled={view}
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
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="category">
                          Category
                        </InputLabel>
                        <Select
                          id="category"
                          name="category"
                          disabled={view}
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.button}
                        >
                          {coursecategories.map(({ id, name }) => (
                            <MenuItem key={id} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.block}>
                      {!view && (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={handleSubmit}
                          type="submit"
                        >
                          Save
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => history.push('/courses')}
                      >
                        Back to courses
                      </Button>
                      {id &&
                        !view && (
                          <React.Fragment>
                            <Button
                              variant="contained"
                              className={classes.buttonDel}
                              onClick={() => this.props.onDelete(id)}
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
                          values.id
                            ? `Last updated  ${distanceInWordsToNow(values.lastmodified)} ago`
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

export default withRouter(withStyles(styles)(CourseForm));
