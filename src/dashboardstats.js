import React from "react";

import "./App.css";
//import AppChartCombi from './charts/appchartcombi'
//import AlertWidget from "./alerts/alertwidget";
import AppChartContainer from "./charts/appchartcontainer";
import ChatChartContainer from "./charts/chatchartcontainer";
import HistoryChartContainer from "./charts/historycontainer";
import { StyleLoaderM } from "./common";

const DashBoardStats = ({ data }) => {
  return (
    <div className="row">
      <StyleLoaderM />
      {/*<div className="col s2">
        <AlertWidget />
      </div> */}
      <div className="col s12">
        <div className="row">
          <AppChartContainer
            data={data || ["Tools", "Logistics", "Finance"]}
            title="Support Backlog"
            refreshRate={0}
          />
          <AppChartContainer
            data={data || ["Tools", "Logistics", "Finance"]}
            value="surveyScore"
            title="Survey"
            type="column"
            refreshRate={0}
          />
          <HistoryChartContainer data={data} color="#ffb74d" refreshRate={0} />
          <AppChartContainer
            data={data || ["Tools", "Logistics", "Finance"]}
            value="opened"
            title="Opened"
            color="#b39ddb"
            type="area"
            refreshRate={0}
          />
          <AppChartContainer
            data={data || ["Tools", "Logistics", "Finance"]}
            value="Closed"
            title="Closed"
            color="#ffc600"
            type="area"
            refreshRate={0}
          />
          <ChatChartContainer
            data={data || ["Tools", "Logistics", "Finance"]}
            title="Chats"
            type="column"
            value="percentage"
            color="#9575cd"
            refreshRate={0}
          />
        </div>
      </div>

    </div>
  );
};

export default DashBoardStats;
