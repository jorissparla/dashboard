import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import SearchBar from "./common/SearchBar";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

const ALL_TENANTS = gql`
  {
    tenants {
      id
      farm
      name
      version
      customer {
        name
      }
    }
  }
`;

const styles = theme => ({
  root: {
    width: "90vw",
    margin: "10px",
    backgroundColor: theme.palette.background.paper
  },
  itemtitle: {
    fontFamily: "Raleway",
    fontSize: 20,
    fontWeight: 800
  },

  chip: {
    margin: theme.spacing.unit
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 100,
    height: 50,
    borderRadius: "50%",
    justifyContent: "center",
    paddingTop: "15px",
    fontWeight: 800
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  blueAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#81D4FA"
  }
});

const tenantsByCustomer = (tenants, searchText) =>
  _.chain(tenants)
    .filter(
      t =>
        t.customer.name.toUpperCase().includes(searchText.toUpperCase()) ||
        t.name.toUpperCase().includes(searchText.toUpperCase())
    )
    .sortBy(o => o.customer.name)

    .value();

class TenantList extends Component {
  state = { searchText: "" };

  handleSearchChange = e => {
    this.setState({ searchText: e });
  };
  avatars = index => {
    const ar = ["classes.orangeAvatar", "classes.purpleAvatar", "classes.blueAvatar"];
    return ar[index % 2];
  };
  render() {
    const { classes } = this.props;

    return (
      <Query query={ALL_TENANTS}>
        {({ data, loading }) => {
          if (loading) {
            return "...Loading";
          }
          const { tenants } = data;
          //console.log(tenantsByCustomer(tenants));
          return (
            <React.Fragment>
              <SearchBar onChange={this.handleSearchChange} />
              <List>
                {tenantsByCustomer(tenants, this.state.searchText).map((tenant, index) => {
                  const aClass = this.avatars(index);
                  return (
                    <ListItem key={tenant.id} className={classes.listItem}>
                      {index % 3 === 0 ? (
                        <div className={`${classes.orangeAvatar} ${classes.bigAvatar}`}>
                          {tenant.version}
                        </div>
                      ) : index % 3 === 1 ? (
                        <div className={`${classes.purpleAvatar} ${classes.bigAvatar}`}>
                          {tenant.version}
                        </div>
                      ) : (
                        <div className={`${classes.blueAvatar} ${classes.bigAvatar}`}>
                          {tenant.version}
                        </div>
                      )}

                      <ListItemText
                        primary={<div className={classes.itemtitle}> {tenant.customer.name}</div>}
                        secondary={`
                      ${tenant.name} runs on farn ${tenant.farm}
                      `}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(TenantList);
