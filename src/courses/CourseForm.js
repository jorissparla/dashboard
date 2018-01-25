import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router";
import { SelectField } from "redux-form-material-ui";
import { CardSection, Card, Input, MyDatePicker } from "../common";
import MenuItem from "material-ui/MenuItem";
import Chip from "material-ui/Chip";
import moment from "moment";
import styled from "styled-components";
import { NormalRaisedButton, CancelRaisedButton, DeleteButton } from "../common/TitleBar";
import withAuth from "../utils/withAuth";

const SelectStyle = styled.div`
  margin: 5px;
  width: 20%;
`;

const styles = {
  textfieldstyle: {
    marginRight: 20,
    flexGrow: 3
  },
  hoursfieldstyle: {
    marginRight: 20,
    width: 100
  },
  descriptionstyle: {
    whitespace: "pre-line"
  }
};

const teams = [
  { id: 1, name: "Logistics" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Tools" },
  { id: 4, name: "General" }
];

class CourseForm extends Component {
  state = {};
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
    //e.preventDefault();
    this.props.onSave(e);
  }

  handleDelete(e) {
    this.props.onDelete(e);
  }
  render() {
    const {
      handleSubmit,
      course,
      authenticated,
      history,
      coursetypes,
      trainers,
      statuses
    } = this.props;
    const readOnly = !authenticated;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardSection style={{ display: "flex", justifyContent: "space-between" }}>
            <Field
              name="title"
              disabled={readOnly}
              hintText="Title"
              underlineShow={true}
              component={Input}
              floatingLabelText="title"
              style={styles.textfieldstyle}
            />
            <Field
              name="hours"
              disabled={readOnly}
              hintText="Default Number of Hours"
              underlineShow={true}
              component={Input}
              floatingLabelText="Est. hours"
              style={styles.hoursfieldstyle}
            />
          </CardSection>
          <CardSection>
            <SelectStyle>
              <Field
                name="trainer"
                component={SelectField}
                disabled={readOnly}
                hintText="Trainer"
                floatingLabelText="Default Trainer"
                style={{ flex: 2 }}
                underlineShow={true}
                underlineStyle={{ borderColor: "#039BE5" }}
              >
                {trainers.map(({ id, fullname }) => (
                  <MenuItem key={id} value={fullname} primaryText={fullname} />
                ))}
              </Field>
            </SelectStyle>
            <SelectStyle>
              <Field
                name="status"
                component={SelectField}
                disabled={readOnly}
                hintText="Status"
                floatingLabelText="Status"
                style={{ flex: 2 }}
                underlineShow={true}
                underlineStyle={{ borderColor: "#039BE5" }}
              >
                {statuses.map(({ id, value }) => (
                  <MenuItem key={id} value={value} primaryText={value} />
                ))}
              </Field>
            </SelectStyle>
            <SelectStyle>
              <Field
                name="team"
                disabled={readOnly}
                component={SelectField}
                hintText="Select a team"
                floatingLabelText="team"
                style={{ flex: 2 }}
              >
                {teams.map(team => (
                  <MenuItem key={team.id} value={team.name} primaryText={team.name} />
                ))}
              </Field>
            </SelectStyle>
            <SelectStyle>
              <Field
                name="type"
                disabled={readOnly}
                component={SelectField}
                hintText="Select a type"
                floatingLabelText="Default type"
                style={{ flex: 2 }}
              >
                {coursetypes.map(({ id, name }, index) => (
                  <MenuItem key={`${index}_${id}`} value={name} primaryText={name} />
                ))}
              </Field>
            </SelectStyle>
          </CardSection>
          <CardSection>
            <Field
              name="description"
              disabled={readOnly}
              hintText="Description"
              underlineShow={true}
              component={Input}
              multiLine={true}
              rows={2}
              rowsMax={5}
              fullWidth={true}
              floatingLabelText="description"
              style={styles.descriptionstyle}
            />
          </CardSection>
          {0 === 1 && (
            <CardSection>
              <SelectStyle>
                <Field
                  textFieldStyle={{ width: 150 }}
                  name="startdate"
                  disabled={readOnly}
                  hintText="startdate"
                  component={MyDatePicker}
                  floatingLabelText="start date"
                />
              </SelectStyle>
              <SelectStyle>
                <Field
                  textFieldStyle={{ width: 150 }}
                  name="enddate"
                  disabled={readOnly}
                  hintText="enddate"
                  component={MyDatePicker}
                  floatingLabelText="end date"
                  autoOk={true}
                />
              </SelectStyle>
            </CardSection>
          )}
          <CardSection>
            <Field
              name="applicable"
              disabled={readOnly}
              component={Input}
              floatingLabelText="Applicable for version"
              underlineShow={true}
              style={styles.textfieldstyle}
            />
            <Field
              name="link"
              disabled={readOnly}
              component={Input}
              floatingLabelText="link to recording, folder, etc"
              underlineShow={true}
              fullWidth={true}
              style={styles.textfieldstyle}
            />
          </CardSection>
          <CardSection>
            {!readOnly && <NormalRaisedButton label="Save" type="submit" />}
            <CancelRaisedButton
              secondary={true}
              label="Back to Courses"
              type="reset"
              onClick={() => setInterval(history.push("/courses"), 500)}
            />
            {!readOnly &&
              course && (
                <DeleteButton label="Delete" onClick={() => this.handleDelete(this.props.course)} />
              )}
            <Chip style={{ margin: 4 }}>
              {course ? `Last updated  ${moment(course.lastmodified).calendar()}` : "not Saved yet"}
            </Chip>
          </CardSection>
        </Card>
      </form>
    );
  }
}

export default reduxForm({ form: "courseform", enableReinitialize: true })(
  withAuth(withRouter(CourseForm))
);
