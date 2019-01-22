import React from 'react';

import '../App.css';
import AppChartContainer from '../charts/appchartcontainer';
import ChatChartContainer from '../charts/chatchartcontainer';
import HistoryChartContainer from '../charts/historycontainer';
import { StyleLoaderM } from '../common';

const DashBoardStats = props => {
  let { data1 = [], region } = props;
  console.log('DashBoardStats', props);
  const team = props.match ? props.match.params.team || '' : '';
  if (!region) {
    region = props.match ? props.match.params.region || 'EMEA' : 'EMEA';
  }
  if (team) {
    data1.push(team);
  }
  return (
    <div className="row">
      <StyleLoaderM />
      <div className="col s12">
        <div className="row">
          <AppChartContainer
            data={data1 || ['Tools', 'Logistics', 'Finance']}
            title="Support Backlog"
            roepie={region}
            refreshRate={0}
            region={region}
            type="spline"
          />
          <AppChartContainer
            data={data1 || ['Tools', 'Logistics', 'Finance']}
            value="surveyScore"
            title="Survey"
            type="column"
            refreshRate={0}
            region={region}
          />
          <HistoryChartContainer data={data1} color="#ffb74d" refreshRate={0} region={region} />
          <AppChartContainer
            data={data1 || ['Tools', 'Logistics', 'Finance']}
            value="opened"
            title="Opened"
            color="#b39ddb"
            type="area"
            refreshRate={0}
            region={region}
          />
          <AppChartContainer
            data={data1 || ['Tools', 'Logistics', 'Finance']}
            value="Closed"
            title="Closed"
            color="#ffc600"
            type="area"
            refreshRate={0}
            region={region}
          />
          <ChatChartContainer
            data={data1 || ['Tools', 'Logistics', 'Finance']}
            title="Chats"
            type="column"
            value="percentage"
            color="#9575cd"
            refreshRate={0}
            region={region}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardStats;
