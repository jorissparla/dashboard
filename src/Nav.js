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
import ExtensionIcon from "material-ui/svg-icons/action/extension";
import FeedbackIcon from "material-ui/svg-icons/action/feedback";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
//import IconMenu from "material-ui/IconMenu";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { withRouter } from "react-router";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import withAuth from "./utils/withAuth";

import { SharedSnackbarConsumer } from "./SharedSnackbar.context";

import FlatButton from "material-ui/FlatButton";

const styles = {
  title: {
    cursor: "pointer"
  }
};

const NavLink = ({ title, Icon, navigateTo, history }) => (
  <MenuItem
    primaryText={<div style={{ color: "black" }}>{title}</div>}
    leftIcon={Icon && <Icon style={{ root: { color: "black" } }} />}
    onClick={() => {
      history.push(navigateTo);
    }}
  />
);

class Header extends React.Component {
  state = {
    showdrawer: false,
    ipaddress: ""
  };
  constructor(props) {
    super(props);
    this.hamburgerMenu = this.hamburgerMenu.bind(this);
  }

  doSomething() {
    var self = this;
    window.RTCPeerConnection =
      window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
    //console.log("RTC", window.RTCPeerConnection);
    if (window.RTCPeerConnection) {
      var pc = new RTCPeerConnection({ iceServers: [] }),
        noop = function() {};

      pc.createDataChannel(""); //create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
      pc.onicecandidate = function(ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
          var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
          console.log("my IP: ", myIP);
          self.setState({ ipaddress: myIP });
          pc.onicecandidate = noop;
        }
      };
    }
  }

  componentDidMount() {
    // this.doSomething()
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
    let isChat = false;

    let isAdmin = false;
    if (user) {
      validRole = user.role !== "Guest";
      isAdmin = user.role === "Admin";
      isChat = user.role === "Chat";
    }

    //console.log("AUTH", authenticated, validRole, user.role !== "Guest");
    return (
      <div onClick={() => this.toggleMenu()}>
        <NavLink title="Home" Icon={ActionHome} navigateTo="/" history={history} />
        <NavLink title="Logistics" Icon={null} navigateTo="/team/logistics" history={history} />
        <NavLink title="Finance" Icon={null} navigateTo="/team/finance" history={history} />
        <NavLink title="Tools" Icon={null} navigateTo="/team/tools" history={history} />

        <Divider />
        <NavLink title="Go Lives" Icon={GoLiveIcon} navigateTo="/golives" history={history} />
        <NavLink title="MT Customers" Icon={ExtensionIcon} navigateTo="/tenant" history={history} />
        <NavLink title="Customer Feedback" Icon={FeedbackIcon} navigateTo="/feedback" history={history} />

        <Divider />
        <NavLink title="Support Cards" Icon={LinkIcon} navigateTo="/supportcard" history={history} />
        {authenticated && (
          <NavLink title="Requests SupportCards" Icon={RequestListIcon} navigateTo="/requestlist" history={history} />
        )}

        <Divider />
        {authenticated && isAdmin && <NavLink title="News" Icon={NewsIcon} navigateTo="/news" history={history} />}
        <Divider />
        {authenticated &&
          (isAdmin || isChat) && <NavLink title="Chat" Icon={ChatIcon} navigateTo="/chat" history={history} />}
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
        {authenticated && (
          //validRole && (
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
      return <FlatButton onClick={() => this.logInLink()} label="Login" style={{ color: "white" }} />;
    }
  }

  renderPicture() {
    const picture = localStorage.getItem("picture") || "https://randomuser.me/api/portraits/men/20.jpg";
    if (this.props.authenticated) {
      return <Avatar src={picture} />;
    } else return <div />;
  }

  renderToolBar() {
    let titleText = this.state.ipaddress ? this.state.ipaddress : "";
    titleText = titleText + process.env.NODE_ENV !== "production" ? `(${process.env.NODE_ENV})` : "";
    return (
      <Toolbar style={styles}>
        <ToolbarGroup firstChild={true}>
          <IconButton>
            <MenuIcon color="white" onClick={() => this.toggleMenu()} />
          </IconButton>
          {this.renderPicture()}
        </ToolbarGroup>
        <ToolbarGroup>
          <SharedSnackbarConsumer>
            {({ openSnackbar }) => {
              return (
                <ToolbarTitle
                  text="Infor Support Dashboard"
                  style={{ color: "white" }}
                  onClick={() => openSnackbar("You clicked Infor Support Dashboard")}
                />
              );
            }}
          </SharedSnackbarConsumer>
        </ToolbarGroup>{" "}
        <ToolbarGroup>
          <ToolbarTitle text={titleText} style={{ color: "white" }} />
        </ToolbarGroup>{" "}
        <ToolbarGroup>{this.renderButtons()}</ToolbarGroup>
      </Toolbar>
    );
  }

  getLeft = () => {
    if (this.state.showdrawer) return 250;
    return 0;
  };

  getStyle = () => {
    if (this.state.showdrawer) return { left: "250px", width: "calc(100% - 270px)", position: "absolute" };
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
