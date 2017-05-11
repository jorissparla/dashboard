import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import { blue500 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Avatar from "material-ui/Avatar";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import ActionHome from "material-ui/svg-icons/action/home";
import NewsIcon from "material-ui/svg-icons/action/event";
import PeopleIcon from "material-ui/svg-icons/social/people";
import ChatIcon from "material-ui/svg-icons/communication/chat";
import PageIcon from "material-ui/svg-icons/social/pages";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import IconMenu from "material-ui/IconMenu";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import { browserHistory } from "react-router";
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
    textColor: "white"
  },
  appBar: {
    height: 50,
    color: blue500
  },
  toolbar: {
    height: 50,
    backgroundColor: blue500
  },
  menuitemStyle: {
    textColor: "black"
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

const Header = React.createClass({
  hamburgerMenu() {
    return (
      <IconMenu
        menuStyle={{ color: "black" }}
        iconButtonElement={<IconButton><MenuIcon /></IconButton>}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Home</div>}
          leftIcon={<ActionHome style={{ root: { color: "black" } }} />}
          onClick={() => browserHistory.push("/")}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Courses</div>}
          leftIcon={<PageIcon style={{ root: { color: "black" } }} />}
          onClick={() => browserHistory.push("/courses")}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Students</div>}
          leftIcon={<PeopleIcon />}
          onClick={() => browserHistory.push("/students")}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>News</div>}
          leftIcon={<NewsIcon />}
          onClick={() => browserHistory.push("/news")}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Chat</div>}
          leftIcon={<ChatIcon />}
          onClick={() => browserHistory.push("/chat")}
        />
        <Divider />
        <MenuItem primaryText="Sign out" />

      </IconMenu>
    );
  },

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

  renderPicture() {
    const picture =
      localStorage.getItem("picture") ||
      "https://randomuser.me/api/portraits/men/20.jpg";
    return <Avatar src={picture} />;
  },

  renderToolBar() {
    return (
      <Toolbar style={styles}>
        <ToolbarGroup firstChild={true}>
          {this.hamburgerMenu()}{this.renderPicture()}
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarTitle
            text="Infor Support Dashboard"
            style={{ color: "white" }}
          />
        </ToolbarGroup>

        <ToolbarGroup>
          {this.renderButtons()}
        </ToolbarGroup>
      </Toolbar>
    );
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
        {this.renderToolBar()}
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
