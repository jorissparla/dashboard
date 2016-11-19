import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
import AppNavBar from './appnav';

class App extends Component {
  render() {
    return (
      <div className="App">
      <AppNavBar />
         {this.props.children}
      </div>
    );
  }
}

export default App;
