import React, { Component } from "react";
import { withRouter } from "react-router";
import { Card, OkCancelDialog } from "../common";
import ChatAdd from "./ChatAdd";
import Snackbar from "material-ui/Snackbar";
import gql from 'graphql-tag'
import { Mutation, Query } from "react-apollo";
import { adopt } from "react-adopt";
import * as R from "ramda";
import { observer } from "mobx-react";
import { observable } from "mobx";

const chatAddEntry = observable({
  weeknr: "",
  team: "Finance",
  region: "EMEA",
  nrchats: 1,
  responseintime: 0,
  percentage: function() {
    if (this.nrchats !== 0) {
      return `${((100 * this.responseintime) / this.nrchats).toFixed(1)} %`;
    } else {
      return `0.0 %`;
    }
  },
  fromDate: new Date(),
  report() {
    return `weeknr: ${this.weeknr}, team: ${this.team} nrchats: ${this.nrchats}, responseintime: ${
      this.responseintime
    } percentage: ${this.percentage()}`;
  }
});

const ChatAddObserver = observer(ChatAdd);

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
const ALL_RANGES = gql`
  {
    allRanges:ranges {
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
    update = 
      {(cache, { data: { createChat } }) => {
        const query = ALL_CHATS;
        const props = cache.readQuery({ query });
        const { chats } = props;
        console.log('Chats', chats)
        cache.writeQuery({
          query,
          data: { chats: R.concat(chats, [createChat]) }
        });
      }

    }
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const myRanges = ({ render}) => (
<Query query={ALL_RANGES} >
  { (data, loading) => render(data, loading)}
</Query>
)

const myChats = ({ render}) => (
  <Query query={ALL_CHATS} >
    { (data) => render(data)}
  </Query>
  )
  

const mapper ={
  myRanges,
  myChats,
  //chats: <Query query={ALL_CHATS} />,
  addChat
}

const mapProps = ({ myRanges, myChats, addChat}) => ({
  ranges: myRanges.data.allRanges,
  chats: myChats.data.chats,
  loading: myChats.loading,
  loading1: myRanges.loading,
  addChat: addChat.mutation,
  addChatResult: addChat.result
})

const MyContainer = adopt(mapper, mapProps)

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
         {({ loading, loading1, error, data, ranges, chats, addChat,...props}) => {
           if(loading||loading1) return <div>Loading</div>
           console.log('data', addChat, ranges, chats)

           const handleSubmitAdd = async () => {
            const { weeknr, team, nrchats, responseintime } = chatAddEntry;
            const fromDate = this.findWeekfromDate(weeknr, ranges);
            const input = { weeknr, team, nrchats, responseintime, fromDate };
            await addChat({
              variables: {
                input
              }})
           }
           return (
            <Card>
              <ChatAddObserver
                ranges={ranges}
                onSave={handleSubmitAdd}
                onCancel={this.doCancel}
                entry={chatAddEntry}
              />
              <Snackbar
                open={this.state.showMessage}
                message={this.state.err}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            </Card>
          );
          }
        }
        </MyContainer>
    )
  }
  render2() {
    return (
      <Query query={ALL_RANGES} > {
        ({...propzs}) => { 
          console.log('PPP', propzs)
          return (
      <Mutation>
        {({...props, addChat }) => {
         // if (loading) return <div>Loading</div>;
          const ranges = [];
          console.log("DATA", props, addChat);
          return (
            <Card>
              <ChatAddObserver
                ranges={ranges}
                onSave={this.doSubmit}
                onCancel={this.doCancel}
                entry={chatAddEntry}
              />
              <Snackbar
                open={this.state.showMessage}
                message={this.state.err}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            </Card>
          );
        }}
      </Mutation>
      
    )}
  }}
  </Query>)
}}



export default withRouter(ChatContainer);
