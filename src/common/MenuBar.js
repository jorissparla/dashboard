import React from "react";
import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { blue500, orange800 } from "material-ui/styles/colors";

const MenuBar = styled.div`
  background-Color: #039BE5;
  color: white;
  font-size: 20px;
  font-weight: 400;
  line-height: 36px;
  padding: 5px;
  padding-left:10px;
  display: flex;
  padding-bottom: 20px;
`;

const MenuBarItem = styled.div`
  width: 30%;
  padding: 5px;
      text-transform: uppercase;
`;

//const TitleBar = val => <TitleBarStyle>{val}</TitleBarStyle>;

export { MenuBar, MenuBarItem };
