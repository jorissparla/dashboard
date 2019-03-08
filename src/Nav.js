import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ActionHome from '@material-ui/icons/Home';
import NewsIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import PageIcon from '@material-ui/icons/Pages';
import LinkIcon from '@material-ui/icons/Link';
import ApplicationIcon from '@material-ui/icons/Launch';
import RequestListIcon from '@material-ui/icons/PlaylistAdd';
import GoLiveIcon from '@material-ui/icons/FlightTakeoff';
import ExtensionIcon from '@material-ui/icons/Extension';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withAuth from './utils/withAuth';
import Signout from './Signout';
import User from './User';
import { List } from '@material-ui/core';
import UserMenu from './UserMenu';

const drawerWidth = 340;

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: 70
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  panelDetails: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0
  },
  toolBar: {
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  }
});

const NavLink = ({ title, Icon, navigateTo, history, toggleMenu }) => (
  <MenuItem
    onClick={() => {
      // toggleMenu();
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

function useToggle(initialState = false) {
  const [on, setOn] = React.useState(initialState);
  const toggle = () => setOn(!on);

  return [on, toggle];
}

function ExpandableMenuItem({ title, Icon, children, classes }) {
  const [expanded, toggleExpanded] = useToggle(false);
  return (
    <ExpansionPanel expanded={expanded} onChange={toggleExpanded}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <Typography className={classes.secondaryHeading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

class Header extends React.Component {
  state = {
    open: false
  };

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  hamburgerIcon = ({ c }) => (
    <IconButton>
      <MenuIcon onClick={() => this.toggleMenu()} />
    </IconButton>
  );

  hamburgerMenu = ({ classes }) => {
    const { history, authenticated, user } = this.props;

    let validRole = false;
    let isChat = false;

    let isAdmin = false;
    if (user) {
      validRole = user.role !== 'Guest';
      isAdmin = user.role === 'Admin';
      isChat = user.role === 'Chat';
    }

    return (
      <List>
        <NavLink title="Home" Icon={ActionHome} navigateTo="/" history={history} />
        <ExpandableMenuItem classes={classes} title="Stats Graphs" Icon={GoLiveIcon}>
          <NavLink
            title="Logistics"
            Icon={ApplicationIcon}
            navigateTo="/team/logistics"
            history={history}
          />
          <NavLink
            title="Finance"
            Icon={ApplicationIcon}
            navigateTo="/team/finance"
            history={history}
          />
          <NavLink
            title="Tools"
            Icon={ApplicationIcon}
            navigateTo="/team/tools"
            history={history}
          />
          <NavLink
            title="Backlog"
            Icon={ApplicationIcon}
            navigateTo="/historyall"
            history={history}
          />
        </ExpandableMenuItem>
        <Divider />
        <ExpandableMenuItem classes={classes} title="Go Lives" Icon={GoLiveIcon}>
          <NavLink title="Go Lives" Icon={GoLiveIcon} navigateTo="/golives" history={history} />
        </ExpandableMenuItem>
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
            <NavLink
              title="View Submitted Scheduled Training Requests"
              Icon={RequestListIcon}
              navigateTo="/plannedcourserequestlist"
              history={history}
            />
            <Divider />
            {(isAdmin || isChat) && (
              <NavLink title="Chat" Icon={ChatIcon} navigateTo="/chat" history={history} />
            )}
            <Divider />
            {authenticated && isAdmin && (
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
                      // TODO: replace this
                      // openSnackbar('Signing out');
                      signout();
                    }}
                  >
                    Signout
                  </MenuItem>
                );
              }}
            </Signout>
            <NavLink title="Videos" navigateTo="/videos" history={history} />
          </React.Fragment>
        )}
      </List>
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
          return <p>User</p>;
        }}
      </User>
    );
  }

  getLeft = () => {
    if (this.state.open) return 250;
    return 0;
  };

  render() {
    const { classes, authenticated, theme } = this.props;
    const { open } = this.state;
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

          return (
            <React.Fragment>
              <div className={classes.root}>
                <AppBar
                  position="fixed"
                  className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                  })}
                >
                  <Toolbar disableGutters={!open} className={classes.toolBar}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.toggleMenu}
                      className={classNames(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    {/*this.renderImage()*/}
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                      Infor Support Dashboard {titleText}
                    </Typography>
                    <div>
                      {authenticated && (
                        <Button>
                          <User>
                            {({ loading, data }) => {
                              if (loading) return 'loading';
                              if (!data || !data.me) return null;
                              const { id } = data.me;
                              return (
                                <>
                                  <UserMenu id={id} picture={picture} />
                                </>
                              );
                            }}
                          </User>
                        </Button>
                      )}
                      {authenticated ? (
                        <Button onClick={() => this.logOutLink()} color="inherit">
                          Logout
                        </Button>
                      ) : (
                        <Button onClick={() => this.logInLink()} color="inherit">
                          Login
                        </Button>
                      )}
                    </div>
                  </Toolbar>
                </AppBar>
                <Drawer
                  className={classes.drawer}
                  anchor="left"
                  open={this.state.open}
                  key="drawer"
                  variant="persistent"
                >
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={() => this.toggleMenu()}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  </div>
                  <Divider />
                  {this.hamburgerMenu({ classes })}
                </Drawer>
              </div>
            </React.Fragment>
          );
        }}
      </User>
    );
  }
}
export default withRouter(withAuth(withStyles(styles, { withTheme: true })(Header)));
