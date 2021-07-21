import { Accordion, AccordionDetails, AccordionSummary, List, ListItemIcon } from "@material-ui/core";
import { CloseIcon, SumoIcon } from "elements/Icons";
import React, { useState } from "react";

import ActionHome from "@material-ui/icons/Home";
import ApplicationIcon from "@material-ui/icons/Launch";
import AutoExchange from "@material-ui/icons/AirportShuttle";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { ChartBarIcon } from "@heroicons/react/outline";
import CodeIcon from "@material-ui/icons/DeveloperMode";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExtensionIcon from "@material-ui/icons/ExtensionTwoTone";
import GoLiveIcon from "@material-ui/icons/FlightTakeoff";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import LNChartsIcon from "@material-ui/icons/AssessmentTwoTone";
import LinkIcon from "@material-ui/icons/SpeakerNotesTwoTone";
import MenuItem from "@material-ui/core/MenuItem";
import MyWorkList from "@material-ui/icons/EventNote";
import { NavLink } from "./NavLink";
import NewsIcon from "@material-ui/icons/Event";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Person from "@material-ui/icons/PeopleOutline";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import RequestListIcon from "@material-ui/icons/PlaylistAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import SurveysIcon from "@material-ui/icons/Whatshot";
import SymptomsIcon from "@material-ui/icons/ErrorOutline";
import TWButton from "elements/TWButton";
import TWFileUpload from "common/FileUploaderNew";
import { UserContext } from "globalState/UserProvider";
import XpertIcon from "@material-ui/icons/Commute";
import { hasPermission } from "utils/hasPermission";
import { signOut } from "auth/msAuth";

// import Signout from '../Signout';

interface ISideBarProps {
  classes: any;
  history: any;
  authenticated?: boolean;
  toggleMenu: () => void;
  open: boolean;
}

export function SideBarMenu({ classes, history, toggleMenu, open }: ISideBarProps) {
  const { user, logout } = React.useContext(UserContext);
  const [showSideMenu, setShowSideMenu] = useState(false);

  let isAdmin = false;
  let isSuperUser = false;
  let authenticated = false;
  if (user) {
    authenticated = true;
    isAdmin = user.role === "Admin";
    isSuperUser = user.role === "PO";
    isSuperUser = isSuperUser || hasPermission(user.permissions, ["PO", "ADMIN", "FILEUPLOAD"]);
  }
  async function handleLogout() {
    logout();
    signOut();
  }
  // const ToggledNavLink = this.ToggledNavLink;
  function ToggledNavLink(props: any) {
    return <NavLink {...props} toggleMenu={toggleMenu} history={history} open={open} color={props?.color} />;
  }
  isSuperUser = isAdmin || isSuperUser;
  console.log(`isSuperUser`, isSuperUser, isAdmin);
  const Divider = () => <hr className="border-t-1  bg-grey-200" />;
  return (
    <div>
      <List>
        <ToggledNavLink title="Home" Icon={ActionHome} navigateTo="/" history={history} color="bg-gray-100 text-gray-600" />
        {/* <ToggledNavLink title="Cloud Information Page" Icon={CloudQueueIcon} navigateTo="/cloudinformation" history={history} /> */}
        <ToggledNavLink title="MaintenanceWizard" Icon={SettingsIcon} navigateTo="/maintenance" history={history} />
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
        <ToggledNavLink title="Sumo Proactive" Icon={SumoIcon} navigateTo="/sumo" history={history} color="text-blue-800" />

        <ToggledNavLink title="Proactive Projects!" Icon={BusinessCenterIcon} navigateTo="/projects" history={history} color="text-blue-800" />
        {isAdmin && <ToggledNavLink title="Permissions" Icon={Person} navigateTo="/userpermissions" history={history} />}
        {isAdmin && <ToggledNavLink title="Logged in Users" Icon={PeopleOutlineIcon} navigateTo="/loggedinusers" history={history} />}
        <ExpandableMenuItem classes={classes} title="Stats Graphs" Icon={GoLiveIcon}>
          <ToggledNavLink title="Backlog LN APJ " Icon={LNChartsIcon} navigateTo="/historyln/APJ" history={history} />
          <ToggledNavLink title="Backlog LN EMEA" Icon={LNChartsIcon} navigateTo="/historyln/EMEA" history={history} />
          <ToggledNavLink title="Backlog LN LA" Icon={LNChartsIcon} navigateTo="/historyln/LA" history={history} />
          <ToggledNavLink title="Backlog LN NA" Icon={LNChartsIcon} navigateTo="/historyln/NA" history={history} />
          <ToggledNavLink title="Backlog LN All" Icon={LNChartsIcon} navigateTo="/historyln/All" history={history} />
          <ToggledNavLink title="Backlog Xpert" Icon={XpertIcon} navigateTo="/historyother" history={history} />
        </ExpandableMenuItem>
        <hr className="border-t-1  bg-grey-200" />
        <ToggledNavLink title="Backlog List" Icon={ApplicationIcon} navigateTo="/products/all" history={history} />
        <ToggledNavLink title="Go Lives" Icon={GoLiveIcon} navigateTo="/golives" history={history} />
        <ToggledNavLink title="Surveys" Icon={SurveysIcon} navigateTo="/surveys" history={history} />
        <ToggledNavLink title="Priority Dashboard" Icon={PriorityHighIcon} navigateTo="/priority" history={history} />
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
            {/* <ToggledNavLink title="Videos" navigateTo="/videos" history={history} /> */}
            {isSuperUser && (
              <TWButton color="transp" onClick={() => setShowSideMenu(!showSideMenu)}>
                Upload Files
              </TWButton>
            )}
          </React.Fragment>
        )}
      </List>
      {showSideMenu && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-y-0 right-0  z-50 outline-none focus:outline-none ">
            <div className="relative  my-6  w-96 bg-white shadow-xl p-2 rounded h-screen">
              <div className="flex justify-between items-center ml-2 mt-4">
                <TWButton onClick={() => setShowSideMenu(!showSideMenu)} color="transp">
                  <CloseIcon />
                  Close
                </TWButton>
              </div>
              <div className="min-w-128">
                <TWFileUpload showLink={true} />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}

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
