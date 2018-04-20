import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import _ from "lodash";
import styled from "styled-components";
import { HeaderRow, HeaderLeft, HeaderRight, WideTitle, colorAr, getColor } from "../styles";

const styles = {
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
    margin: 12,
    background: "#2196f3"
  }
};

class ChatList extends Component {
  renderChat(chat) {
    return chat.map(({ id, team, nrchats, responseintime, percentage, version }, index) => {
      return (
        <div key={id} style={{ flexDirection: "row" }}>
          <ListItem
            leftAvatar={
              <Avatar backgroundColor={getColor(index, colorAr)} color="white">
                {team.slice(0, 2).toUpperCase()}
              </Avatar>
            }
            primaryText={`Number of chats in ${team}: ${nrchats}`}
            secondaryText={<p>{` Responded in time: ${responseintime} ( ${percentage} %)`}</p>}
            secondaryTextLines={2}
            rightAvatar={<div style={{ fontWeight: "bold" }}>{version}</div>}
          />
          <Divider inset={true} />
        </div>
      );
    });
  }

  render() {
    const { data: { chats, loading } } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }

    const chatsByWeek = _.chain(chats)
      .orderBy(["fromdate", "desc"])
      .groupBy(o => o.weeknr)
      .map(o => o)
      .value();

    return [
      <HeaderRow>
        <HeaderLeft>
          <WideTitle>Chat</WideTitle>
        </HeaderLeft>
        <HeaderRight>
          <Link to={"/chat/new"}>
            <RaisedButton
              label="New"
              primary={true}
              style={styles.button}
              onClick={this.toggleDialog}
            />
          </Link>
        </HeaderRight>
      </HeaderRow>,

      <List style={{ backgroundColor: "white" }}>
        {chatsByWeek.map((item, index) => (
          <div key={index}>
            <WideTitle>{item[0].weeknr}</WideTitle>
            {this.renderChat(item)}
          </div>
        ))}
      </List>
    ];
  }
}

const chatQuery = gql`
  query chats {
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

export default graphql(chatQuery)(ChatList);
