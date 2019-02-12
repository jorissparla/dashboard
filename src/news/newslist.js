import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ModeEdit from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';
import { ListItemSecondaryAction } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { format } from '../utils/format';

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
          <ListItem>
            <Left>
              <Avatar src={img} />
              <DateField>{format(expire_date, 'ddd, DD MMM')}</DateField>
            </Left>
            <ListItemText primary={title} secondary={body} />
            <ListItemSecondaryAction onClick={() => this.props.onEdit(id)}>
              {authenticated && (
                <IconButton aria-label="Comments">
                  <ModeEdit color="primary" />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" />
        </Paper>
      );
    });
  };

  render() {
    return <List>{this.renderNews(this.props.news || [], this.props.authenticated)}</List>;
  }
}

export default NewsList;
