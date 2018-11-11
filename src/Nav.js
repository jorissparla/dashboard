import React from 'react';
//import AppBar from "material-ui/AppBar";
import AppBar from '@material-ui/core/AppBar';
//import IconButton from "material-ui/IconButton";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ActionHome from '@material-ui/icons/Home';
import NewsIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import PageIcon from '@material-ui/icons/Pages';
import LinkIcon from '@material-ui/icons/Link';
import RequestListIcon from '@material-ui/icons/PlaylistAdd';
import GoLiveIcon from '@material-ui/icons/FlightTakeoff';
import ExtensionIcon from '@material-ui/icons/Extension';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MenuIcon from '@material-ui/icons/Menu';
//import FlatButton from "@material-ui/core/FlatButton";
import Button from '@material-ui/core/Button';
//import IconMenu from "material-ui/IconMenu";
import Divider from '@material-ui/core/Divider';
//import Drawer from "material-ui/Drawer";
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router';
//import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import Toolbar from '@material-ui/core/Toolbar';
//import ToolbarGroup from "@material-ui/core/ToolbarGroup";
//import ToolbarTitle from "@material-ui/core/ToolbarTitle";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withAuth from './utils/withAuth';
import { SharedSnackbarConsumer } from './SharedSnackbar.context';
import Signout from './Signout';
import User from './User';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appFrame: {
    height: 64,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    display: 'flex',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'appBarShift-left': {
    marginLeft: drawerWidth
  },
  'appBarShift-right': {
    marginRight: drawerWidth
  },

  hamburger: {
    color: 'white'
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  'content-left': {
    marginLeft: -drawerWidth
  },
  'content-right': {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  },
  'contentShift-right': {
    marginRight: 0
  }
});

const NavLink = ({ title, Icon, navigateTo, history }) => (
  <MenuItem
    onClick={() => {
      history.push(navigateTo);
    }}
  >
    {Icon && (
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    )}
    <ListItemText>{title}</ListItemText>
  </MenuItem>
);

class Header extends React.Component {
  state = {
    showdrawer: false,
    ipaddress: ''
  };

  doSomething() {
    var self = this;
    window.RTCPeerConnection =
      window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
    //console.log("RTC", window.RTCPeerConnection);
    if (window.RTCPeerConnection) {
      var pc = new RTCPeerConnection({ iceServers: [] }),
        noop = function() {};

      pc.createDataChannel(''); //create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
      pc.onicecandidate = function(ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
          var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
            ice.candidate.candidate
          )[1];
          console.log('my IP: ', myIP);
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

  hamburgerIcon = ({ c }) => (
    <IconButton>
      <MenuIcon onClick={() => this.toggleMenu()} />
    </IconButton>
  );

  hamburgerMenu = ({ openSnackbar }) => {
    const { history, authenticated, user } = this.props;

    let validRole = false;
    let isChat = false;

    let isAdmin = false;
    if (user) {
      validRole = user.role !== 'Guest';
      isAdmin = user.role === 'Admin';
      isChat = user.role === 'Chat';
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
        <NavLink
          title="Customer Feedback"
          Icon={FeedbackIcon}
          navigateTo="/feedback"
          history={history}
        />
        <Divider />
        <NavLink
          title="Support Cards"
          Icon={LinkIcon}
          navigateTo="/supportcard"
          history={history}
        />
        {authenticated && (
          <React.Fragment>
            <NavLink
              title="Requests SupportCards"
              Icon={RequestListIcon}
              navigateTo="/requestlist"
              history={history}
            />
            <NavLink
              title="Submit Scheduled Training Request"
              Icon={RequestListIcon}
              navigateTo="/addplannedcourserequest"
              history={history}
            />
            <Divider />
            {(isAdmin || isChat) && (
              <NavLink title="Chat" Icon={ChatIcon} navigateTo="/chat" history={history} />
            )}
            <Divider />
            {authenticated &&
              isAdmin && (
                <NavLink title="News" Icon={NewsIcon} navigateTo="/news" history={history} />
              )}
            <Divider />
            <NavLink
              title="Courses Dashboard"
              Icon={NewsIcon}
              navigateTo="/coursedashboard"
              history={history}
            />
            <NavLink title="Courses" Icon={PageIcon} navigateTo="/courses" history={history} />
            {validRole && (
              <NavLink
                title="Students"
                Icon={PeopleIcon}
                navigateTo="/students"
                history={history}
              />
            )}
            <Signout>
              {signout => {
                return (
                  <MenuItem
                    onClick={() => {
                      openSnackbar('Signing out');
                      signout();
                    }}
                  >
                    Signout
                  </MenuItem>
                );
              }}
            </Signout>
          </React.Fragment>
        )}
      </div>
    );
  };
  logOutLink = () => {
    const { history } = this.props;
    history.push('/signout');
  };
  logInLink = () => {
    const { history } = this.props;
    history.push('/signin');
    //window.location.href = location.href;
  };
  renderButtons() {
    if (this.props.authenticated) {
      return (
        <Button onClick={() => this.logOutLink()} color="inherit">
          Logout
        </Button>
      );
    } else {
      return (
        <Button onClick={() => this.logInLink()} color="inherit">
          Login
        </Button>
      );
    }
  }

  renderImage() {
    return (
      <User>
        {payload => {
          console.log(payload);
          return <p>User</p>;
        }}
      </User>
    );
  }

  getLeft = () => {
    if (this.state.showdrawer) return 250;
    return 0;
  };

  render() {
    const { classes, theme, authenticated } = this.props;
    let titleText = this.state.ipaddress ? this.state.ipaddress : '';
    titleText =
      titleText + process.env.NODE_ENV !== 'production' ? `(${process.env.NODE_ENV})` : '';
    const picture =
      localStorage.getItem('picture') || 'https://randomuser.me/api/portraits/men/20.jpg';
    return (
      <User>
        {({ data, loading }) => {
          if (loading) {
            return 'loading...';
          }

          console.log('🎈🎈🎈', data);
          return (
            <SharedSnackbarConsumer>
              {({ openSnackbar }) => {
                return (
                  <React.Fragment>
                    <Drawer
                      classes={{
                        paper: classes.drawerPaper
                      }}
                      anchor="left"
                      open={this.state.showdrawer}
                      key="drawer"
                    >
                      {this.hamburgerMenu({ openSnackbar })}
                    </Drawer>

                    <div className={classes.root}>
                      <AppBar position="static">
                        <Toolbar>
                          <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                          >
                            <MenuIcon onClick={() => this.toggleMenu()} />
                          </IconButton>
                          {authenticated && (
                            <Button>
                              <Avatar src={picture} />
                            </Button>
                          )}
                          {/*this.renderImage()*/}
                          <Typography variant="h6" color="inherit" className={classes.grow}>
                            Infor Support Dashboard {titleText}
                          </Typography>
                          <Typography variant="h6" color="inherit" />

                          {authenticated ? (
                            <Button onClick={() => this.logOutLink()} color="inherit">
                              Logout
                            </Button>
                          ) : (
                            <Button onClick={() => this.logInLink()} color="inherit">
                              Login
                            </Button>
                          )}
                        </Toolbar>
                      </AppBar>
                    </div>
                  </React.Fragment>
                );
              }}
            </SharedSnackbarConsumer>
          );
        }}
      </User>
    );
  }
}
export default withRouter(withAuth(withStyles(styles)(Header)));
