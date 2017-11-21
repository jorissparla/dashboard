import React from "react";
import { withRouter } from "react-router";
//import "./App.css";
import Header from "./appnav";
import { AppBar, Drawer, MenuItem } from "material-ui";

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
        {/*<Header>{this.props.children}</Header>*/}
      </div>
    );
  }
}

export default App;
