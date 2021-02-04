import { Accordion, AccordionDetails, AccordionSummary, List, ListItemIcon } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import AutoExchange from "@material-ui/icons/AirportShuttle";
import LNChartsIcon from "@material-ui/icons/AssessmentTwoTone";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import XpertIcon from "@material-ui/icons/Commute";
import CodeIcon from "@material-ui/icons/DeveloperMode";
import SymptomsIcon from "@material-ui/icons/ErrorOutline";
import NewsIcon from "@material-ui/icons/Event";
import MyWorkList from "@material-ui/icons/EventNote";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExtensionIcon from "@material-ui/icons/ExtensionTwoTone";
import GoLiveIcon from "@material-ui/icons/FlightTakeoff";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ActionHome from "@material-ui/icons/Home";
import ApplicationIcon from "@material-ui/icons/Launch";
// import LinkIcon from "@material-ui/icons/Link";
import PageIcon from "@material-ui/icons/Pages";
import PeopleIcon from "@material-ui/icons/People";
import Person from "@material-ui/icons/PeopleOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import RequestListIcon from "@material-ui/icons/PlaylistAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import LinkIcon from "@material-ui/icons/SpeakerNotesTwoTone";
import SurveysIcon from "@material-ui/icons/Whatshot";
import { signOut } from "auth/msAuth";
import { UserContext } from "globalState/UserProvider";
import React, { useState } from "react";
// import Signout from '../Signout';
import { NavLink } from "./NavLink";

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

  const Divider = () => <hr className="border-t-1  bg-grey-200" />;
  return (
    <List>
      <ToggledNavLink title="Home" Icon={ActionHome} navigateTo="/" history={history} color="bg-gray-100 text-gray-600" />
      {/* <ToggledNavLink title="Cloud Information Page" Icon={CloudQueueIcon} navigateTo="/cloudinformation" history={history} /> */}
      <ToggledNavLink title="MaintenanceWizard" Icon={SettingsIcon} navigateTo="/maintenancewizard" history={history} />
      <ToggledNavLink title="MaintenanceWizard AutoExchange" Icon={AutoExchange} navigateTo="/maintenancewizardauto" history={history} />
      <Divider />
      <ToggledNavLink title="MultiTenant Customers" Icon={ExtensionIcon} navigateTo="/tenant" history={history} color="text-orange-600" />
      <ToggledNavLink title="Support Cards" Icon={LinkIcon} navigateTo="/supportcard" history={history} color="text-purp" />
      <Divider />
      <ToggledNavLink title="Development SLO" Icon={CodeIcon} navigateTo="/whatdoesdev" history={history} color="text-gray-700" />

      <Divider />
      {/* <ExpandableMenuItem classes={classes} title="Symptoms" Icon={SymptomsIcon} isExpanded={true}> */}
      <ToggledNavLink title="Symptom Definitions" navigateTo="/symptomcategories" history={history} Icon={SymptomsIcon} color="text-teal-600" />
      <ToggledNavLink title="KBs linked to Symptoms" navigateTo="/symptomkbs" history={history} Icon={SymptomsIcon} color="text-teal-700" />
      <ToggledNavLink title="Request Symptoms" navigateTo="/symptoms" history={history} Icon={SymptomsIcon} color="text-teal-800" />
      {/* </ExpandableMenuItem> */}
      <Divider />
      {authenticated && <ToggledNavLink title="My KBPage" Icon={HelpOutlineIcon} navigateTo="/kbpage" history={history} />}

      {authenticated && <ToggledNavLink title="Essential WorkList" Icon={MyWorkList} navigateTo="/essentialworklist" history={history} />}

      {authenticated && !isAdmin && <ToggledNavLink title="Worklist" Icon={MyWorkList} navigateTo="/mywork" history={history} />}
      {isAdmin && <ToggledNavLink title="Admin WorkList" Icon={MyWorkList} navigateTo="/mywork" history={history} />}
      <Divider />
      <ToggledNavLink title="Proactive Projects!" Icon={BusinessCenterIcon} navigateTo="/projects" history={history} color="text-blue-800" />
      {isAdmin && <ToggledNavLink title="Permissions" Icon={Person} navigateTo="/userpermissions" history={history} />}
      {isAdmin && <ToggledNavLink title="Logged in Users" Icon={PeopleOutlineIcon} navigateTo="/loggedinusers" history={history} />}
      <ToggledNavLink title="LN Charts" Icon={LNChartsIcon} navigateTo="/historyln" history={history} color="text-blue-800" />
      <ExpandableMenuItem classes={classes} title="Stats Graphs" Icon={GoLiveIcon}>
        <ToggledNavLink title="Logistics" Icon={ApplicationIcon} navigateTo="/team/logistics" history={history} />
        <ToggledNavLink title="Finance" Icon={ApplicationIcon} navigateTo="/team/finance" history={history} />
        <ToggledNavLink title="Tools" Icon={ApplicationIcon} navigateTo="/team/tools" history={history} />
        <ToggledNavLink title="Backlog" Icon={ApplicationIcon} navigateTo="/historyall" history={history} />
        <ToggledNavLink title="Backlog LN " Icon={ApplicationIcon} navigateTo="/historyln" history={history} />
        <ToggledNavLink title="Backlog Xpert" Icon={XpertIcon} navigateTo="/historyother" history={history} />
      </ExpandableMenuItem>
      <hr className="border-t-1  bg-grey-200" />
      <ToggledNavLink title="Go Lives" Icon={GoLiveIcon} navigateTo="/golives" history={history} />
      <ToggledNavLink title="Surveys" Icon={SurveysIcon} navigateTo="/surveys" history={history} />
      {/* <ToggledNavLink title="CloudSuites" Icon={ExtensionIcon} navigateTo="/cloudsuites" history={history} /> */}
      {/* <ToggledNavLink
        title="Customer Feedback"
        Icon={FeedbackIcon}
        navigateTo="/feedback"
        history={history}
      /> */}
      <hr className="border-t-1  bg-grey-200" />

      {authenticated && (
        <React.Fragment>
          <ToggledNavLink title="Requests SupportCards" Icon={RequestListIcon} navigateTo="/requestlist" history={history} />

          {/* <Divider />
          {(isAdmin || isChat) && <ToggledNavLink title="Chat" Icon={ChatIcon} navigateTo="/chat" history={history} />}
          <Divider /> */}
          {authenticated && isAdmin && <ToggledNavLink title="News" Icon={NewsIcon} navigateTo="/news" history={history} />}
          <ToggledNavLink title="NewsPage" Icon={NewsIcon} navigateTo="/newspage" history={history} />
          <Divider />
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
  isExpanded?: boolean;
}

const ExpandableMenuItem: React.FC<ExpandableProps> = ({ title, Icon, children, classes, isExpanded = false }) => {
  //let initialExpand: any
  const [expanded, toggleExpanded] = useState(isExpanded);
  return (
    <Accordion expanded={expanded} onChange={() => toggleExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <div className="font-sans text-xs font-semibold text-gray-600">{title}</div>
      </AccordionSummary>
      <AccordionDetails className={classes.panelDetails}>{children}</AccordionDetails>
    </Accordion>
  );
};
