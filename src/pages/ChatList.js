import { Fab } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";
import _ from "lodash";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { withRouter } from "react-router";
import DeleteChat from "../chat/DeleteChat";
import { colorAr, getColor, WideTitle } from "../styles";

const DELETE_CHAT_MUTATION = gql`
  mutation DELETE_CHAT_MUTATION($input: ChatInputType) {
    deleteChat(input: $input) {
      result
    }
  }
`;
const ALL_CHATS_QUERY = gql`
  query ALL_CHATS_QUERY {
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

const styles = (theme) => ({
  root: {
    marginTop: 60,
  },
  typo: {
    backgroundColor: "lightgrey",
  },
  listStyle: {
    backgroundColor: "white",
    marginRight: 20,
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
    display: "flex",
  },
  button: {
    margin: 12,
  },
});

const RenderChat = ({ chat, onRemove }) => {
  return chat.map(({ id, team, nrchats, responseintime, percentage, version }, index) => {
    return (
      <React.Fragment key={id}>
        <ListItem>
          <Avatar style={{ backgroundColor: getColor(index, colorAr), color: "white" }}>{team.slice(0, 2).toUpperCase()}</Avatar>

          <ListItemText
            primary={`Number of chats in ${team}: ${nrchats}`}
            secondary={` Responded in time: ${responseintime} ( ${!percentage ? (100 * responseintime) / nrchats : percentage} %)`}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Comments">
              <DeleteChat id={id} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider variant="inset" />
      </React.Fragment>
    );
  });
};

const ChatList = (props) => {
  const { classes } = props;
  const { data, loading } = useQuery(ALL_CHATS_QUERY);
  const [deleteChat] = useMutation(DELETE_CHAT_MUTATION);

  if (loading) {
    return <div>Loading</div>;
  }
  const { chats } = data;
  // const chats = data.chats;
  const handleDelete = async (id) => {
    const input = { id };
    await deleteChat({ variables: { input } });
  };
  const chatsByWeek = _.chain(chats)
    .orderBy(["fromdate", "desc"])
    .groupBy((o) => o.weeknr)
    .map((o) => o)
    .value();

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <WideTitle variant="h4  " gutterBottom className={classes.typo}>
          Chat
          <Fab variant="round" color="secondary" aria-label="add" className={classes.button} onClick={() => props.history.push(`/chat/new`)}>
            <AddIcon />
          </Fab>
        </WideTitle>
        <List style={{ backgroundColor: "white" }}>
          {chatsByWeek.map((item, index) => (
            <div key={index}>
              <WideTitle>{item[0].weeknr}</WideTitle>
              <RenderChat chat={item} onRemove={(id) => handleDelete(id)} />
            </div>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(ChatList));
export { ALL_CHATS_QUERY };
