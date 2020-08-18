import { Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, ListItemIcon } from "@material-ui/core";
import XpertIcon from "@material-ui/icons/Commute";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import NewsIcon from "@material-ui/icons/Event";
import MyWorkList from "@material-ui/icons/EventNote";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExtensionIcon from "@material-ui/icons/ExtensionTwoTone";
import GoLiveIcon from "@material-ui/icons/FlightTakeoff";
import ActionHome from "@material-ui/icons/Home";
import ApplicationIcon from "@material-ui/icons/Launch";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
// import LinkIcon from "@material-ui/icons/Link";
import PageIcon from "@material-ui/icons/Pages";
import PeopleIcon from "@material-ui/icons/People";
import Person from "@material-ui/icons/PeopleOutline";
import RequestListIcon from "@material-ui/icons/PlaylistAdd";
import SurveysIcon from "@material-ui/icons/Whatshot";
import SettingsIcon from "@material-ui/icons/Settings";
import SymptomsIcon from "@material-ui/icons/ErrorOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { UserContext } from "globalState/UserProvider";
import LinkIcon from "@material-ui/icons/SpeakerNotesTwoTone";
import AutoExchange from "@material-ui/icons/AirportShuttle";
import LNChartsIcon from "@material-ui/icons/AssessmentTwoTone";
import SymptomDefIcon from "@material-ui/icons/Error";
import React, { useState } from "react";
// import Signout from '../Signout';
import { NavLink } from "./NavLink";
import { signOut } from "auth/msAuth";

interface Props {
  classes: any;
  history: any;
  authenticated?: boolean;
  toggleMenu: () => void;
  open: boolean;
}

export const SideBarMenu: React.FC<Props> = ({ classes, history, toggleMenu, open }) => {
  let validRole = false;
  let isChat = false;
  const { user, logout } = React.useContext(UserContext);

  let isAdmin = false;
  let authenticated = false;
  if (user) {
    authenticated = true;
    validRole = user.role !== "Guest";
    isAdmin = user.role === "Admin";
    isChat = user.role === "Chat";
  }
  async function handleLogout() {
    logout();
    signOut();
  }
  // const ToggledNavLink = this.ToggledNavLink;
  function ToggledNavLink(props: any) {
    return <NavLink {...props} toggleMenu={toggleMenu} history={history} open={open} color={props?.color} />;
  }
  return (
    <List>
      <ToggledNavLink title="Home" Icon={ActionHome} navigateTo="/" history={history} color="bg-gray-100 text-gray-600" />
      <ToggledNavLink title="Cloud Information Page" Icon={CloudQueueIcon} navigateTo="/cloudinformation" history={history} />
      <ToggledNavLink title="MaintenanceWizard" Icon={SettingsIcon} navigateTo="/maintenancewizard" history={history} />
      <ToggledNavLink title="MaintenanceWizard AutoExchange" Icon={AutoExchange} navigateTo="/maintenancewizardauto" history={history} />
      <ToggledNavLink title="MultiTenant Customers" Icon={ExtensionIcon} navigateTo="/tenant" history={history} color="text-orange-600" />
      <ToggledNavLink title="Support Cards" Icon={LinkIcon} navigateTo="/supportcard" history={history} color="text-teal-400" />
      <ToggledNavLink title="Symptom Definitions" Icon={SymptomDefIcon} navigateTo="/symptomcategories" history={history} color="text-pink-600" />
      <ToggledNavLink title="Request Symptoms" Icon={SymptomsIcon} navigateTo="/symptoms" history={history} />
      {authenticated && <ToggledNavLink title="My KBPage" Icon={HelpOutlineIcon} navigateTo="/kbpage" history={history} />}

      {authenticated && <ToggledNavLink title="WorkList" Icon={MyWorkList} navigateTo="/mywork" history={history} />}
      <ToggledNavLink title="Proactive Projects!" Icon={BusinessCenterIcon} navigateTo="/projects" history={history} color="text-blue-600" />
      {isAdmin && <ToggledNavLink title="Permissions" Icon={Person} navigateTo="/bla" history={history} />}
      {isAdmin && <ToggledNavLink title="Logged in Users" Icon={PeopleOutlineIcon} navigateTo="/loggedinusers" history={history} />}
      <ToggledNavLink title="LN Charts" Icon={LNChartsIcon} navigateTo="/historyln" history={history} color="text-blue-600" />
      <ExpandableMenuItem classes={classes} title="Stats Graphs" Icon={GoLiveIcon}>
        <ToggledNavLink title="Logistics" Icon={ApplicationIcon} navigateTo="/team/logistics" history={history} />
        <ToggledNavLink title="Finance" Icon={ApplicationIcon} navigateTo="/team/finance" history={history} />
        <ToggledNavLink title="Tools" Icon={ApplicationIcon} navigateTo="/team/tools" history={history} />
        <ToggledNavLink title="Backlog" Icon={ApplicationIcon} navigateTo="/historyall" history={history} />
        <ToggledNavLink title="Backlog Xpert" Icon={XpertIcon} navigateTo="/historyother" history={history} />
      </ExpandableMenuItem>
      <Divider />
      <ToggledNavLink title="Go Lives" Icon={GoLiveIcon} navigateTo="/golives" history={history} />
      <ToggledNavLink title="Surveys" Icon={SurveysIcon} navigateTo="/surveys" history={history} />
      <ToggledNavLink title="CloudSuites" Icon={ExtensionIcon} navigateTo="/cloudsuites" history={history} />
      {/* <ToggledNavLink
        title="Customer Feedback"
        Icon={FeedbackIcon}
        navigateTo="/feedback"
        history={history}
      /> */}
      <Divider />
      <ToggledNavLink title="Support Cards" Icon={LinkIcon} navigateTo="/supportcard" history={history} />
      {authenticated && (
        <React.Fragment>
          <ToggledNavLink title="Requests SupportCards" Icon={RequestListIcon} navigateTo="/requestlist" history={history} />
          <ToggledNavLink title="Submit Scheduled Training Request" Icon={RequestListIcon} navigateTo="/addplannedcourserequest" history={history} />
          <ToggledNavLink
            title="View Submitted Scheduled Training Requests"
            Icon={RequestListIcon}
            navigateTo="/plannedcourserequestlist"
            history={history}
          />
          {/* <Divider />
          {(isAdmin || isChat) && <ToggledNavLink title="Chat" Icon={ChatIcon} navigateTo="/chat" history={history} />}
          <Divider /> */}
          {authenticated && isAdmin && <ToggledNavLink title="News" Icon={NewsIcon} navigateTo="/news" history={history} />}
          <ToggledNavLink title="NewsPage" Icon={NewsIcon} navigateTo="/newspage" history={history} />
          <Divider />
          <ToggledNavLink title="Courses Dashboard" Icon={NewsIcon} navigateTo="/coursedashboard" history={history} />
          <ToggledNavLink title="Courses" Icon={PageIcon} navigateTo="/courses" history={history} />
          {validRole && <ToggledNavLink title="Students" Icon={PeopleIcon} navigateTo="/students" history={history} />}
          <MenuItem
            onClick={() => {
              // TODO: replace this
              // openSnackbar('Signing out');
              handleLogout();
              history.push("/");
            }}
          >
            Signout
          </MenuItem>
          <ToggledNavLink title="Videos" navigateTo="/videos" history={history} />
        </React.Fragment>
      )}
    </List>
  );
};

interface ExpandableProps {
  title: string;
  Icon: any;
  children: any;
  classes: any;
}

const ExpandableMenuItem: React.FC<ExpandableProps> = ({ title, Icon, children, classes }) => {
  //let initialExpand: any
  const [expanded, toggleExpanded] = useState(false);
  return (
    <ExpansionPanel expanded={expanded} onChange={() => toggleExpanded(!expanded)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <Typography className={classes.secondaryHeading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
