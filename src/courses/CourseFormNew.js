import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router";
import { SelectField, TextField } from "redux-form-material-ui";
import { CardSection, Card, Input, MyDatePicker } from "../common";
import MenuItem from "material-ui/MenuItem";
import Chip from "material-ui/Chip";
import moment from "moment";
import styled from "styled-components";
import {
  NormalRaisedButton,
  CancelRaisedButton,
  DeleteButton,
  RegisterButton
} from "../common/TitleBar";
import withAuth from "../utils/withAuth";

const StyledField = styled(Field)`
  margin-right: 5px;
`;

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
    width: 50
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
const status = [
  { id: 1, name: "In Development" },
  { id: 2, name: "Released" },
  { id: 3, name: "Expired" }
];

const coursetypes = [
  {
    id: 1,
    name: "Webex / Recording"
  },
  {
    id: 2,
    name: "Class Room Training"
  },
  {
    id: 3,
    name: "On Line Training"
  },
  {
    id: 4,
    name: "Self Study"
  },
  {
    id: 5,
    name: "Knowledge Transfer"
  }
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
    const { handleSubmit, course, authenticated, history } = this.props;
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
              hintText="Number of Hours"
              underlineShow={true}
              component={Input}
              floatingLabelText="hours"
              style={styles.hoursfieldstyle}
            />
          </CardSection>
          <CardSection>
            <Field
              name="trainer"
              disabled={readOnly}
              textFieldStyle={{ width: 50 }}
              hintText="Trainer"
              underlineShow={true}
              component={Input}
              floatingLabelText="Trainer"
              style={styles.textfieldstyle}
            />
            <SelectStyle>
              <Field
                name="status"
                component={SelectField}
                disabled={readOnly}
                hintText="Status"
                floatingLabelText="Status"
                style={{ flex: 2, marginTop: "-5px" }}
                underlineShow={true}
                underlineStyle={{ borderColor: "#039BE5" }}
              >
                {status.map(({ id, name }) => (
                  <MenuItem key={id} value={name} primaryText={name} />
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
              rows={3}
              rowsMax={4}
              fullWidth={true}
              floatingLabelText="description"
              style={styles.descriptionstyle}
            />
          </CardSection>
          <CardSection>
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
                floatingLabelText="type"
                style={{ flex: 2 }}
              >
                {coursetypes.map(type => (
                  <MenuItem key={type.id} value={type.name} primaryText={type.name} />
                ))}
              </Field>
            </SelectStyle>
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
          <CardSection>
            <Field
              name="applicable"
              disabled={readOnly}
              component={Input}
              floatingLabelText="Applicable for"
              underlineShow={true}
              style={styles.textfieldstyle}
            />
            <Field
              name="link"
              disabled={readOnly}
              component={Input}
              floatingLabelText="link"
              underlineShow={true}
              fullWidth={true}
              style={styles.textfieldstyle}
            />
          </CardSection>
          <CardSection>
            {!readOnly && <NormalRaisedButton label="Save" type="submit" />}
            <CancelRaisedButton
              secondary={true}
              label="Cancel"
              type="reset"
              onClick={() => setInterval(history.push("/courses"), 500)}
            />
            {!readOnly &&
              course && (
                <DeleteButton label="Delete" onClick={() => this.handleDelete(this.props.course)} />
              )}
            {!readOnly &&
              course && (
                <RegisterButton
                  label="Edit Registration"
                  onClick={() => history.push(`/courses/addstudents/${this.props.course.id}`)}
                />
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
