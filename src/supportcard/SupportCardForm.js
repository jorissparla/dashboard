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
import { NormalButton } from "../common/TitleBar";

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
          hintText="Enter Card Title"
          floatingLabelText="Title"
          name="title"
          id="title"
          fullWidth={true}
          component={Input}
          underlineShow={true}
          style={{
            fontFamily: "Kristen ITC Regular",
            fontSize: "24px",
            color: "#039BE5",
            fontWeight: 800
          }}
        />
        <Field
          hintText="Enter a description"
          name="description"
          floatingLabelText="Description"
          style={{
            background: "lightyellow",
            border: "1px solid lightgray"
          }}
          id="description"
          fullWidth={true}
          multiLine={true}
          rows={4}
          component={Input}
        />
        <Field
          hintText="Category (Cloud, Procedure, etc)"
          floatingLabelText="Category"
          name="category"
          id="category"
          fullWidth={true}
          component={Input}
          underlineShow={true}
        />
        <Field
          name="link"
          hintText="Enter link to document"
          floatingLabelText="link"
          id="link"
          fullWidth={true}
          component={Input}
          underlineShow={true}
          style={{ fontSize: 14 }}
        />
        <CardSection>
          <NormalButton type="submit" primary={true} label="Save " />
        </CardSection>
      </form>

    </Paper>
  );
};
export default reduxForm({ form: "CardForm", enableReinitialize: true })(
  SupportCardForm
);
