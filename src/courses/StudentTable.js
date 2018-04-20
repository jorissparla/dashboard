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
import { Link } from "react-router-dom";
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
import styled from "styled-components";
import Excel from "../utils/Excel";

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
  <TableHeaderColumn
    style={{
      fontSize: 16,
      fontFamily: "Roboto",
      justifyContent: "center",
      textTransform: "uppercase"
    }}
    key={title}
  >
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <SortedIcon onClick={() => handleSortChange(column)} color={pinkA200} />
      {title.toUpperCase()}
    </div>
  </TableHeaderColumn>
);

const LinkColumn = ({ link, value, style }) => {
  if (link) {
    return (
      <TableRowColumn style={style}>
        <Link to={link}>{value.toUpperCase()}</Link>
      </TableRowColumn>
    );
  } else return <TableRowColumn> {value}</TableRowColumn>;
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
          account.locationdetail.location
            .toUpperCase()
            .includes(this.state.searchText.toUpperCase())
      )
      .map(account => {
        const hoursObj = account.plannedcourses
          .map(pc => {
            return pc;
          })
          .filter(
            pc =>
              Date.parse(pc.startdate) > Date.parse(startdate) &&
              Date.parse(pc.enddate) < Date.parse(enddate)
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
    console.log(startdate, filteredAccounts);
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
        <Excel data={filteredAccounts} />
        <Table headerStyle={headerStyle} onCellClick={(i, j) => console.log(i, j)}>
          <TableHeader style={headerStyle} adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={avatarstyle} />
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
              <TableHeaderColumn1
                column="hours"
                title="#Hours"
                handleSortChange={this.handleSortChange}
              />
              <TableHeaderColumn>
                Courses<ArrowDownWard />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {filteredAccounts.map((item, i) => (
              <TableRow key={item.id}>
                <TableRowColumn style={avatarstyle}>
                  {item.image ? (
                    <Avatar src={item.image} />
                  ) : (
                    <Avatar color={pinkA200} backgroundColor={transparent} style={{ left: 8 }}>
                      {item.fullname.slice(0, 1).concat(item.lastname.slice(0, 1))}
                    </Avatar>
                  )}
                </TableRowColumn>
                <LinkColumn link={`/students/${item.id}`} style={rowstyle} value={item.fullname} />
                <TableRowColumn>{item.team}</TableRowColumn>
                <TableRowColumn>
                  {item.locationdetail ? item.locationdetail.location : item.location}
                </TableRowColumn>
                <TableRowColumn>{item.count}</TableRowColumn>
                <TableRowColumn>{item.hours ? item.hours : 0}</TableRowColumn>
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
