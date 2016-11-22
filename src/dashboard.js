import React, { Component } from 'react';

import './App.css';
import AppCard from './appcard';
import AppCardContainer from './appcardcontainer';
import AppList from './applist'
import AppChartCombi from './charts/appchartcombi'
import AppChart from './charts/appchart'
import AppChartPie from './charts/appchartpie'
import KudoList from './kudos/kudolist'
import AlertWidget from './alerts/alertwidget'
import Load from './load';

class DashBoard extends Component {
  render() {
    console.log('DASHBOARD',this.props.params.id)
    return (
        <div className="row">
          <div className="col s2">  
            <AppList/>
          </div>
          <div className="col s9">
          <div className="row">
              <AppCard index={0}/>
              <AppCard index={3}/>
              <KudoList />
            </div>
            <div className="row">
              <AppChart data={[1,2,3]} title="Backlog" type="line" value="supportBacklog" team="Logistics"/>
              <AppChartCombi data={[1,2,3]} title="Surveys" type="column" value="surveyScore"  color="#9575cd" team="Logistics"/>
              <AppChartCombi data={[1,2,3]} title="Input" type="area" value="opened"  color="#ffb300'" team="Logistics"/>
              


            </div>
            </div>
          </div>
          
    );
  }
}
// <AppChartPie data={[1,2,3]} title="Input" type="pie" value="supportBacklog"  color="#ffb300'" team="Logistics"/>
export default DashBoard;
