import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import moment from "moment";
import { Loading } from "../styles";
import styled from "styled-components";

const Title = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
`;

const defaultPicture = "http://nlbavwtls22/images/male.png";

const RequestItem = ({ item, handleClick }) => {
  const { id, name, text, createdAt, account, complete, assigned } = item;
  const picture = account ? (account.image ? account.image : defaultPicture) : defaultPicture;
  const completeStatus = complete === 1 ? "Completed" : "";
  const assignedTo = assigned ? ` Assigned to ${assigned} ` : "";
  //const isNew = moment().add(-7, "days") > createdAt;
  const isNew = Date.parse(createdAt) > moment().add(-7, "days");
  return (
    <ListItem
      key={id}
      leftAvatar={<Avatar src={picture} />}
      rightAvatar={isNew ? <NewIcon color={"#3db5e8"} /> : <div />}
      primaryText={text}
      secondaryText={`requested by ${name} , ${moment(
        Date.parse(createdAt)
      ).fromNow()}, ${completeStatus}, ${assignedTo}`}
      onClick={() => handleClick(item)}
    />
  );
};

const HasDivider = expression => (expression ? <Divider /> : <div />);

class RequestContainer extends Component {
  renderRequests = requests => (
    <List style={{ backgroundColor: "white" }}>
      {requests.map((item, index) => [
        <RequestItem
          item={item}
          key={item.id}
          handleClick={() => this.props.history.push(`/supportcard/request/${item.id}`)}
        />,
        <HasDivider expression={index !== requests.length - 1} />
      ])}
    </List>
  );
  render() {
    const { data: { loading, error, requests } } = this.props;

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
