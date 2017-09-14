import React from "react";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import {
  blue500,
  orange800,
  deepPurple500,
  grey900
} from "material-ui/styles/colors";

const TitleBar = styled.div`
  background-Color: #039BE5;
  color: white;
  font-size: 20px;
  font-weight: 400;
  line-height: 36px;
  padding: 5px;
  padding-left:10px;
`;

//const TitleBar = val => <TitleBarStyle>{val}</TitleBarStyle>;

const NormalButton = props => (
  <FlatButton
    backgroundColor={blue500}
    label="View"
    style={{ color: "white" }}
    {...props}
  />
);
const NormalRaisedButton = props => (
  <FlatButton
    backgroundColor={blue500}
    label="View"
    style={{ color: "white", margin: "5px" }}
    {...props}
  />
);
const CancelRaisedButton = props => (
  <FlatButton
    backgroundColor={orange800}
    label="View"
    style={{ color: "white", margin: "5px" }}
    {...props}
  />
);
const DeleteButton = props => (
  <FlatButton
    backgroundColor={grey900}
    label="Delete"
    style={{ color: "white", margin: "5px" }}
    {...props}
  />
);
const RegisterButton = props => (
  <FlatButton
    backgroundColor={deepPurple500}
    label="Register"
    style={{ color: "white", margin: "5px" }}
    {...props}
  />
);

export {
  TitleBar,
  NormalButton,
  NormalRaisedButton,
  CancelRaisedButton,
  DeleteButton,
  RegisterButton
};
