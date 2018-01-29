import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import { HeaderRow, HeaderLeft, HeaderRight, WideTitle, Title, StyledInitials } from "../styles";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import RaisedButton from "material-ui/RaisedButton";

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

const queryFeedback = gql`
  query feedbackQuery {
    feedback {
      id
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
    const { id, text, createdAt, forConsultant: { image, fullname } } = item;
    return [
      <ListItem
        key={id}
        leftAvatar={
          <Left>
            <Image image={image} fullname={fullname} />
            <DateField>{createdAt.substr(0, 10)}</DateField>
          </Left>
        }
        primaryText={fullname.slice(0, 50)}
        secondaryText={<P>{text}</P>}
        secondaryTextLines={4}
        rightIcon={<ModeEdit />}
      />,
      <Divider />
    ];
  };
  render() {
    console.log(this.props);
    const { data: { loading, feedback } } = this.props;
    if (loading) return <div>Loading</div>;
    return [
      <HeaderRow>
        <HeaderLeft>
          <Title>Nice Customer Feedback</Title>
        </HeaderLeft>
        <HeaderRight>
          <RaisedButton label="New" primary={true} style={{ margin: 10 }} />
          <RaisedButton label="Surveys" secondary={true} style={{ margin: 10 }} />
        </HeaderRight>
      </HeaderRow>,
      <Paper>
        <List>{feedback.map(item => this.renderListItem(item))}</List>
      </Paper>
    ];
  }
}

export default graphql(queryFeedback)(FeedBackList);
