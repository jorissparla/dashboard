import React from "react";
import { withRouter } from "react-router";
import { Drawer, MenuItem } from "material-ui";

const SideBarDrawer = () => (
  <Drawer open={true}>
    <MenuItem>Menu Item</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
  </Drawer>
);
class App extends React.Component {
  render() {
    return (
      <div>
        <SideBarDrawer />
      </div>
    );
  }
}

export default App;
