import React, { Component } from "react";
import { withRouter } from "react-router";
import { Card, OkCancelDialog } from "../common";
import ChatAdd from "./ChatAdd";
import Snackbar from "material-ui/Snackbar";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
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
      return `${(100 * this.responseintime / this.nrchats).toFixed(1)} %`;
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
  doSubmit = values => {
    const { weeknr, team, nrchats, responseintime } = chatAddEntry;
    const fromDate = this.findWeekfromDate(weeknr, this.props.data.ranges);
    const input = { weeknr, team, nrchats, responseintime, fromDate };
    console.log(input);
    this.props
      .createNewChat({
        variables: {
          input
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log("error", error));
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
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    const { ranges } = this.props.data;
    console.log("chatcontainer props=>", this.props);
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
  }
}

const createChatMutation = gql`
  mutation createChat($input: ChatInputType) {
    createChat(input: $input) {
      id
    }
  }
`;
const queryRanges = gql`
  query ranges {
    ranges {
      ID
      FromDate
      ToDate
      Name
      RangeType
      FullRange
    }
  }
`;

export default compose(
  graphql(createChatMutation, { name: "createNewChat" }),
  graphql(queryRanges)
)(withRouter(ChatContainer));
