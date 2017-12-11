import React from "react";

import "./App.css";
import KudoListComponentNew from "./kudos/kudolistcomponentnew";
//import AlertWidget from './alerts/alertwidget'
import NewsCardContainer from "./news/NewsContainer";
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
          <KudoListComponentNew />
        </div>
        <div />
      </div>
    </div>
  );
};

export default DashBoard;
