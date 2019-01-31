import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withRouter } from "react-router";
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
import * as yup from "yup";
import User from "../User";
import _ from "lodash";
import { NativeSelect, FormControl, FormHelperText } from "@material-ui/core";
import { QUERY_PLANNEDCOURSEREQUESTS } from "../pages/PlannedCourseRequestList";
import { QUERY_SCHEDULED_COURSES } from "./PlannedCoursesNew";

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
    marginBottom: 10,
    marginLeft: 200
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
  selectEmpty: {
    width: "90vw",
    marginBottom: 10
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
  state = {
    age: ""
  };

  getCourseId = (courses, title) => {
    const filteredcourse = courses.filter(c => c.title === title);
    if (filteredcourse.length > 0) {
      return filteredcourse[0].id;
    } else return null;
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    let defaultUser = "";
    return (
      <User>
        {({ data, loading }) => {
          if (loading) {
            return "loading...";
          }

          if (data && data.me) {
            const { me } = data;
            console.log("Me", me);
            defaultUser = me.fullname;
          }
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
                  <Mutation
                    mutation={ADD_PLANNEDCOURSEREQUEST}
                    refetchQueries={[{ query: QUERY_PLANNEDCOURSEREQUESTS }]}
                  >
                    {addPlannedCourseRequest => {
                      return (
                        <Query query={ALL_USERS}>
                          {({ data, loading }) => {
                            if (loading) return "Loading....";
                            const suggestions = data.supportfolks;
                            const courses = _.sortBy(data.courses, "title");

                            const coursetypes = data.coursetypes;

                            return (
                              <Formik
                                initialValues={{
                                  course: courses ? courses[0].title : "",
                                  course2: "",
                                  participants: defaultUser,
                                  startdate: format(
                                    addHours(Date.now(), 24),
                                    "YYYY-MM-DD"
                                  ),
                                  enddate: format(
                                    addHours(Date.now(), 24),
                                    "YYYY-MM-DD"
                                  ),
                                  hours: 4,
                                  details: "",
                                  type: "Self Study"
                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (
                                  values,
                                  {
                                    setSubmitting,
                                    setErrors /* setValues and other goodies */
                                  }
                                ) => {
                                  const {
                                    startdate,
                                    enddate,
                                    participants,
                                    hours,
                                    details,
                                    type
                                  } = values;
                                  const input = {
                                    courseid: this.getCourseId(
                                      courses,
                                      values.course
                                    ),
                                    startdate: format(startdate, "YYYY-MM-DD"),
                                    enddate: format(enddate, "YYYY-MM-DD"),
                                    hours,
                                    details,
                                    participants,
                                    type
                                    //  submittedBy: fullname
                                  };
                                  console.log("input", JSON.stringify(input));
                                  const result = await addPlannedCourseRequest({
                                    variables: { input }
                                  });
                                  console.log("result", result);
                                  this.props.history.push(
                                    "/plannedcourserequestlist"
                                  );
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
                                  console.log("values", values);
                                  return (
                                    <Paper
                                      className={classes.paper2}
                                      elevation={1}
                                    >
                                      <Typography variant="h5" gutterBottom>
                                        Add a request for a new scheduled or
                                        completed training
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
                                        {touched.startdate &&
                                          errors.startdate && (
                                            <div>{errors.startdate}</div>
                                          )}
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
                                        {touched.enddate && errors.enddate && (
                                          <div>{errors.enddate}</div>
                                        )}
                                        <TextField
                                          id="hours"
                                          label="hours"
                                          type="number"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          name="hours"
                                          value={values.hours}
                                          className={classes.textField}
                                          InputLabelProps={{
                                            shrink: true
                                          }}
                                        />
                                        {touched.hours && errors.hours && (
                                          <div>{errors.hours}</div>
                                        )}
                                      </div>

                                      <div>
                                        <FormControl
                                          className={classes.formControl}
                                        >
                                          <FormHelperText>
                                            Select Course
                                          </FormHelperText>
                                          <NativeSelect
                                            id="course"
                                            value={values.course}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="course"
                                            className={classes.selectEmpty}
                                          >
                                            {courses.map(({ id, title }) => (
                                              <option key={id} value={title}>
                                                {title}
                                              </option>
                                            ))}
                                          </NativeSelect>
                                        </FormControl>
                                      </div>

                                      {touched.course && errors.course && (
                                        <div>{errors.course}</div>
                                      )}
                                      <div className={classes.column}>
                                        <Component
                                          initialValue={{
                                            inputValue: "",
                                            selectedItem: "Self Study",
                                            type: "Self Study",
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
                                                label="Type of Course"
                                                value={values.type}
                                                fieldname="name"
                                                placeholder="Enter type of training"
                                              />
                                            );
                                          }}
                                        </Component>

                                        {touched.type && errors.type && (
                                          <div>{errors.type}</div>
                                        )}
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
                                          selectedItem: [defaultUser],
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
                                                setFieldValue(
                                                  "participants",
                                                  item
                                                );
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
                                        errors.participants && (
                                          <div>{errors.participants}</div>
                                        )}

                                      <React.Fragment>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          className={classes.button}
                                          onClick={handleSubmit}
                                          type="submit"
                                        >
                                          Save{" "}
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          className={classes.button}
                                          onClick={() =>
                                            this.props.history.push("/")
                                          }
                                          type="submit"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="contained"
                                          className={classes.button}
                                          onClick={() =>
                                            this.props.history.push(
                                              "/plannedcourserequestlist"
                                            )
                                          }
                                        >
                                          To List
                                        </Button>
                                      </React.Fragment>
                                    </Paper>
                                  );
                                }}
                              </Formik>
                            );
                          }}
                        </Query>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Component>
          );
        }}
      </User>
    );
  }
}
export default withStyles(styles)(withRouter(AddPlannedCourseRequest));
