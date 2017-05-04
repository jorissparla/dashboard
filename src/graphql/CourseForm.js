import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { SelectField } from "redux-form-material-ui";
import { CardSection, Card, Input, MyDatePicker } from "../common";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";

const buttonStyleCancel = {
  backgroundColor: "black",
  labelColor: "white"
};

const StyledField = styled(Field)`
  margin-right: 5px;
`;
const StyledButton = styled(RaisedButton)`
  margin: 5px;
`;

const SelectStyle = styled.div`
  margin: 5px;
  width: 20%;
`;

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
  }
];

class CourseForm extends Component {
  state = {};
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    alert(JSON.stringify(e, null, 2));
  }
  render() {
    const { handleSubmit, course } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>

        <Card>
          <CardSection>
            <Field
              name="title"
              hintText="Title"
              underlineShow={true}
              component={Input}
              floatingLabelText="title"
            />
            <Field
              name="hours"
              hintText="Number of Hours"
              underlineShow={true}
              component={Input}
              floatingLabelText="hours"
              style={{ flex: 2 }}
            />
            <SelectStyle>
              <Field
                name="status"
                component={SelectField}
                hintText="Status"
                floatingLabelText="Status"
                style={{ flex: 2 }}
                floatingLabelText="Status"
              >
                {status.map(({ id, name }) => (
                  <MenuItem key={id} value={name} primaryText={name} />
                ))}
              </Field>
            </SelectStyle>
          </CardSection>
          <CardSection>
            <StyledField
              name="description"
              hintText="Description"
              underlineShow={true}
              component={Input}
              rows={2}
              maxRows={4}
              fullWidth={true}
              floatingLabelText="description"
            />
          </CardSection>
          <CardSection>
            <SelectStyle>
              <Field
                name="team"
                component={SelectField}
                hintText="Select a team"
                floatingLabelText="team"
                style={{ flex: 2 }}
                floatingLabelText="team"
              >
                {teams.map(team => (
                  <MenuItem
                    key={team.id}
                    value={team.name}
                    primaryText={team.name}
                  />
                ))}
              </Field>
            </SelectStyle>
            <SelectStyle>
              <Field
                name="type"
                component={SelectField}
                hintText="Select a type"
                floatingLabelText="type"
                style={{ flex: 2 }}
                floatingLabelText="type"
              >
                {coursetypes.map(type => (
                  <MenuItem
                    key={type.id}
                    value={type.name}
                    primaryText={type.name}
                  />
                ))}
              </Field>
            </SelectStyle>
            <SelectStyle>
              <Field
                textFieldStyle={{ width: 150 }}
                name="startdate"
                hintText="startdate"
                component={MyDatePicker}
                floatingLabelText="start date"
                format={(value, name) => {
                  return value === ""
                    ? null
                    : typeof value === "string" ? new Date(value) : value;
                }}
                autoOk={true}
              />
            </SelectStyle>
            <SelectStyle>
              <Field
                textFieldStyle={{ width: 150 }}
                name="enddate"
                hintText="enddate"
                component={MyDatePicker}
                floatingLabelText="end date"
                format={(value, name) => {
                  return value === ""
                    ? null
                    : typeof value === "string" ? new Date(value) : value;
                }}
                autoOk={true}
              />
            </SelectStyle>
          </CardSection>
          <CardSection>
            <Field
              name="link"
              component={Input}
              floatingLabelText="link"
              fullWidth={true}
              floatingLabelText="Link"
            />

          </CardSection>
          <Divider />
          <CardSection>
            <StyledButton primary={true} label="Submit" type="submit" />
            <StyledButton
              secondary={true}
              label="Cancel"
              type="reset"
              onClick={() => (window.location.href = "/courses")}
            />
          </CardSection>

        </Card>

      </form>
    );
  }
}

export default reduxForm({ form: "courseform", enableReinitialize: true })(
  CourseForm
);
