import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import { blue500 } from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import styled from "styled-components";

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
  renderNews(news) {
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
              <ModeEdit color={blue500} onClick={() => this.props.onEdit(id)} />
            }
            secondaryText={
              <p>
                {body}
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />

        </Paper>
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderNews(this.props.news)}
      </List>
    );
  }
}

export default NewsList;
