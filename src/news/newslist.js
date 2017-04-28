import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import { Link, browserHistory } from "react-router";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import ActionHome from "material-ui/svg-icons/action/home";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
import Snackbar from "material-ui/Snackbar";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import ActionSearch from "material-ui/svg-icons/action/search";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
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
  constructor(props) {
    super(props);
  }

  renderNews(news) {
    return news.map(newsitem => {
      const { title, body, img, link, link_text, expire_date, id } = newsitem;
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

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default NewsList;
