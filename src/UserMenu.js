import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router";

function UserMenu({ id, picture, history }) {
  function handleClose() {
    setAnchorEl(null);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <div>
      <div
        onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
        style={{ display: "flex", alignItems: "center", color: "white" }}
      >
        <Avatar src={picture} aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup="true" />
        <MoreVertIcon />
      </div>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            history.push(`/profilepage`);
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push(`/students/${id}`);
            handleClose();
          }}
        >
          My Courses
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(UserMenu);
