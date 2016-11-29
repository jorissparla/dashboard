import React, {Component} from 'react';

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
import NewsCardContainer from './news/newscardcontainer';
import AppChartContainer from './charts/appchartcontainer'
import HistoryChartContainer from './charts/historycontainer'
import GoLiveList from './golives/golivelist'



const  DashBoard =() => {
    return (
      <div className="row">
        <div className="col s2">
          <AlertWidget/>
            <GoLiveList />
        </div>
        <div className="col s10">
          <div className="row">
            <NewsCardContainer refreshRate={33000}/>
            <KudoList refreshRate={10000} showNumberKudos={6}/>
          </div>
            <div className="row">
          <AppChartContainer data={['Tools', 'Logistics', 'Finance']} refreshRate={16000}/>
          <HistoryChartContainer refreshRate={16000}/>

              <AppChartCombi
                title="Surveys"
                type="column"
                value="surveyScore"
                color="#9575cd"
                team="Logistics"/>
              <AppChartCombi
                title="Input"
                type="area"
                value="opened"
                color="#ffb300'"
                team="Logistics"/>
              
               
    </div>
        </div>

      </div>

    );
  }
// <AppChartPie data={[1,2,3]} title="Input" type="pie" value="supportBacklog"
// color="#ffb300'" team="Logistics"/>
export default DashBoard;
