import React, { Component } from "react";
//import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
//import { fetchChat } from "../actions/index";
import { Link } from "react-router-dom";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import _ from "lodash";
import styled from "styled-components";
import { HeaderRow, HeaderLeft, HeaderRight } from "../styles";

const Title = styled.h3`
  display: flex;
  align-content: center;
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
  background-color: lightgrey;
  height: 50px;
  align-items: center;
  width: 100%;
`;

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

const colorAr = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#FFFF00", "#E57373"];

function getColor(index, colorAr) {
  return colorAr[index % colorAr.length];
}

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
          <Title>Chat</Title>
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
        {chatsByWeek.map(item => (
          <div>
            <Title>{item[0].weeknr}</Title>
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
