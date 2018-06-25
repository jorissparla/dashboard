import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import { addDays, distanceInWordsToNow } from "date-fns";
import { Loading } from "../styles";
import styled from "styled-components";

const Title = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
`;
const { REACT_APP_SERVER = "nlbavwixs" } = process.env;
const defaultPicture = `http://${REACT_APP_SERVER}/images/male.png`;

const RequestItem = ({ item, handleClick }) => {
  const { id, name, text, createdAt, account, complete, assigned } = item;
  const picture = account ? (account.image ? account.image : defaultPicture) : defaultPicture;
  const completeStatus = complete === 1 ? "Completed" : "";
  const assignedTo = assigned ? ` Assigned to ${assigned} ` : "";
  const isNew = Date.parse(createdAt) > addDays(new Date(), -7);
  return (
    <ListItem
      key={id}
      leftAvatar={<Avatar src={picture} />}
      rightAvatar={isNew ? <NewIcon color={"#3db5e8"} /> : <div />}
      primaryText={text}
      secondaryText={`requested by ${name} , ${distanceInWordsToNow(
        Date.parse(createdAt)
      )} ago, ${completeStatus}, ${assignedTo}`}
      onClick={() => handleClick(item)}
    />
  );
};

const HasDivider = expression => (expression ? <Divider /> : <div />);

class RequestContainer extends Component {
  renderRequests = requests => (
    <List style={{ backgroundColor: "white" }}>
      {requests.map((item, index) => (
        <React.Fragment key={item.id}>
          <RequestItem
            item={item}
            key={item.id}
            handleClick={() => this.props.history.push(`/supportcard/request/${item.id}`)}
          />
          <HasDivider expression={index !== requests.length - 1} />
        </React.Fragment>
      ))}
    </List>
  );
  render() {
    const {
      data: { loading, error, requests }
    } = this.props;

    //
    if (loading) {
      return <Loading />;
    }

    const openRequests = requests.filter(request => request.complete === 0);
    const closedRequests = requests.filter(request => request.complete === 1);
    if (error) return <h2>{error}</h2>;
    return (
      <div>
        <Title>Open Requests</Title>
        {this.renderRequests(openRequests)}
        <Title>Completed Requests</Title>
        {this.renderRequests(closedRequests)}
      </div>
    );
  }
}

const queryRequests = gql`
  query request {
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

export default graphql(queryRequests, { name: "data" })(withRouter(RequestContainer));
