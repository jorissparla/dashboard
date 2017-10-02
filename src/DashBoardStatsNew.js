import React from "react";

import "./App.css";
//import AppChartCombi from './charts/appchartcombi'
//import AlertWidget from "./alerts/alertwidget";
import SummaryChartContainer from "./charts/SummaryChartContainer";
import ChatGraphContainer from "./charts/ChatGraphContainer";
import HistoryChartContainer from "./charts/HistoryChartContainer";
//import { StyleLoaderM } from "./common";
import styled from "styled-components";

const Row = styled.div`
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: space-between;
`;

class DashBoardStats extends React.Component {
  state = { index: 0 };
  teams = ["Logistics", "Finance", "Tools"];

  myTimer = () => {
    let newIndex;
    if (this.state.index === 2) {
      newIndex = 0;
    } else {
      newIndex = this.state.index + 1;
    }
    this.setState({ index: newIndex });
  };
  componentWillMount() {
    this.timerhandle = setInterval(this.myTimer, 45000);
  }
  render() {
    const { data } = this.props;
    return (
      <Row>
        <SummaryChartContainer
          team={this.teams[this.state.index]}
          title="Support Backlog"
          refreshRate={0}
          type="areaspline"
          color="#555555"
        />
        <SummaryChartContainer
          team={this.teams[this.state.index]}
          value="surveyScore"
          title="Survey"
          type="column"
          refreshRate={0}
        />
        <HistoryChartContainer
          team={this.teams[this.state.index]}
          value="backlog"
          data={data}
          title="Backlog"
          color="#ffb74d"
          type="area"
          refreshRate={0}
        />

        <SummaryChartContainer
          team={this.teams[this.state.index]}
          value="opened"
          title="Opened"
          color="#b39ddb"
          type="area"
          refreshRate={0}
        />
        <SummaryChartContainer
          team={this.teams[this.state.index]}
          value="Closed"
          title="Closed"
          color="#ffc600"
          type="area"
          refreshRate={0}
        />
        <ChatGraphContainer
          team={this.teams[this.state.index]}
          data={data || ["Tools", "Logistics", "Finance"]}
          title="Chats"
          type="column"
          value="percentage"
          color="#9575cd"
          refreshRate={0}
        />
      </Row>
    );
  }
}

export default DashBoardStats;
