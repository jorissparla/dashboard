import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { SelectField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import { CardSection, Card, Input, MyDatePicker } from "../common";
import withAuth from "../utils/withAuth";
const paperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "15px",
  padding: "10px",
  minWidth: "200px"
};

const doSubmit = e => {
  console.log("doSubmit", JSON.stringify(e, null, -2));
};

const SupportCardForm = props => {
  const {
    supportcard,
    initialValues,
    onSave,
    authenticated,
    handleSubmit
  } = props;
  console.log("Props## 🛑 🌮 🐶", props);
  return (
    <Paper zDepth={1} style={paperStyle}>

      <form onSubmit={handleSubmit(onSave)}>
        <Field
          placeholder="Title"
          hintText="Title"
          name="title"
          id="title"
          fullWidth={true}
          component={Input}
        />
        <Field
          placeholder="Description"
          hintText="Description"
          name="description"
          id="description"
          fullWidth={true}
          multiLine={true}
          rows={4}
          component={Input}
        />
        <Field
          placeholder="Category"
          hintText="Category"
          name="category"
          id="category"
          fullWidth={true}
          component={Input}
        />
        <Field
          placeholder="Link"
          name="link"
          id="link"
          fullWidth={true}
          component={Input}
        />
        <CardSection>
          <FlatButton type="submit" primary={true} label="Submit" />
        </CardSection>
      </form>
    </Paper>
  );
};
export default reduxForm({ form: "CardForm", enableReinitialize: true })(
  SupportCardForm
);
