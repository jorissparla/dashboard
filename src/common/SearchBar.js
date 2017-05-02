import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import ActionSearch from "material-ui/svg-icons/action/search";

export default ({ onChange }) => {
  return (
    <Paper zDepth={3}>
      <FontIcon className="material-icons" style={{ margin: "10px" }}>
        <ActionSearch />
      </FontIcon>
      <TextField
        hintText="Search"
        underlineShow={false}
        onChange={e => onChange(e.target.value)}
      />

    </Paper>
  );
};
