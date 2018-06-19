import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ModeEdit from "@material-ui/icons/ModeEdit";
//import { blue500 } from "material-ui/styles/colors";
import blue500 from "@material-ui/core/colors/blue";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  dateField: {
    fontSize: 10
  },
  left: {
    display: "flex",
    flexDirection: "column",
    marginRight: 10,
    left: 15
  }
});

class NewsList extends Component {
  /*   renderNews = (news, authenticated) => {
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
            secondaryText={body}
          />
          <Divider inset={true} />
        </Paper>
      );
    });
  }; */

  renderNews = (news, authenticated) => {
    const { classes } = this.props;
    return news.map(newsitem => {
      const { title, body, img, expire_date, id } = newsitem;
      return (
        <React.Fragment key={id}>
          <ListItem>
            <div className="left">
              <Avatar src={img} />
              <div className="dateField">{expire_date.substr(0, 10)}</div>
            </div>
            <ListItemText primary={title} secondary={body} />
            <ListItemSecondaryAction>
              {authenticated && <ModeEdit onClick={() => this.props.onEdit(id)} />}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider inset={true} />
        </React.Fragment>
      );
    });
  };
  render() {
    return <List>{this.renderNews(this.props.news || [], this.props.authenticated)}</List>;
  }
}

export default withStyles(styles)(NewsList);
