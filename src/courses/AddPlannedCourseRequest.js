import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import addHours from "date-fns/add_hours";
import Component from "../common/component-component";
import { StyledMultiple, StyledSimple, StyledSelect } from "./StyledDropdowns";
import { DashBoardContext } from "../Provider";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  course: yup.string().required(),
  hours: yup.string().required(),
  type: yup.string().required(),
  participants: yup.string().required()
});

const ALL_USERS = gql`
  {
    supportfolks {
      id
      fullname
    }
    courses {
      id
      title
    }
    coursetypes {
      id
      name
    }
  }
`;
const ADD_PLANNEDCOURSEREQUEST = gql`
  mutation addPlannedCourseRequest($input: PlannedCourseRequestInput) {
    addPlannedCourseRequest(input: $input) {
      id
    }
  }
`;

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10
  },
  button: {
    margin: theme.spacing.unit,
    width: 150,
    marginRight: 50
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "relative",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  paper2: {
    padding: 10,
    margin: 10
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  textField: {
    margin: 10,
    width: 200
  },
  largetextField: {
    marginTop: 10,
    marginBottom: 10,
    width: "90%"
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class AddPlannedCourseRequest extends React.Component {
  getCourseId = (courses, title) => {
    const filteredcourse = courses.filter(c => c.title === title);
    if (filteredcourse.length > 0) {
      return filteredcourse[0].id;
    } else return null;
  };
  render() {
    const { classes } = this.props;
    return (
      <Component
        initialValue={{
          inputValue: "",
          inputDate: "09/09/2018",
          selectedItem: "",
          suggestions: []
        }}
      >
        {({ state, setState }) => {
          return (
            <Query query={ALL_USERS}>
              {({ data, loading }) => {
                if (loading) return "Loading....";
                const suggestions = data.supportfolks;
                const courses = data.courses;
                const coursetypes = data.coursetypes;

                return (
                  <Formik
                    initialValues={{
                      course: "",
                      course2: "",
                      participants: "",
                      startdate: format(addHours(Date.now(), 24), "YYYY-MM-DD"),
                      enddate: format(addHours(Date.now(), 24), "YYYY-MM-DD"),
                      hours: 4,
                      details: "",
                      type: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (
                      values,
                      { setSubmitting, setErrors /* setValues and other goodies */ }
                    ) => {
                      console.log("values", values);
                      const { startdate, enddate, participants, hours, details, type } = values;
                      const input = {
                        courseid: this.getCourseId(courses, values.course),
                        startdate: format(startdate, "YYYY-MM-DD"),
                        enddate: format(enddate, "YYYY-MM-DD"),
                        hours,
                        details,
                        participants,
                        type
                        //  submittedBy: fullname
                      };
                      console.log("input", input);
                    }}
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
                    }) => {
                      console.log("CurrentValues", values);
                      return (
                        <Paper className={classes.paper2} elevation={1}>
                          <Typography variant="display2" gutterBottom>
                            Add Planning Course Request
                          </Typography>
                          <div className={classes.column}>
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
                            {touched.startdate && errors.startdate && <div>{errors.startdate}</div>}
                            <TextField
                              id="enddate"
                              label="EndDate"
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
                            {touched.enddate && errors.enddate && <div>{errors.enddate}</div>}
                            <TextField
                              id="hours"
                              label="hours"
                              type="number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="enddate"
                              value={values.hours}
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                            {touched.hours && errors.hours && <div>{errors.hours}</div>}
                          </div>
                          <Component
                            initialValue={{
                              inputValue: "",
                              selectedItem: "",

                              suggestions: []
                            }}
                          >
                            {({ state, setState }) => {
                              return (
                                <StyledSimple
                                  id="course"
                                  name="course"
                                  state={state}
                                  onChange={item => {
                                    setFieldValue("course", item);
                                  }}
                                  onBlur={handleBlur}
                                  setState={setState}
                                  suggestions={courses}
                                  label="course"
                                  value={values.selectedItem}
                                  fieldname="title"
                                  placeholder="select course"
                                />
                              );
                            }}
                          </Component>
                          {touched.course && errors.course && <div>{errors.course}</div>} }
                          <div className={classes.column}>
                            <Component
                              initialValue={{
                                inputValue: "",
                                selectedItem: "",

                                suggestions: []
                              }}
                            >
                              {({ state, setState }) => {
                                return (
                                  <StyledSelect
                                    id="coursetype"
                                    name="coursetype"
                                    state={state}
                                    onChange={item => {
                                      console.log("OnChange", item);
                                      setFieldValue("type", item);
                                    }}
                                    onBlur={handleBlur}
                                    setState={setState}
                                    suggestions={coursetypes}
                                    label="Course"
                                    value={values.type}
                                    fieldname="name"
                                    placeholder="Enter type of training"
                                  />
                                );
                              }}
                            </Component>

                            {touched.type && errors.type && <div>{errors.type}</div>}
                            <TextField
                              id="details"
                              label="Enter details"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="details"
                              multiline
                              rowsMax="4"
                              placeholder="Enter specific details if appropriate"
                              value={values.details}
                              className={classes.largetextField}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                          </div>
                          <Component
                            initialValue={{
                              inputValue: "",
                              selectedItem: [],
                              suggestions: []
                            }}
                          >
                            {({ state, setState }) => {
                              return (
                                <StyledMultiple
                                  id="participants"
                                  name="participants"
                                  state={state}
                                  setState={setState}
                                  suggestions={suggestions}
                                  onChange={item => {
                                    setFieldValue("participants", item);
                                  }}
                                  onBlur={handleBlur}
                                  label="participants"
                                  fieldname="fullname"
                                  placeholder="select multiple participants"
                                />
                              );
                            }}
                          </Component>
                          {touched.participants &&
                            errors.participants && <div>{errors.participants}</div>}
                          <DashBoardContext.Consumer>
                            {({ email, fullname }) => {
                              return (
                                <Mutation mutation={ADD_PLANNEDCOURSEREQUEST}>
                                  {addPlannedCourseRequest => {
                                    return (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={handleSubmit}
                                        type="submit"
                                      >
                                        Save{" "}
                                      </Button>
                                    );
                                  }}
                                </Mutation>
                              );
                            }}
                          </DashBoardContext.Consumer>
                        </Paper>
                      );
                    }}
                  </Formik>
                );
              }}
            </Query>
          );
        }}
      </Component>
    );
  }
}
export default withStyles(styles)(AddPlannedCourseRequest);
