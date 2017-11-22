import React, { Component } from "react";

import { withRouter } from "react-router";
import SearchBar from "../common/SearchBar";
import Paper from "material-ui/Paper";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import SortIcon from "material-ui/svg-icons/action/swap-vert";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import ArrowDownWard from "material-ui/svg-icons/navigation/arrow-downward";
import ArrowUpWard from "material-ui/svg-icons/navigation/arrow-upward";
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
import _ from "lodash";

const headerStyle = {
  fontSize: 48,
  background: "#FAFAFA",
  fontWeight: 800,
  textAlign: "left",
  color: "#000000"
};

const TableHeaderColumn1 = ({ column, title, handleSortChange }) => (
  <TableHeaderColumn
    style={{ fontSize: 16, fontFamily: "Roboto", justifyContent: "center" }}
    key={title}
  >
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <SortIcon onClick={() => handleSortChange(column)} />
      {title}
    </div>
  </TableHeaderColumn>
);

const TableColumnHeaders = values => {
  return values.split(",").map((val, index) => TableHeaderColumn1(val, index));
};
class StudentTables extends Component {
  state = { searchText: "", sorting: { name: "fullname", direction: "asc" } };
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.dropdownMenu = this.dropdownMenu.bind(this);
  }

  handleSortChange = column => {
    let sorting = { ...this.state.sorting };
    if (sorting.name === column) {
      sorting.direction = sorting.direction === "asc" ? "desc" : "asc";
    } else {
      sorting.name = column;
      sorting.direction = "asc";
    }

    this.setState({
      sorting
    });
  };

  handleSearchChange(e) {
    this.setState({ searchText: e });
  }

  dropdownMenu(id) {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem primaryText="View" onClick={() => this.props.history.push(`/students/${id}`)} />
        <MenuItem disabled={true} primaryText="Send feedback" />
        <MenuItem disabled={true} primaryText="Sign out" />
      </IconMenu>
    );
  }

  render() {
    const { accounts } = this.props;
    console.log(this.state.sorting);

    const filteredAccounts1 = accounts.filter(
      account =>
        account.fullname.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
        account.team.toUpperCase().includes(this.state.searchText.toUpperCase())
    );

    const filteredAccounts = _.chain(accounts)
      .filter(
        account =>
          account.fullname.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          account.team.toUpperCase().includes(this.state.searchText.toUpperCase())
      )
      .orderBy([this.state.sorting.name], [this.state.sorting.direction])
      .value();

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
        <Table headerStyle={headerStyle} onCellClick={(i, j) => console.log(i, j)}>
          <TableHeader style={headerStyle} adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{ fontSize: 16, fontFamily: "Roboto" }}>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn1
                column="fullname"
                title="name"
                handleSortChange={this.handleSortChange}
              />
              <TableHeaderColumn1
                column="team"
                title="Team"
                handleSortChange={this.handleSortChange}
              />
              <TableHeaderColumn1
                column="location"
                title="Location"
                handleSortChange={this.handleSortChange}
              />
              <TableHeaderColumn># Courses</TableHeaderColumn>
              <TableHeaderColumn>
                Courses<ArrowDownWard />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {filteredAccounts.map((item, i) => (
              <TableRow key={item.id}>
                <TableRowColumn>
                  {item.image ? (
                    <Avatar src={item.image} />
                  ) : (
                    <Avatar color={pinkA200} backgroundColor={transparent} style={{ left: 8 }}>
                      {item.fullname.slice(0, 1).concat(item.lastname.slice(0, 1))}
                    </Avatar>
                  )}
                </TableRowColumn>
                <TableRowColumn>{item.fullname}</TableRowColumn>
                <TableRowColumn>{item.team}</TableRowColumn>
                <TableRowColumn>{item.locationdetail.location}</TableRowColumn>
                <TableRowColumn>{item._courseMeta ? item._courseMeta.count : 0}</TableRowColumn>
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

export default withRouter(StudentTables);
