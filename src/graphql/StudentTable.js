import React, { Component } from "react";

import { Link, withRouter, browserHistory } from "react-router";
import styled from "styled-components";
import Card from "./Card";
import SearchBar from "../common/SearchBar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import SortIcon from "material-ui/svg-icons/action/swap-vert";
import IconButton from "material-ui/IconButton";
import ChevronLeft from "material-ui/svg-icons/navigation/chevron-left";
import ChevronRight from "material-ui/svg-icons/navigation/chevron-right";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import ArrowDownWard from "material-ui/svg-icons/navigation/arrow-downward";
//@ts-check
import Avatar from "material-ui/Avatar";
import { pinkA200, transparent } from "material-ui/styles/colors";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
 
`;

const headerStyle = {
  fontSize: 48,
  background: "#FAFAFA",
  fontWeight: 800,
  textAlign: "left",
  color: "#000000"
};

const TableHeaderColumn1 = (val, index) => (
  <TableHeaderColumn style={{ fontSize: 16, fontFamily: "Roboto" }} key={index}>
    {val}
  </TableHeaderColumn>
);

const TableColumnHeaders = values => {
  return values.split(",").map((val, index) => TableHeaderColumn1(val, index));
};
class StudentTables extends Component {
  state = { searchText: "" };
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.dropdownMenu = this.dropdownMenu.bind(this);
  }

  handleSearchChange(e) {
    this.setState({ searchText: e });
  }

  dropdownMenu(id) {
    console.log("id", id);
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText="View"
          onClick={() => browserHistory.push(`/test/students/${id}`)}
        />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

  render() {
    const { accounts } = this.props;

    const filteredAccounts = accounts.filter(
      account =>
        account.fullname
          .toUpperCase()
          .includes(this.state.searchText.toUpperCase()) ||
        account.team.toUpperCase().includes(this.state.searchText.toUpperCase())
    );

    return (
      <Paper style={{ margin: 20 }}>
        <SearchBar
          onChange={this.handleSearchChange}
          hintText="Search on name or team.."
          style={{
            background: "#FAFAFA",
            display: "flex",
            borderBottom: "1px solid rgba(0,0,0,0.12)"
          }}
        />
        <Table headerStyle={headerStyle}>
          <TableHeader
            style={headerStyle}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={{ fontSize: 16, fontFamily: "Roboto" }}>
                ID
              </TableHeaderColumn>
              {TableHeaderColumn1("name")}}
              {TableColumnHeaders("Team, Location, Courses")}
              <TableHeaderColumn>Courses<ArrowDownWard /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {filteredAccounts.map((item, i) => (
              <TableRow key={item.id}>
                <TableRowColumn>
                  {item.picture
                    ? <Avatar src={item.picture.data} />
                    : <Avatar
                        color={pinkA200}
                        backgroundColor={transparent}
                        style={{ left: 8 }}
                      >
                        {item.fullname
                          .slice(0, 1)
                          .concat(item.lastname.slice(0, 1))}
                      </Avatar>}
                </TableRowColumn>
                <TableRowColumn>{item.fullname}</TableRowColumn>
                <TableRowColumn>{item.team}</TableRowColumn>
                <TableRowColumn>{item.location}</TableRowColumn>
                <TableRowColumn>
                  {item._courseMeta ? item._courseMeta.count : 0}
                </TableRowColumn>
                <TableRowColumn> {this.dropdownMenu(item.id)}</TableRowColumn>

                /&gt;
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default StudentTables;
