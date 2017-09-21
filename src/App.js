import React from "react";

import "./App.css";
import Header from "./appnav";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
