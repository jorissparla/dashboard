import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import classNames from 'classnames';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import withAuth from '../utils/withAuth';
import { AuthenticationSection } from './AuthSection';
import { SideBarMenu } from './SideBarMenu';
import { withUser } from '../User';

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

const Header = props => {
  const [open, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!open);
  }
  const { classes, authenticated, theme, history, user } = props;
  const currentUser = withUser();
  console.log('Nav', user, currentUser);
  let titleText = ''; // this.state.ipaddress ? this.state.ipaddress : "";
  titleText = titleText + process.env.NODE_ENV !== 'production' ? `(${process.env.NODE_ENV})` : '';
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
              onClick={toggleMenu}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton style={{ color: 'white' }} onClick={() => props.history.push('/news/add')}>
              Share
              <CameraIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Infor Support Dashboard {titleText}
            </Typography>
            <AuthenticationSection history={history} />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={open}
          key="drawer"
          variant="persistent"
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => toggleMenu()}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <SideBarMenu classes={classes} toggleMenu={toggleMenu} history={history} user={user} />
        </Drawer>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withAuth(withStyles(styles, { withTheme: true })(Header)));
