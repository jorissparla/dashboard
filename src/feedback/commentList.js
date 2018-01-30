import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import { HeaderRow, HeaderLeft, Title, StyledInitials } from "../styles";
import ModeEdit from "material-ui/svg-icons/content/content-copy";

const P = styled.p`
  white-space: pre-line;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  left: 15px;
`;
const DateField = styled.div`
  font-size: 10px;
`;

const Image = ({ image, fullname, size = 32 }) => {
  const initials = fullname
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
  if (image) {
    return <Avatar src={image} size={size} />;
  } else {
    return (
      <StyledInitials color="#1da1f2" size={size}>
        {initials}
      </StyledInitials>
    );
  }
};

const queryComments = gql`
  query queryComments {
    comments {
      incident_id
      pic
      survey_date
      customer_name
      comment
      ownerrep_name
    }
  }
`;

const copyCommentToFeedback = gql`
  mutation copyCommentToFeedback($incident_id: Int) {
    createFeedbackFromSurvey(incident_id: $incident_id) {
      id
    }
  }
`;

class CommentList extends Component {
  state = {};

  copyToFeedBack = id => {
    this.props
      .copyCommentToFeedback({ variables: { incident_id: id } })
      .then(res => this.props.history.push("/feedback"));
  };

  renderListItem = (item, index) => {
    const { incident_id, pic, survey_date, customer_name, comment, ownerrep_name } = item;
    return [
      <ListItem
        key={incident_id}
        leftAvatar={
          <Left>
            <Image image={pic} fullname={ownerrep_name} />
            <DateField>{survey_date.substr(0, 10)}</DateField>
          </Left>
        }
        primaryText={`${customer_name.slice(0, 50)} (${ownerrep_name})`}
        secondaryTextLines={2}
        secondaryText={<P>{comment}</P>}
        rightIcon={<ModeEdit onClick={() => this.copyToFeedBack(incident_id)} />}
      />,
      <Divider key={index} />
    ];
  };
  render() {
    const { data: { loading, comments } } = this.props;
    if (loading) return <div>Loading</div>;
    return [
      <HeaderRow key="hr1">
        <HeaderLeft>
          <Title>Customer Comments</Title>
        </HeaderLeft>
      </HeaderRow>,
      <Paper key="pa1">
        <List>{comments.map((item, index) => this.renderListItem(item, index))}</List>
      </Paper>
    ];
  }
}

export default compose(
  graphql(queryComments),
  graphql(copyCommentToFeedback, { name: "copyCommentToFeedback" })
)(withRouter(CommentList));
