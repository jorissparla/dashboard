import React from "react";

import "./App.css";
import SummaryChartContainer from "./charts/SummaryChartContainer";
import styled from "styled-components";
import shortid from "shortid";

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
          id={shortid.generate()}
          team={this.getTeam()}
          title="Support Backlog"
          refreshRate={0}
          type="areaspline"
          color="#555555"
        />
        <SummaryChartContainer
          id={shortid.generate()}
          team={this.getTeam()}
          value="surveyScore"
          title="Survey"
          type="column"
          refreshRate={0}
        />
        <SummaryChartContainer
          id={shortid.generate()}
          team={this.getTeam()}
          value="escalated"
          title="Escalations"
          color="#40a5ed"
          type="area"
          refreshRate={0}
        />

        <SummaryChartContainer
          id={shortid.generate()}
          team={this.getTeam()}
          value="opened"
          title="Opened"
          color="#b39ddb"
          type="area"
          refreshRate={0}
        />
        <SummaryChartContainer
          id={shortid.generate()}
          team={this.getTeam()}
          value="Closed"
          title="Closed"
          color="#ffc600"
          type="area"
          refreshRate={0}
        />
        <SummaryChartContainer
          id={shortid.generate()}
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
// added short id

export default DashBoardStats;
