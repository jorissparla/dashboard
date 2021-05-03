import { graphql } from "@apollo/client/react/hoc";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import NewIcon from "@material-ui/icons/NewReleases";
import { addDays, formatDistanceToNow } from "date-fns";
import gql from "graphql-tag";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Loading } from "../styles";
import { format } from "../utils/format";

const Title = ({ children }) => <h3 className="font-pop font-semibold text-xl pl-4">{children}</h3>;

const { REACT_APP_SERVER = "nlbavwixs" } = process.env;
const defaultPicture = `https://${REACT_APP_SERVER}/images/male.png`;

const RequestItem = ({ item, handleClick }) => {
  const { name, text, createdAt, account, complete, assigned } = item;
  const picture = account ? (account.image ? account.image : defaultPicture) : defaultPicture;
  const completeStatus = complete === 1 ? "Completed" : "";
  const assignedTo = assigned ? ` Assigned to ${assigned} ` : "";
  const isNew = Date.parse(createdAt) > addDays(new Date(), -7);
  console.log("RequestItem", createdAt, format(parseInt(createdAt), "dd MMMM yyyy"), formatDistanceToNow(new Date(createdAt)));
  return (
    <ListItem onClick={() => handleClick(item)}>
      <Avatar src={picture} />
      <ListItemText
        primary={text}
        secondary={`requested by ${name} , ${format(new Date(createdAt), "dd MMMM yyyy")} , ${completeStatus ? completeStatus : "Not completed"}, ${
          assignedTo ? assignedTo : "Unassigned !"
        }`}
      />
      <ListItemSecondaryAction>{isNew ? <NewIcon color={"#3db5e8"} /> : <div />}</ListItemSecondaryAction>
    </ListItem>
  );
};

const HasDivider = (expression) => (expression ? <Divider /> : <div />);

class RequestContainer extends Component {
  renderRequests = (requests) => (
    <List style={{ backgroundColor: "white" }}>
      {requests.map((item, index) => (
        <React.Fragment key={item.id}>
          <RequestItem item={item} key={item.id} handleClick={() => this.props.history.push(`/supportcard/request/${item.id}`)} />
          <HasDivider expression={index !== requests.length - 1} />
        </React.Fragment>
      ))}
    </List>
  );
  render() {
    const {
      data: { loading, error, requests },
    } = this.props;

    //
    if (loading) {
      return <Loading />;
    }

    const openRequests = requests.filter((request) => request.complete === 0);
    const closedRequests = requests.filter((request) => request.complete === 1);
    if (error) return <h2>{error}</h2>;
    return (
      <div>
        <Title>Open Requests</Title>
        {openRequests.length === 0 ? "No Open Requests" : this.renderRequests(openRequests)}
        <Title>Completed Requests</Title>
        {this.renderRequests(closedRequests)}
      </div>
    );
  }
}

const ALL_REQUESTS_QUERY = gql`
  query ALL_REQUESTS_QUERY {
    requests {
      id
      name
      text
      createdAt
      updatedAt
      assigned
      complete
      account {
        image
      }
    }
  }
`;

export default graphql(ALL_REQUESTS_QUERY, { name: "data" })(withRouter(RequestContainer));

export { ALL_REQUESTS_QUERY };
