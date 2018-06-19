import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import _ from "lodash";
import { WideTitle, colorAr, getColor } from "../styles";

const styles = {
  typo: {
    backgroundColor: "lightgrey"
  },
  listStyle: {
    backgroundColor: "white",
    marginRight: 20
  },

  subheaderStyle: {
    fontSize: 56,
    fontFamily: "Oswald",
    color: "dodgerblue",
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex"
  },
  button: {
    margin: 12
  }
};

const RenderChat = ({ chat }) => {
  return chat.map(({ id, team, nrchats, responseintime, percentage, version }, index) => {
    return (
      <React.Fragment key={id} style={{ flexDirection: "row" }}>
        <ListItem>
          <Avatar style={{ backgroundColor: getColor(index, colorAr), color: "white" }}>
            {team.slice(0, 2).toUpperCase()}
          </Avatar>

          <ListItemText
            primary={`Number of chats in ${team}: ${nrchats}`}
            secondary={<p>{` Responded in time: ${responseintime} ( ${percentage} %)`}</p>}
          />
        </ListItem>
        <Divider inset={true} />
      </React.Fragment>
    );
  });
};

class ChatList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={ALL_CHATS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>;
          }
          const chats = data.chats;
          const chatsByWeek = _.chain(chats)
            .orderBy(["fromdate", "desc"])
            .groupBy(o => o.weeknr)
            .map(o => o)
            .value();

          return (
            <React.Fragment>
              <Paper className={classes.root}>
                <WideTitle variant="display1" gutterBottom className={classes.typo}>
                  Chat
                  <Button
                    variant="fab"
                    mini
                    color="secondary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => this.props.history.push(`/chat/new`)}
                  >
                    <AddIcon />
                  </Button>
                </WideTitle>
                <List style={{ backgroundColor: "white" }}>
                  {chatsByWeek.map((item, index) => (
                    <div key={index}>
                      <WideTitle>{item[0].weeknr}</WideTitle>
                      <RenderChat chat={item} />
                    </div>
                  ))}
                </List>
              </Paper>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

const ALL_CHATS = gql`
  {
    chats {
      id
      weeknr
      team
      percentage
      responseintime
      nrchats
    }
  }
`;

export default withStyles(styles)(withRouter(ChatList));
