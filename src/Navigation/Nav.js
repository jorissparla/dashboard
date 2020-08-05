import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import classNames from "classnames";
import React, { useState } from "react";
import { withRouter } from "react-router";
import withAuth from "../utils/withAuth";
import { AuthenticationSection } from "./AuthSection";
import { SideBarMenu } from "./SideBarMenu";
import SystemMessage from "utils/SystemMessage";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const drawerWidth = 340;

const styles = (theme) => ({
  root: {
    display: "flex",
    marginBottom: 70,
    background: "rgba(0,0,0,0.05)",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0.2,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  sidebar: {},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  panelDetails: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
  },
  toolBar: {
    display: "flex",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
});

const SYSTEM_MESSAGE = gql`
  query SYSTEM_MESSAGE {
    getActiveMessage {
      id
      message
    }
  }
`;

const Header = (props) => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(SYSTEM_MESSAGE);
  if (loading) return <div></div>;
  const getActiveMessage = data?.getActiveMessage;
  const message = getActiveMessage ? getActiveMessage.message : "";
  console.log(data);
  function toggleMenu() {
    setOpen(!open);
  }
  const { classes, theme, history } = props;
  //const currentUser = useUser();
  let titleText = ""; // this.state.ipaddress ? this.state.ipaddress : "";
  titleText = titleText + process.env.NODE_ENV !== "production" ? `(${process.env.NODE_ENV})` : "";
  return (
    // <ThemeProvider theme={context.theme}>
    <React.Fragment>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <SystemMessage message={message} />
          <Toolbar disableGutters={!open} className={classes.toolBar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleMenu}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton style={{ color: "white" }} onClick={() => props.history.push("/news/add")}>
              Share
              <CameraIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Infor Support Dashboard {titleText}
            </Typography>
            <AuthenticationSection history={history} />
          </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} anchor="left" open={open} key="drawer" variant="persistent">
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => toggleMenu()}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          </div>
          <Divider />
          <SideBarMenu
            classes={classes}
            toggleMenu={toggleMenu}
            history={history}
            //user={user}
            open={open}
          />
        </Drawer>
      </div>
    </React.Fragment>
    // </ThemeProvider>
  );
};

export default withRouter(withAuth(withStyles(styles, { withTheme: true })(Header)));
