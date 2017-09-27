import React from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router";
import { CardSection, Input } from "../common";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import { fullWhite } from "material-ui/styles/colors";
import styled from "styled-components";

const Left = styled.div`
  width: 10%;
  margin: 10px;
`;
const Right = styled.div`width: 80%;`;

const inputImageField = field => {
  return (
    <div style={{ display: "flex", alignContent: "center" }}>
      <Left>
        <Avatar src={field.input.value} />
      </Left>
    </div>
  );
};

const NewsItem = ({
  initialValues: newsitem,
  onSave,
  onDelete,
  onCancel,
  handleSubmit,
  title,
  history
}) => {
  const handleDelete = e => {
    e.preventDefault();
    onDelete(newsitem.id);
  };
  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Paper>
        <CardSection style={{ fontSize: "36px", fontFamily: "Oswald" }}>{title}</CardSection>
      </Paper>
      <Paper>
        <CardSection>
          <RaisedButton primary={true} label="Save" type="submit" />
          {onDelete && (
            <RaisedButton
              backgroundColor={"#212121"}
              labelColor={fullWhite}
              label="Delete"
              onClick={handleDelete}
            />
          )}
          <RaisedButton label="Cancel" onClick={() => history.push("/news")} />
        </CardSection>
        <Divider />
        <Field
          name="title"
          hintText="Enter the title of the newsitem"
          underlineShow={true}
          component={Input}
          floatingLabelText="title"
          fullWidth={true}
          style={{
            fontFamily: "Kristen ITC Regular",
            fontSize: "24px",
            color: "#039BE5",
            fontWeight: 800
          }}
        />

        <Field
          name="body"
          hintText="Provide a detailed description"
          underlineShow={true}
          component={Input}
          floatingLabelText="text"
          multiLine={true}
          rows={4}
          rowsMax={4}
          fullWidth={true}
          style={{
            background: "lightyellow",
            border: "1px solid lightgray"
          }}
        />
        <div style={{ display: "flex", alignContent: "center" }}>
          <Left>
            <Field component={inputImageField} name="img" />
          </Left>
          <Right>
            <Field
              name="img"
              hintText="Copy the Image URL into the field"
              underlineShow={true}
              component={Input}
              floatingLabelText="Image URL"
              fullWidth={true}
              onChange={e => console.log(e, newsitem)}
            />
          </Right>
        </div>
      </Paper>
    </form>
  );
};

export default reduxForm({ form: "_newsitem", enableReinitialize: true })(withRouter(NewsItem));
