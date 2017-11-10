import React from "react";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import moment from "moment";
import { Loading } from "../styles";
import styled from "styled-components";
import _ from "lodash";
import { format } from "date-fns";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

const Title = styled.h3`
  display: flex;
  align-content: center;
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
  background-color: lightgrey;
  height: 50px;
  align-items: center;
`;

export default () => <div>Hallo</div>;
