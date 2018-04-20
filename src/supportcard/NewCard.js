import React from "react";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import ViewIcon from "material-ui/svg-icons/action/pageview";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import FolderIcon from "material-ui/svg-icons/file/folder-open";
import ActionAndroid from "material-ui/svg-icons/action/android";

const styles = {
  button: {
    margin: 5,
    backgroundColor: "black",
    color: "black"
  }
};

const CardExampleWithAvatar = ({
  title = "Procedure",
  text = "Papier Und KartonFabrik Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  buttonText = "Modify",
  category = "Cloud",
  link = "http://www.google.com",
  action = null,
  color = "#FFFFF",
  textcolor = "#000",
  canEdit = false,
  editLink = "",
  viewLink = "",
  isNew = false,
  onAudit = () => console.log("onaudit"),
  onFollowLink = link => {
    console.log("onFollowLink");
    return link;
  }
}) => (
  <Card
    style={{
      width: 380,
      height: 250,
      maxHeight: 300,
      margin: 5,
      display: "flex",
      flexDirection: "column"
    }}
  >
    <CardTitle title={title.slice(0, 50)} subtitle={category} titleStyle={{ display:'flex', height: 50, overflow: 'none',fontSize: 18 }} />
    <CardText>{text.slice(0, 100).concat("...")}</CardText>
    <CardActions style={{ marginBottom: 5, alignItems: "flex-end" }}>
      <RaisedButton
        primary={true}
        label={canEdit === true ? "Edit" : "View"}
        labelPosition="before"
        href={canEdit ? editLink : viewLink}
        style={styles.button}
      />
      <RaisedButton
        secondary={true}
        label={"Open Files"}
        labelPosition="before"
        style={styles.button}
        href={link}
        onClick={() => onFollowLink(viewLink, link)}
      />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
