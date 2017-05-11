import React from "react";
import styled from "styled-components";

import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import ActionSearch from "material-ui/svg-icons/action/search";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";

const StudentsCard = ({ students }) => (
  <div>
    <Divider />
    {students.map(student => (
      <Avatar src={`https://randomuser.me/api/portraits/men/43.jpg`} />
    ))}
  </div>
);

export default StudentsCard;
