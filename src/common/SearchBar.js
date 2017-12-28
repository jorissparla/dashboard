import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import ActionSearch from "material-ui/svg-icons/action/search";

export default ({
  onChange,
  hintText = "Search..",
  defaultValue = "",
  style = { display: "flex", marginBottom: 5 },
  shade = true
}) => {
  return (
    <Paper zDepth={shade ? 2 : 0} style={style}>
      <FontIcon style={{ margin: "10px" }}>
        <ActionSearch />
      </FontIcon>
      <TextField
        hintText={hintText}
        underlineShow={false}
        defaultValue={defaultValue}
        placeholder={hintText}
        onChange={e => onChange(e.target.value)}
        fullWidth={true}
        style={{ color: "black" }}
      />
    </Paper>
  );
};
