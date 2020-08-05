import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "@apollo/client/react/components";
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
//import format from 'date-fns/format';
import { format } from "../utils/format";
import Avatar from "@material-ui/core/Avatar";
import pink from "@material-ui/core/colors/pink";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";
import styled from "styled-components";
//import Excel from "../utils/Excel";

const QUERY_COURSEDATA = gql`
  query QUERY_COURSEDATA($startdate: String, $enddate: String) {
    coursedata: coursedataaggregate(startdate: $startdate, enddate: $enddate) {
      aid
      student
      image
      studentteam
      location
      hours
      count
    }
  }
`;

const styles = {
  headerStyle: {
    fontSize: 48,
    background: "#FAFAFA",
    fontWeight: 800,
    textAlign: "left",
    color: "#000000",
  },
  rowstyle: {
    fontSize: 16,
    fontFamily: "Roboto",
  },
  avatarstyle: {
    width: 50,
  },
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
      textTransform: "uppercase",
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

  handleSortChange = (column) => {
    let sorting = { ...this.state.sorting };
    if (sorting.name === column) {
      sorting.direction = sorting.direction === "asc" ? "desc" : "asc";
    } else {
      sorting.name = column;
      sorting.direction = "asc";
    }

    this.setState({
      sorting,
    });
  };

  handleSearchChange = (e) => {
    this.setState({ searchText: e });
  };

  dropdownMenu = (id) => {
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
    let { startdate, enddate } = this.props;
    if (!startdate) {
      startdate = format(new Date(new Date().getFullYear(), 0, 1), "yyyy-MM-dd");
    }
    if (!enddate) {
      enddate = format(new Date(new Date().getFullYear() + 1, 0, 1), "yyyy-MM-dd");
    }
    const { headerStyle, rowstyle, avatarstyle } = styles;
    console.log("Startdate", startdate);
    return (
      <Paper style={{ margin: 20 }}>
        <SearchBar
          onChange={this.handleSearchChange}
          hintText="Search on name or team or location.."
          style={{
            background: "#FAFAFA",
            display: "flex",
            borderBottom: "1px solid rgba(0,0,0,0.12)",
          }}
        />
        <Query query={QUERY_COURSEDATA} variables={{ startdate, enddate }}>
          {({ data, loading, error }) => {
            if (loading) {
              return "loading";
            }
            const { coursedata } = data;
            let currentData = _.chain(coursedata)
              .filter(
                ({ student, studentteam, location }) =>
                  student.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
                  studentteam.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
                  location.toUpperCase().includes(this.state.searchText.toUpperCase())
              )
              .orderBy([this.state.sorting.name], [this.state.sorting.direction])
              .value();

            return (
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
                  {currentData.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell style={avatarstyle}>
                        {item.image ? (
                          <Avatar src={item.image} />
                        ) : (
                          <Avatar color={pink} style={{ left: 8 }}>
                            {item.student
                              .split(" ")
                              .map((n) => n.slice(0, 1))
                              .join("")}
                          </Avatar>
                        )}
                      </TableCell>
                      <LinkColumn link={`/students/${item.aid}`} style={rowstyle} value={item.student} />
                      <TableCell>{item.studentteam}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.count || 0}</TableCell>
                      <TableCell>{item.hours ? item.hours : 0}</TableCell>
                      {/* <TableCell> {this.dropdownMenu(item.id)}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            );
          }}
        </Query>
      </Paper>
    );
  }
}

export default withRouter(StudentTables);
