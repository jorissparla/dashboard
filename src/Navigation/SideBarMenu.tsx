import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItemIcon
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import NewsIcon from '@material-ui/icons/Event';
import MyWorkList from '@material-ui/icons/EventNote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExtensionIcon from '@material-ui/icons/Extension';
import FeedbackIcon from '@material-ui/icons/Feedback';
import GoLiveIcon from '@material-ui/icons/FlightTakeoff';
import ActionHome from '@material-ui/icons/Home';
import ApplicationIcon from '@material-ui/icons/Launch';
import LinkIcon from '@material-ui/icons/Link';
import PageIcon from '@material-ui/icons/Pages';
import PeopleIcon from '@material-ui/icons/People';
import Person from '@material-ui/icons/PeopleOutline';
import SurveysIcon from '@material-ui/icons/Whatshot';
import RequestListIcon from '@material-ui/icons/PlaylistAdd';
import React, { useState } from 'react';
import Signout from '../Signout';
import { NavLink } from './NavLink';

interface Props {
  classes: any;
  history: any;
  authenticated?: boolean;
  user: any;
  toggleMenu: () => void;
}

export const SideBarMenu: React.FC<Props> = ({ classes, history, user, toggleMenu }) => {
  let validRole = false;
  let isChat = false;

  let isAdmin = false;
  let authenticated = false;
  if (user) {
    authenticated = true;
    validRole = user.role !== 'Guest';
    isAdmin = user.role === 'Admin';
    isChat = user.role === 'Chat';
  }
  // const ToggledNavLink = this.ToggledNavLink;
  function ToggledNavLink(props: any) {
    return <NavLink {...props} toggleMenu={toggleMenu} history={history} />;
  }
  return (
    <List>
      <ToggledNavLink title="Home" Icon={ActionHome} navigateTo="/" history={history} />
      <ToggledNavLink title="Surveys" Icon={SurveysIcon} navigateTo="/surveys" history={history} />
      {authenticated && (
        <ToggledNavLink title="WorkList" Icon={MyWorkList} navigateTo="/mywork" history={history} />
      )}
      {isAdmin && (
        <ToggledNavLink title="Permissions" Icon={Person} navigateTo="/bla" history={history} />
      )}
      <ExpandableMenuItem classes={classes} title="Stats Graphs" Icon={GoLiveIcon}>
        <ToggledNavLink
          title="Logistics"
          Icon={ApplicationIcon}
          navigateTo="/team/logistics"
          history={history}
        />
        <ToggledNavLink
          title="Finance"
          Icon={ApplicationIcon}
          navigateTo="/team/finance"
          history={history}
        />
        <ToggledNavLink
          title="Tools"
          Icon={ApplicationIcon}
          navigateTo="/team/tools"
          history={history}
        />
        <ToggledNavLink
          title="Backlog"
          Icon={ApplicationIcon}
          navigateTo="/historyall"
          history={history}
        />
      </ExpandableMenuItem>
      <Divider />
      <ExpandableMenuItem classes={classes} title="Go Lives" Icon={GoLiveIcon}>
        <ToggledNavLink
          title="Go Lives"
          Icon={GoLiveIcon}
          navigateTo="/golives"
          history={history}
        />
      </ExpandableMenuItem>
      <ToggledNavLink
        title="MT Customers"
        Icon={ExtensionIcon}
        navigateTo="/tenant"
        history={history}
      />
      <ToggledNavLink
        title="Customer Feedback"
        Icon={FeedbackIcon}
        navigateTo="/feedback"
        history={history}
      />
      <Divider />
      <ToggledNavLink
        title="Support Cards"
        Icon={LinkIcon}
        navigateTo="/supportcard"
        history={history}
      />
      {authenticated && (
        <React.Fragment>
          <ToggledNavLink
            title="Requests SupportCards"
            Icon={RequestListIcon}
            navigateTo="/requestlist"
            history={history}
          />
          <ToggledNavLink
            title="Submit Scheduled Training Request"
            Icon={RequestListIcon}
            navigateTo="/addplannedcourserequest"
            history={history}
          />
          <ToggledNavLink
            title="View Submitted Scheduled Training Requests"
            Icon={RequestListIcon}
            navigateTo="/plannedcourserequestlist"
            history={history}
          />
          <Divider />
          {(isAdmin || isChat) && (
            <ToggledNavLink title="Chat" Icon={ChatIcon} navigateTo="/chat" history={history} />
          )}
          <Divider />
          {authenticated && isAdmin && (
            <ToggledNavLink title="News" Icon={NewsIcon} navigateTo="/news" history={history} />
          )}
          <Divider />
          <ToggledNavLink
            title="Courses Dashboard"
            Icon={NewsIcon}
            navigateTo="/coursedashboard"
            history={history}
          />
          <ToggledNavLink title="Courses" Icon={PageIcon} navigateTo="/courses" history={history} />
          {validRole && (
            <ToggledNavLink
              title="Students"
              Icon={PeopleIcon}
              navigateTo="/students"
              history={history}
            />
          )}
          <Signout>
            {(signout: any) => {
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
