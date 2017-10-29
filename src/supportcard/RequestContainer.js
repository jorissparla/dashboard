import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import moment from "moment";
import { Loading } from "../styles";

const defaultPicture = "http://nlbavwtls22/images/male.png";

const RequestItem = ({ item, handleClick }) => {
  const { id, name, text, createdAt, account } = item;
  const picture = account
    ? account.picture ? account.picture.data : defaultPicture
    : defaultPicture;

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
      ).fromNow()}`}
      onClick={() => handleClick(item)}
    />
  );
};

class RequestContainer extends Component {
  render() {
    const { data: { loading, error, requests } } = this.props;

    //
    if (loading) {
      return <Loading />;
    }
    if (error) return <h2>{error}</h2>;
    return (
      <div>
        <h2>Requests</h2>
        <List style={{ backgroundColor: "white" }}>
          {requests.map(item => [
            <RequestItem
              item={item}
              handleClick={() =>
                this.props.history.push(`/supportcard/request/${item.id}`)}
            />,
            <Divider />
          ])}
        </List>
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
      account {
        picture {
          data
        }
      }
    }
  }
`;

export default graphql(queryRequests, { name: "data" })(
  withRouter(RequestContainer)
);
