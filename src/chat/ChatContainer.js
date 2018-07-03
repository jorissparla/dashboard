import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { Card, OkCancelDialog } from "../common";
import ChatAdd from "./ChatAdd";
import Snackbar from "material-ui/Snackbar";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { adopt } from "react-adopt";
import * as R from "ramda";

import { SharedSnackbarConsumer } from "../SharedSnackbar.context";

const ADD_CHAT = gql`
  mutation createChat($input: ChatInputType) {
    createChat(input: $input) {
      id
      weeknr
      team
      percentage
      responseintime
      nrchats
    }
  }
`;

const DELETE_CHAT = gql`
  mutation deleteChat($input: ChatInputType) {
    deleteChat(input: $input) {
      result
    }
  }
`;
const ALL_RANGES = gql`
  {
    allRanges: ranges {
      ID
      FromDate
      ToDate
      Name
      RangeType
      FullRange
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

const addChat = ({ render }) => (
  <Mutation
    mutation={ADD_CHAT}
    update={(cache, { data: { createChat } }) => {
      const query = ALL_CHATS;
      const props = cache.readQuery({ query });
      const { chats } = props;
      console.log("Chats", chats);
      cache.writeQuery({
        query,
        data: { chats: R.concat(chats, [createChat]) }
      });
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const deleteChat = ({ render }) => (
  <Mutation
    mutation={DELETE_CHAT}
    update={(cache, { data: { deleteChat } }) => {
      const query = ALL_CHATS;
      const { chats } = cache.readQuery({ query });
      const byChatid = R.propEq("id", deleteChat.id);

      cache.writeQuery({
        query,
        data: { chats: R.reject(byChatid, chats) }
      });
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const myRanges = ({ render }) => (
  <Query query={ALL_RANGES}>{(data, loading) => render(data, loading)}</Query>
);

const myChats = ({ render }) => <Query query={ALL_CHATS}>{data => render(data)}</Query>;

const mapper = {
  myRanges,
  myChats,
  //chats: <Query query={ALL_CHATS} />,
  addChat,
  deleteChat
};

const mapProps = ({ myRanges, myChats, addChat }) => ({
  ranges: myRanges.data.allRanges,
  chats: myChats.data.chats,
  loading: myChats.loading,
  loading1: myRanges.loading,
  addChat: addChat.mutation,
  addChatResult: addChat.result,
  deleteChat: deleteChat.mutation,
  deleteChatResult: deleteChat.result
});

const MyContainer = adopt(mapper, mapProps);

class ChatContainer extends Component {
  state = {
    showDialog: false,
    body: "",
    values: {},
    showMessage: false,
    err: ""
  };

  doCancel = () => {
    this.props.history.push("/chat");
  };

  findWeekfromDate = (weeknr, ranges) => {
    const obj = ranges.find(o => o.Name === weeknr);
    return obj.FromDate;
  };

  showDialog() {
    if (!this.state.showDialog) {
      return <div />;
    }
    return (
      <OkCancelDialog
        body={this.state.body}
        open={this.state.showDialog}
        title="update Database"
        handleSubmit={this.handleSubmit.bind(this)}
        handleCancel={this.handleCancel.bind(this)}
      />
    );
  }

  handleCancel() {
    this.setState({ showDialog: false });
  }

  render() {
    return (
      <MyContainer>
        {({ loading, loading1, error, data, ranges, chats, addChat, ...props }) => {
          if (loading || loading1) return <div>Loading</div>;
          console.log("data", addChat, ranges, chats);

          const handleSubmitAdd = async values => {
            const { weeknr, team, nrchats, responseintime } = values;
            const fromDate = this.findWeekfromDate(weeknr, ranges);
            const percentage = (100 * responseintime) / nrchats;
            console.log("percentage", percentage);
            const input = { weeknr, team, nrchats, responseintime, fromDate };
            const result = await addChat({
              variables: {
                input
              }
            });
            this.props.history.push("/chat");
            console.log("result", result);
          };
          return (
            <SharedSnackbarConsumer>
              {({ openSnackbar }) => {
                return (
                  <Fragment>
                    <Card>
                      <ChatAdd
                        ranges={ranges}
                        onSave={values => {
                          handleSubmitAdd(values);
                          openSnackbar("Entry Added");
                        }}
                        onCancel={this.doCancel}
                        entry={null}
                      />
                      <Snackbar
                        open={this.state.showMessage}
                        message={this.state.err}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                      />
                    </Card>
                  </Fragment>
                );
              }}
            </SharedSnackbarConsumer>
          );
        }}
      </MyContainer>
    );
  }
}

export default withRouter(ChatContainer);
