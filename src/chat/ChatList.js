import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import _ from "lodash";
import { WideTitle, colorAr, getColor } from "../styles";

const DELETE_CHAT = gql`
  mutation deleteChat($input: ChatInputType) {
    deleteChat(input: $input) {
      result
    }
  }
`;
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

const deleteChat = ({ render }) => (
  <Mutation mutation={DELETE_CHAT}>{(mutation, result) => render({ mutation, result })}</Mutation>
);

const myChats = ({ render }) => <Query query={ALL_CHATS}>{data => render(data)}</Query>;

const mapper = {
  myChats,
  deleteChat
};

const mapProps = ({ myRanges, myChats, deleteChat }) => ({
  chats: myChats.data.chats,
  loading: myChats.loading,
  deleteChat: deleteChat.mutation,
  deleteChatResult: deleteChat.result
});

const MyContainer = adopt(mapper, mapProps);

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

const RenderChat = ({ chat, onRemove }) => {
  return chat.map(({ id, team, nrchats, responseintime, percentage, version }, index) => {
    return (
      <React.Fragment key={id}>
        <ListItem>
          <Avatar style={{ backgroundColor: getColor(index, colorAr), color: "white" }}>
            {team.slice(0, 2).toUpperCase()}
          </Avatar>

          <ListItemText
            primary={`Number of chats in ${team}: ${nrchats}`}
            secondary={` Responded in time: ${responseintime} ( ${
              !percentage ? (100 * responseintime) / nrchats : percentage
            } %)`}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Comments">
              <ClearIcon onClick={() => onRemove(id)} />
            </IconButton>
          </ListItemSecondaryAction>
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
      <MyContainer>
        {({ loading, error, data, chats, deleteChat, ...props }) => {
          if (loading) {
            return <div>Loading</div>;
          }
          // const chats = data.chats;
          const handleDelete = async id => {
            const input = { id };
            const result = await deleteChat({ variables: { input } });
          };
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
                      <RenderChat chat={item} onRemove={id => handleDelete(id)} />
                    </div>
                  ))}
                </List>
              </Paper>
            </React.Fragment>
          );
        }}
      </MyContainer>
    );
  }
}

export default withStyles(styles)(withRouter(ChatList));
