import React, { Component } from "react";

import { withRouter } from "react-router";
import SearchBar from "../common/SearchBar";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
//@ts-check
import Avatar from "material-ui/Avatar";
import { pinkA200, transparent } from "material-ui/styles/colors";

class StudentList extends Component {
  state = { searchText: "" };

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
        <MenuItem
          key={id}
          primaryText="View"
          onClick={() => this.props.history.push(`/test/students/${id}`)}
        />
      </IconMenu>
    );
  };

  render() {
    const { accounts } = this.props;

    const filteredAccounts = accounts.filter(
      account =>
        account.fullname.toUpperCase().includes(this.state.searchText.toUpperCase()) ||
        account.team.toUpperCase().includes(this.state.searchText.toUpperCase())
    );
    return (
      <Paper>
        <SearchBar onChange={this.handleSearchChange} />
        <List>
          {filteredAccounts.map((item, i) => {
            console.log(`${item.id}-${i}`);
            return (
              <ListItem
                key={`${item.id}-${i}`}
                primaryText={item.fullname}
                secondaryText={`in Team ${item.team}, Location ${
                  item.locationdetail ? item.locationdetail.location : item.location
                } has been registered for ${item._courseMeta ? item._courseMeta.count : 0} courses`}
                rightIcon={this.dropdownMenu(item.id)}
                leftAvatar={
                  item.image ? (
                    <Avatar src={item.image} />
                  ) : (
                    <Avatar color={pinkA200} backgroundColor={transparent} style={{ left: 8 }}>
                      {item.fullname.slice(0, 1).concat(item.lastname.slice(0, 1))}
                    </Avatar>
                  )
                }
              />
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default withRouter(StudentList);
