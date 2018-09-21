import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Component from "../common/component-component";
import { StyledMultiple, StyledSimple } from "./StyledDropdowns";

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

                return (
                  <Formik
                    initialValues={{
                      course: "",
                      participants: "",
                      startdate: "2018-09-09",
                      enddate: "2018-10-10"
                    }}
                    onSubmit={async (
                      values,
                      { setSubmitting, setErrors /* setValues and other goodies */ }
                    ) => {
                      console.log({ values });
                      const input = values;
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
                      console.log("Values", values);
                      return (
                        <Paper className={classes.paper2} elevation={1}>
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
                          <Component
                            initialValue={{
                              inputValue: "",
                              selectedItem: "",
                              suggestions: []
                            }}
                          >
                            {({ state, setState }) => {
                              console.log("Simple", state);
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

                          <Component
                            initialValue={{
                              inputValue: "",
                              selectedItem: [],
                              suggestions: []
                            }}
                          >
                            {({ state, setState }) => {
                              console.log("Multiple", state);
                              return (
                                <StyledMultiple
                                  id="participants"
                                  name="participants"
                                  state={state}
                                  setState={setState}
                                  suggestions={suggestions}
                                  onChange={item => {
                                    console.log(item);
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
                          <Mutation mutation={ADD_PLANNEDCOURSEREQUEST}>
                            {addPlannedCourseRequest => {
                              console.log("Mutation Props", addPlannedCourseRequest);
                              return (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  className={classes.button}
                                  onClick={async () => {
                                    const { startdate, enddate, participants } = values;
                                    const input = {
                                      courseid: this.getCourseId(courses, values.course),
                                      startdate,
                                      enddate,
                                      participants
                                    };
                                    await addPlannedCourseRequest({
                                      variables: {
                                        input
                                      }
                                    });
                                  }}
                                  type="submit"
                                >
                                  Save{" "}
                                </Button>
                              );
                            }}
                          </Mutation>
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
