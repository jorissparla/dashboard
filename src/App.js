import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import AppCard from './appcard';
import AppNavBar from './appnav';
import AppList from './applist'
import AppChart from './appchart'

class App extends Component {
  render() {
    return (
      <div className="App">
      <AppNavBar />
        <div className="row">
                  <AppCard />
          <AppCard />
          <AppCard />
          </div>
          <div className="row">
          <AppChart />
          <AppList />

          </div>
      </div>
    );
  }
}

export default App;
