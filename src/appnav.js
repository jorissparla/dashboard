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
import LinkIcon from "material-ui/svg-icons/content/link";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import IconMenu from "material-ui/IconMenu";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import { withRouter } from "react-router";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import withAuth from "./utils/withAuth";

import FlatButton from "material-ui/FlatButton";

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    color: blue500,
    textColor: "white"
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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.hamburgerMenu = this.hamburgerMenu.bind(this);
  }

  hamburgerMenu() {
    const { history } = this.props;
    return (
      <IconMenu
        menuStyle={{ color: "white" }}
        iconButtonElement={
          <IconButton>
            <MenuIcon color="white" />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Home</div>}
          leftIcon={<ActionHome style={{ root: { color: "black" } }} />}
          onClick={() => {
            history.push("/");
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Courses</div>}
          leftIcon={<PageIcon style={{ root: { color: "black" } }} />}
          onClick={() => {
            this.props.history.push("/courses");
            //window.location.href = location.href;
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Students</div>}
          leftIcon={<PeopleIcon />}
          onClick={() => {
            history.push("/students");
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>SupportCards</div>}
          leftIcon={<LinkIcon />}
          onClick={() => {
            history.push("/supportcard");
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>News</div>}
          leftIcon={<NewsIcon />}
          onClick={() => {
            history.push("/news");
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Chat</div>}
          leftIcon={<ChatIcon />}
          onClick={() => {
            history.push("/chat");
          }}
        />
        <Divider />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }
  logOutLink = () => {
    const { history } = this.props;
    history.push("/signout");
  };
  logInLink = () => {
    const { history } = this.props;
    history.push("/signin");
    //window.location.href = location.href;
  };
  renderButtons() {
    if (this.props.authenticated) {
      return (
        <FlatButton onClick={() => this.logOutLink()} label="Logout" style={{ color: "white" }}>
          {/*  <Avatar src="https://randomuser.me/api/portraits/men/20.jpg" /> */}
        </FlatButton>
      );
    } else {
      return (
        <FlatButton onClick={() => this.logInLink()} label="Login" style={{ color: "white" }} />
      );
    }
  }

  renderPicture() {
    const picture =
      localStorage.getItem("picture") || "https://randomuser.me/api/portraits/men/20.jpg";
    if (this.props.authenticated) {
      return <Avatar src={picture} />;
    } else return <div />;
  }

  renderToolBar() {
    return (
      <Toolbar style={styles}>
        <ToolbarGroup firstChild={true}>
          {this.hamburgerMenu()}
          {this.renderPicture()}
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarTitle text="Infor Support Dashboard" style={{ color: "white" }} />
        </ToolbarGroup>

        <ToolbarGroup>{this.renderButtons()}</ToolbarGroup>
      </Toolbar>
    );
  }

  renderAppBar() {
    return (
      <AppBar
        style={styles}
        showMenuIconButton={true}
        title={<span style={styles.title}>Infor Support Dashboard</span>}
        onLeftIconButtonTouchTap={() => window.alert("Menu")}
        onTitleTouchTap={handleTouchTap}
        iconElementRight={this.renderButtons()}
      />
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {this.renderToolBar()}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(withAuth(Header));
