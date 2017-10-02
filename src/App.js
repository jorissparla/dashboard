import React from "react";
import { withRouter } from "react-router";
//import "./App.css";
import Header from "./appnav";
class App extends React.Component {
  render() {
    return <Header>{this.props.children}</Header>;
  }
}

export default App;
