import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import ActionSearch from "material-ui/svg-icons/action/search";

import styled from "styled-components";

const StyledTextField = styled.input`
  color: black;
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 8px;
  width: 600px;
  height: 28px;
  font-size: 1em;
  line-height: 1.5;
  font-family: "Segoe UI", Roboto;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
`;

export default ({
  onChange,
  hintText = "Search..",
  defaultValue = "",
  style = { display: "flex" }
}) => {
  return (
    <Paper zDepth={3} style={style}>
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
