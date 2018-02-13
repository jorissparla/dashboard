import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Avatar from "material-ui/Avatar";
import ActionHome from "material-ui/svg-icons/action/home";
import NewsIcon from "material-ui/svg-icons/action/event";
import PeopleIcon from "material-ui/svg-icons/social/people";
import ChatIcon from "material-ui/svg-icons/communication/chat";
import PageIcon from "material-ui/svg-icons/social/pages";
import LinkIcon from "material-ui/svg-icons/content/link";
import RequestListIcon from "material-ui/svg-icons/av/playlist-add";
import GoLiveIcon from "material-ui/svg-icons/action/flight-takeoff";
import FeedbackIcon from "material-ui/svg-icons/action/feedback";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
//import IconMenu from "material-ui/IconMenu";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { withRouter } from "react-router";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import withAuth from "./utils/withAuth";

import FlatButton from "material-ui/FlatButton";

function handleTouchTap() {
  alert("onTouchTap triggered on the title component");
}

const styles = {
  title: {
    cursor: "pointer"
  }
};

class Header extends React.Component {
  state = {
    showdrawer: false
  };
  constructor(props) {
    super(props);
    this.hamburgerMenu = this.hamburgerMenu.bind(this);
  }

  toggleMenu = () => {
    this.setState({ showdrawer: !this.state.showdrawer });
  };

  hamburgerIcon = () => (
    <IconButton>
      <MenuIcon color="white" onClick={() => this.toggleMenu()} />
    </IconButton>
  );

  hamburgerMenu() {
    const { history, authenticated, user } = this.props;

    let validRole = false;
    if (user) {
      validRole = user.role !== "Guest";
    }
    //console.log("AUTH", authenticated, validRole, user.role !== "Guest");
    return (
      <div onClick={() => this.toggleMenu()}>
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Home</div>}
          leftIcon={<ActionHome style={{ root: { color: "black" } }} />}
          onClick={() => {
            history.push("/");
          }}
        />
        <MenuItem
          primaryText={<div style={{ color: "black", marginLeft: 10 }}>Logistics</div>}
          onClick={() => {
            history.push("/team/Logistics");
          }}
        />
        <MenuItem
          primaryText={<div style={{ color: "black", marginLeft: 10 }}>Finance</div>}
          onClick={() => {
            history.push("/team/Finance");
          }}
        />
        <MenuItem
          primaryText={<div style={{ color: "black", marginLeft: 10 }}>Tools</div>}
          onClick={() => {
            history.push("/team/Tools");
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Golives</div>}
          leftIcon={<GoLiveIcon />}
          onClick={() => {
            history.push("/golives");
          }}
        />
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>Customer Feedback</div>}
          leftIcon={<FeedbackIcon />}
          onClick={() => {
            history.push("/feedback");
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
        {authenticated && (
          <MenuItem
            primaryText={<div style={{ color: "black" }}>Requests SupportCards</div>}
            leftIcon={<RequestListIcon />}
            onClick={() => {
              history.push("/requestlist");
            }}
          />
        )}
        <Divider />
        <MenuItem
          primaryText={<div style={{ color: "black" }}>News</div>}
          leftIcon={<NewsIcon />}
          onClick={() => {
            history.push("/news");
          }}
        />
        <Divider />
        {authenticated && (
          <MenuItem
            primaryText={<div style={{ color: "black" }}>Chat</div>}
            leftIcon={<ChatIcon />}
            onClick={() => {
              history.push("/chat");
            }}
          />
        )}
        <Divider />
        {authenticated && (
          <MenuItem
            primaryText={<div style={{ color: "black" }}>Courses Dashboard</div>}
            leftIcon={<NewsIcon />}
            onClick={() => {
              history.push("/coursedashboard");
            }}
          />
        )}
        {authenticated &&
          validRole && (
            <MenuItem
              primaryText={<div style={{ color: "black" }}>Courses</div>}
              leftIcon={<PageIcon style={{ root: { color: "black" } }} />}
              onClick={() => {
                this.props.history.push("/courses");
                //window.location.href = location.href;
              }}
            />
          )}
        {authenticated &&
          validRole && (
            <MenuItem
              primaryText={<div style={{ color: "black" }}>Students</div>}
              leftIcon={<PeopleIcon />}
              onClick={() => {
                history.push("/students");
              }}
            />
          )}
        <MenuItem primaryText="Sign out" />
      </div>
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
          {this.hamburgerIcon()}
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

  getLeft = () => {
    if (this.state.showdrawer) return 250;
    return 0;
  };

  getStyle = () => {
    if (this.state.showdrawer)
      return { left: "250px", width: "calc(100% - 270px)", position: "absolute" };
    return { width: "100%" };
  };
  render() {
    return [
      <Drawer open={this.state.showdrawer} key="drawer">
        {" "}
        {this.hamburgerMenu()}
      </Drawer>,
      <div style={this.getStyle()} key="rest">
        {this.renderToolBar()}
        {this.props.children}
      </div>
    ];
  }
}
export default withRouter(withAuth(Header));
