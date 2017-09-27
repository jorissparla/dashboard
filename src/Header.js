import { withRouter } from "react-router";
import React from "react";
import styled from "styled-components";

export const niceblue = "#40a5ed";
export const babyblue = "#ecf6fd";
export const twitterblue = "#1da1f2";
export const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 4px;
  width: 200px;
  height: 28px;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
`;
export const Button = styled.a`
  display: inline-block;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid ${niceblue};
  text-decoration: none;
  color: #0ae;
  font-family: Roboto;
  font-size: 15px;
  background: transparent;
  -webkit-transition: all 0.45s;
  transition: all 0.45s;
  text-align: center;
  line-height: 36px;
  margin-left: 8px;
  :hover {
    background: #40a5ed;
    color: white;
  }
`;

const Header = props => {
  return (
    <div>
      <Button onClick={() => props.history.push("/SupportCard")}>SupportCard</Button>
      {props.children}
    </div>
  );
};
export default withRouter(Header);
