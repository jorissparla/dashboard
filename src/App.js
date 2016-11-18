import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
import AppCard from './appcard';
import AppNavBar from './appnav';
import AppList from './applist'
import AppChart from './appchart'
import AppChartCombi from './appchartcombi'
import AppChartPie from './appchartpie'
import NewsList from './newslist'

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
