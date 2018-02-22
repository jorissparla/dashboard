import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import { blue500 } from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

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

class NewsList extends Component {
  renderNews = (news, authenticated) => {
    return news.map(newsitem => {
      const { title, body, img, expire_date, id } = newsitem;
      return (
        <Paper key={id}>
          <ListItem
            leftAvatar={
              <Left>
                <Avatar src={img} />
                <DateField>{expire_date.substr(0, 10)}</DateField>
              </Left>
            }
            primaryText={title}
            rightIcon={
              authenticated && <ModeEdit color={blue500} onClick={() => this.props.onEdit(id)} />
            }
            secondaryText={<P>{body}</P>}
          />
          <Divider inset={true} />
        </Paper>
      );
    });
  };

  render() {
    return <List>{this.renderNews(this.props.news || [], this.props.authenticated)}</List>;
  }
}

export default NewsList;
