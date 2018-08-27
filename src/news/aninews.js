import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ModeEdit from "@material-ui/icons/ModeEdit";
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

const NewsItem = ({ title, body, img, expire_date, id, authenticated }) => (
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
class NewsList extends Component {
  render() {
    const { news, authenticated } = this.props;
    return (
      <List>{news.map(newsitem => <NewsItem {...newsitem} authenticated={authenticated} />)}</List>
    );
  }
}

export default withStyles(styles)(NewsList);
