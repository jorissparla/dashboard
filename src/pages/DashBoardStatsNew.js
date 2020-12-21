// @ts-nocheck
import React from "react";
import shortid from "shortid";
import styled from "styled-components";
import "../App.css";
import SummaryChartContainer from "../charts/SummaryChartContainer";
import TestChart from "./testchart";

const DashBoardStats = (props) => {
  // const teams = ['Logistics', 'Finance', 'Tools'];

  const team = props.match ? props.match.params.team : props.team;

  return (
    <div className="m-1 flex h-screen flex-wrap ">
      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="newbacklog"
        title="Support Backlog (excl. Solution Proposed)"
        refreshRate={0}
        type="areaspline"
        color="#555555"
      />
      <SummaryChartContainer id={shortid.generate()} team={team} value="surveyScore" title="Survey" type="column" refreshRate={0} />
      <SummaryChartContainer id={shortid.generate()} team={team} value="escalated" title="Escalations" color="#40a5ed" type="area" refreshRate={0} />

      <SummaryChartContainer id={shortid.generate()} team={team} value="opened" title="Opened" color="#b39ddb" type="area" refreshRate={0} />
      <SummaryChartContainer id={shortid.generate()} team={team} value="Closed" title="Closed" color="#ffc600" type="area" refreshRate={0} />
      {/* <SummaryChartContainer id={shortid.generate()} team={team} value="chatpct" title="Chat %" color="#ffc600" type="column" refreshRate={0} /> */}
      <TestChart />
    </div>
  );
};
// added short id

export default DashBoardStats;
