import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";

const queryFeedback = gql`
  query feedbackQuery {
    feedback {
      createdAt
      customername
      text
      forConsultant {
        image
        fullname
      }
    }
  }
`;

class FeedBackList extends Component {
  state = {};

  renderListItem = item => {
    return (
      <ListItem leftAvatar={<Avatar src={item.forConsultant.image} />} primaryText={item.text} />
    );
  };
  render() {
    console.log(this.props);
    const { data: { loading, feedback } } = this.props;
    if (loading) return <div>Loading</div>;
    return <List>{feedback.map(item => this.renderListItem(item))}</List>;
  }
}

export default graphql(queryFeedback)(FeedBackList);
