import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

const ALL_TENANTS = gql`
  {
    tenants {
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
  }
});

class TenantList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={ALL_TENANTS}>
        {({ data, loading }) => {
          if (loading) {
            return "...Loading";
          }
          const { tenants } = data;
          return (
            <List>
              {tenants.map(tenant => (
                <ListItem key={tenant.id} className={classes.listItem}>
                  <ListItemText
                    primary={tenant.customer.name}
                    secondary={`${tenant.name} has version ${tenant.version}`}
                  />
                </ListItem>
              ))}
            </List>
          );
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(TenantList);
