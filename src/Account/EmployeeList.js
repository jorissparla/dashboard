import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "90vw",
    margin: "10px",
    backgroundColor: theme.palette.background.paper
  }
});

class EmployeeList extends Component {
  state = {
    checked: [1]
  };

  static propTypes = {
    onRemove: PropTypes.func
  };

  static defaultProps = {
    onRemove: values => console.log(values)
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.employees.map(emp => (
            <ListItem key={emp.id} dense button className={classes.listItem}>
              <Avatar
                alt="Remy Sharp"
                src={emp.image || "https://picsum.photos/50/50/?image=381"}
              />
              <ListItemText
                primary={emp.fullname || emp.login}
                secondary={`${emp.login} in team ${emp.team}`}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <ClearIcon onClick={() => this.props.onRemove(emp.id)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
