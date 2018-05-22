import React from "react";

import "./App.css";
//import AppChartCombi from './charts/appchartcombi'
import SummaryChartContainer from "./charts/SummaryChartContainer";
//import ChatGraphContainer from "./charts/ChatGraphContainer";
//import HistoryChartContainer from "./charts/HistoryChartContainer";
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
  state = { index: 0, team: "Logistics" };
  teams = ["Logistics", "Finance", "Tools"];

  myTimer = () => {
    let newIndex;
    if (this.state.index === 2) {
      newIndex = 0;
    } else {
      newIndex = this.state.index + 1;
    }
    this.setState({ index: newIndex, team: this.teams[this.state.index] });
  };
  componentWillMount() {
    // this.timerhandle = setInterval(this.myTimer, 45000);
  }

  getTeam = () => {
    const team = this.props.match ? this.props.match.params.team : this.props.team;
    //console.log(` RETURNS TEAM: ${team} , PROPS:  ${this.props.team}, PARAMS: ${this.props.match}`);
    return team;
  };
  render() {
    //const { data, team } = this.props;

    return (
      <Row>
        <SummaryChartContainer
          team={this.getTeam()}
          title="Support Backlog"
          refreshRate={0}
          type="areaspline"
          color="#555555"
        />
        <SummaryChartContainer
          team={this.getTeam()}
          value="surveyScore"
          title="Survey"
          type="column"
          refreshRate={0}
        />
        <SummaryChartContainer
          team={this.getTeam()}
          value="escalated"
          title="Escalations"
          color="#40a5ed"
          type="area"
          refreshRate={0}
        />

        <SummaryChartContainer
          team={this.getTeam()}
          value="opened"
          title="Opened"
          color="#b39ddb"
          type="area"
          refreshRate={0}
        />
        <SummaryChartContainer
          team={this.getTeam()}
          value="Closed"
          title="Closed"
          color="#ffc600"
          type="area"
          refreshRate={0}
        />
        <SummaryChartContainer
          team={this.getTeam()}
          value="chatpct"
          title="Chat %"
          color="#ffc600"
          type="column"
          refreshRate={0}
        />
      </Row>
    );
  }
}

export default DashBoardStats;
