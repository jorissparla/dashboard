import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

interface NavLinkProps {
  title: string;
  Icon: any;
  navigateTo: string;
  history: any;
  toggleMenu: () => null;
}

export const NavLink: React.FC<NavLinkProps> = ({ title, Icon, navigateTo, history, toggleMenu }) => (
  <MenuItem
    onClick={() => {
      // toggleMenu();
      -setTimeout(() => {
        toggleMenu();
        history.push(navigateTo);
      }, 500);
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
