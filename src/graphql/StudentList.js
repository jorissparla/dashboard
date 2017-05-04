import React, { Component } from "react";

import { Link, withRouter } from "react-router";
import styled from "styled-components";
import Card from "./Card";
import SearchBar from "../common/SearchBar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
//@ts-check
import Avatar from "material-ui/Avatar";

const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
 
`;

class StudentList extends Component {
  state = { searchText: "" };
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.setState({ searchText: e });
  }

  render() {
    const { accounts } = this.props;

    const filteredAccounts = accounts.filter(account =>
      account.fullname
        .toUpperCase()
        .includes(this.state.searchText.toUpperCase())
    );
    return (
      <Paper>
        <SearchBar onChange={this.handleSearchChange} />
        <List>
          {filteredAccounts.map((item, i) => (
            <ListItem
              key={item.id}
              primaryText={item.fullname}
              leftAvatar={
                item.picture
                  ? <Avatar src={item.picture.data} />
                  : <Avatar src="https://randomuser.me/api/portraits/men/48.jpg" />
              }
            />
          ))}
        </List>
      </Paper>
    );
  }
}

export default StudentList;
