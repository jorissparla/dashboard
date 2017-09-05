import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { SelectField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import { CardSection, Card, Input, MyDatePicker } from "../common";
import withAuth from "../utils/withAuth";
import {
  NormalButton,
  NormalRaisedButton,
  CancelRaisedButton,
  DeleteButton
} from "../common/TitleBar";

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
    categories,
    initialValues,
    onSave,
    authenticated,
    handleSubmit,
    onDelete,
    history
  } = props;
  const readOnly = !authenticated;
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
          disabled={readOnly}
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
          disabled={readOnly}
          fullWidth={true}
          multiLine={true}
          rows={16}
          component={Input}
        />
        <Field
          name="category"
          component={SelectField}
          disabled={readOnly}
          hintText="Status"
          floatingLabelText="Category"
          style={{ flex: 2, marginTop: "-5px" }}
          underlineShow={true}
          underlineStyle={{ borderColor: "#039BE5" }}
        >
          {categories.map(({ id, name }) => (
            <MenuItem key={id} value={name} primaryText={name} />
          ))}
        </Field>

        <Field
          name="link"
          hintText="Enter link to document"
          floatingLabelText="link"
          disabled={readOnly}
          id="link"
          fullWidth={true}
          component={Input}
          underlineShow={true}
          style={{ fontSize: 14 }}
          onClick={() =>
            readOnly ? window.open(initialValues.link) : console.log("link")}
        />
        <CardSection>
          {!readOnly && <NormalRaisedButton label="Save" type="submit" />}
          <CancelRaisedButton
            secondary={true}
            label="Cancel"
            type="reset"
            onClick={() => setTimeout(history.push("/supportcard"), 500)}
          />
          {!readOnly &&
            supportcard &&
            <DeleteButton
              label="Delete"
              onClick={() => onDelete(supportcard)}
            />}
          {readOnly &&
            supportcard &&
            <DeleteButton
              label="View Link"
              onClick={() => window.open(initialValues.link)}
            />}

        </CardSection>
      </form>

    </Paper>
  );
};
export default reduxForm({ form: "CardForm", enableReinitialize: true })(
  withRouter(SupportCardForm)
);
