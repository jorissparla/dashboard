import React from "react";

import "./App.css";
import Header from "./appnav";
const { arrayOf, object } = React.PropTypes;
const App = React.createClass({
  propTypes: {
    children: object
  },
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
      </div>
    );
  }
});

export default App;
