import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import { blue500 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Avatar from "material-ui/Avatar";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import ActionHome from "material-ui/svg-icons/action/home";
import PeopleIcon from "material-ui/svg-icons/social/people";
import PageIcon from "material-ui/svg-icons/social/pages";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import IconMenu from "material-ui/IconMenu";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import { Link } from "react-router";

const muiTheme = getMuiTheme({
  palette: {
    textColor: blue500
  },
  appBar: {
    height: 50,
    color: blue500
  }
});

function handleTouchTap() {
  alert("onTouchTap triggered on the title component");
}

const styles = {
  title: {
    cursor: "pointer"
  }
};

const HamburgerMenu = () => {
  return (
    <div>
      <MenuItem primaryText="Courses" leftIcon={<PageIcon />} />
      <MenuItem primaryText="Students" leftIcon={<PeopleIcon />} />
      <MenuItem primaryText="Sign out" />
    </div>
  );
};

const Header = React.createClass({
  renderButtons() {
    let logOutLink = <Link to="signout" />;
    let logInLink = <Link to="signin" />;

    if (this.props.authenticated) {
      return (
        <FlatButton containerElement={logOutLink} label="Logout">
          {/*  <Avatar src="https://randomuser.me/api/portraits/men/20.jpg" /> */}
        </FlatButton>
      );
    } else {
      return <FlatButton containerElement={logInLink} label="Login" />;
    }
  },

  renderAppBar() {
    return (
      <AppBar
        style={styles}
        showMenuIconButton={true}
        title={
          <span style={styles.title}>
            Infor Support Dashboard
          </span>
        }
        onLeftIconButtonTouchTap={() => window.alert("Menu")}
        onTitleTouchTap={handleTouchTap}
        iconElementRight={this.renderButtons()}
      />
    );
  },

  render() {
    let homeLink = <Link to={"/"} />;
    const picture =
      localStorage.getItem("picture") ||
      "https://randomuser.me/api/portraits/men/20.jpg";
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.renderAppBar()}
      </MuiThemeProvider>
    );
  }
});

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
