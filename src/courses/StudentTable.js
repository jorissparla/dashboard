import React, { Component } from "react";

import { withRouter } from "react-router";
import SearchBar from "../common/SearchBar";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/SwapVert";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDownWard from "@material-ui/icons/ArrowDownward";
import { Link } from "react-router-dom";
//@ts-check
import Avatar from "@material-ui/core/Avatar";
import pink from "@material-ui/core/colors/pink";
//import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";
import styled from "styled-components";
//import Excel from "../utils/Excel";

const styles = {
  headerStyle: {
    fontSize: 48,
    background: "#FAFAFA",
    fontWeight: 800,
    textAlign: "left",
    color: "#000000"
  },
  rowstyle: {
    fontSize: 16,
    fontFamily: "Roboto"
  },
  avatarstyle: {
    width: 50
  }
};

const SortedIcon = styled(SortIcon)`
  color: red;
  :hover {
    cursor: pointer;
  }
`;

const TableHeaderColumn1 = ({ column, title, handleSortChange, sorted, link }) => (
  <TableCell
    style={{
      fontSize: 16,
      fontFamily: "Roboto",
      justifyContent: "center",
      textTransform: "uppercase"
    }}
    key={title}
  >
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <SortedIcon onClick={() => handleSortChange(column)} color="secondary" />
      {title.toUpperCase()}
    </div>
  </TableCell>
);

const LinkColumn = ({ link, value, style }) => {
  if (link) {
    return (
      <TableCell style={style}>
        <Link to={link}>{value.toUpperCase()}</Link>
      </TableCell>
    );
  } else return <TableCell> {value}</TableCell>;
};

class StudentTables extends Component {
  state = { searchText: "", sorting: { name: "fullname", direction: "asc" } };

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

  handleSearchChange = e => {
    this.setState({ searchText: e });
  };

  dropdownMenu = id => {
    return (
      <Menu>
        <IconButton aria-label="More" aria-haspopup="true">
          <MoreVertIcon />
        </IconButton>
        <MenuItem primaryText="View" onClick={() => this.props.history.push(`/students/${id}`)}>
          "View"
        </MenuItem>
        <MenuItem disabled={true} primaryText="Send feedback">
          "Send feedback"
        </MenuItem>
        <MenuItem disabled={true} primaryText="Sign out">
          "Sign out"
        </MenuItem>
      </Menu>
    );
  };

  render() {
    const { accounts, startdate, enddate } = this.props;
    const { headerStyle, rowstyle, avatarstyle } = styles;

    const filteredAccounts = _.chain(accounts)
      .filter(account => account.locationdetail && account.team)
      .filter(
        account =>
          account.fullname.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          account.team.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          account.locationdetail.location.toUpperCase().includes(this.state.searchText.toUpperCase())
      )
      .map(account => {
        const hoursObj = account.plannedcourses
          .map(pc => {
            return pc;
          })
          .filter(
            pc => Date.parse(pc.startdate) > Date.parse(startdate) && Date.parse(pc.enddate) < Date.parse(enddate)
          )
          .reduce(
            ({ hours, count }, course) => {
              return { hours: hours + course.hours, count: count + 1 };
            },
            { hours: 0, count: 0 }
          );

        return _.extend({}, account, hoursObj);
      })
      .orderBy([this.state.sorting.name], [this.state.sorting.direction])
      .value();
    return (
      <Paper style={{ margin: 20 }}>
        <SearchBar
          onChange={this.handleSearchChange}
          hintText="Search on name or team or location.."
          style={{
            background: "#FAFAFA",
            display: "flex",
            borderBottom: "1px solid rgba(0,0,0,0.12)"
          }}
        />
        <Table>
          <TableHead style={headerStyle}>
            <TableRow>
              <TableCell style={avatarstyle} />
              <TableHeaderColumn1 column="fullname" title="name" handleSortChange={this.handleSortChange} />
              <TableHeaderColumn1 column="team" title="Team" handleSortChange={this.handleSortChange} />
              <TableHeaderColumn1 column="location" title="Location" handleSortChange={this.handleSortChange} />

              <TableCell># Courses</TableCell>
              <TableHeaderColumn1 column="hours" title="#Hours" handleSortChange={this.handleSortChange} />
              <TableCell>
                Courses
                <ArrowDownWard />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell style={avatarstyle}>
                  {item.image ? (
                    <Avatar src={item.image} />
                  ) : (
                    <Avatar color={pink} style={{ left: 8 }}>
                      {item.fullname.slice(0, 1).concat(item.lastname.slice(0, 1))}
                    </Avatar>
                  )}
                </TableCell>
                <LinkColumn link={`/students/${item.id}`} style={rowstyle} value={item.fullname} />
                <TableCell>{item.team}</TableCell>
                <TableCell>{item.locationdetail ? item.locationdetail.location : item.location}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.hours ? item.hours : 0}</TableCell>
                {/* <TableCell> {this.dropdownMenu(item.id)}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withRouter(StudentTables);
