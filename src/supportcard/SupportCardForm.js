import React from "react";
import { withRouter } from "react-router";
import { Field, reduxForm } from "redux-form";
import Chip from "material-ui/Chip";
import { SelectField } from "redux-form-material-ui";
import Paper from "material-ui/Paper";
import MenuItem from "material-ui/MenuItem";
import moment from "moment";
import { CardSection, Input } from "../common";
import { NormalRaisedButton, CancelRaisedButton, DeleteButton } from "../common/TitleBar";

const owners = [
  { id: "Ricardo Exposito", name: "Ricardo Exposito" },
  { id: "Massimo Favaro", name: "Massimo Favaro" },
  { id: "Maribel Aguilella", name: "Maribel Aguilella" },
  { id: "Joris Sparla", name: "Joris Sparla" }
];

const paperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "15px",
  padding: "10px",
  minWidth: "200px"
};

const upLoadFile = e => {
  console.log(e);
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
  const updatedAt = supportcard ? supportcard.updatedAt : moment().format("YYYY-MM-DD");
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
            fontFamily: "Didact Gothic",
            fontSize: "40px",
            color: "#039BE5",
            fontWeight: 800
          }}
        />
        <Field
          hintText="Enter a description"
          name="description"
          floatingLabelText="Description"
          textareaStyle={{
            background: "lightyellow",
            border: "1px solid lightgray",
            color: "#0099e7"
          }}
          id="description"
          disabled={readOnly}
          fullWidth={true}
          multiLine={true}
          rows={10}
          component={Input}
        />
        <Field
          name="categoryname"
          component={SelectField}
          disabled={readOnly}
          hintText="Status"
          floatingLabelText="Category"
          style={{ flex: 2, marginTop: "-5px" }}
          underlineShow={true}
          underlineStyle={{ borderColor: "#039BE5" }}
        >
          {categories.map(({ id, name }) => <MenuItem key={id} value={name} primaryText={name} />)}
        </Field>
        <Field
          name="owner"
          component={SelectField}
          disabled={readOnly}
          hintText="Owner"
          floatingLabelText="Owner"
          style={{ flex: 2, marginTop: "-5px", marginLeft: "10px" }}
          underlineShow={true}
          underlineStyle={{ borderColor: "#039BE5" }}
        >
          {owners.map(({ id, name }) => <MenuItem key={id} value={name} primaryText={name} />)}
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
          onClick={() => (readOnly ? window.open(initialValues.link) : console.log("link"))}
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
            supportcard && <DeleteButton label="Delete" onClick={() => onDelete(supportcard)} />}
          {readOnly &&
            supportcard && (
              <DeleteButton label="View Link" onClick={() => window.open(initialValues.link)} />
            )}
          <Chip style={{ margin: 4 }}>{`Last updated at ${updatedAt}`}</Chip>
        </CardSection>
      </form>
    </Paper>
  );
};
export default reduxForm({ form: "CardForm", enableReinitialize: true })(
  withRouter(SupportCardForm)
);
