import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
import AppCard from './appcard';
import AppNavBar from './appnav';
import AppList from './applist'
import AppChart from './appchart'
import AppChartCombi from './appchartcombi'
import AppChartPie from './appchartpie'

class DashBoard extends Component {
  render() {
    return (
        <div>
        <div className="row">
        
            <AppCard index={0}/>
            <AppCard index={1}/>
            <AppCard />
          </div>
          <div className="row">
            <AppChartCombi data={[1,2,3]} title="Backlog" type="line" value="supportBacklog" team="Logistics"/>
            <AppChartCombi data={[1,2,3]} title="Surveys" type="column" value="surveyScore"  color="#9575cd" team="Logistics"/>
            <AppChartCombi data={[1,2,3]} title="Input" type="area" value="opened"  color="#ffb300'" team="Logistics"/>
            <AppChartPie data={[1,2,3]} title="Input" type="pie" value="supportBacklog"  color="#ffb300'" team="Logistics"/>
            <AppList />


          </div>
          </div>

    );
  }
}

export default DashBoard;
