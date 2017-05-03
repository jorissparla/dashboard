import React from "react";

import "./App.css";
import AppChartCombi from "./charts/appchartcombi";
import KudoList from "./kudos/kudolist1";
import KudoListComponent from "./kudos/kudolistcomponent";
import KudoListComponentNew from "./kudos/kudolistcomponentnew";
//import AlertWidget from './alerts/alertwidget'
import NewsCardContainer from "./news/newscardcontainer";
import AppChartContainer from "./charts/appchartcontainer";
import HistoryChartContainer from "./charts/historycontainer";
import GoLiveList from "./golives/golivelist";
import GoLiveListSide from "./golives/golivelistside";
import { StyleLoaderM } from "./common";

const DashBoard = () => {
  return (
    <div className="row">
      <StyleLoaderM />
      <div className="col s3">
        <GoLiveListSide nrItems={10} />
      </div>
      <div className="col s9">
        <div className="row">
          <NewsCardContainer refreshRate={30000} />
          <KudoListComponentNew refreshRate={10000} showNumberKudos={4} />
        </div>
        <div />
      </div>
    </div>
  );
};

export default DashBoard;
