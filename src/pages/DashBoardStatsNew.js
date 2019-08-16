import React from 'react';

import '../App.css';
import SummaryChartContainer from '../charts/SummaryChartContainer';
import styled from 'styled-components';
import shortid from 'shortid';

const Row = styled.div`
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: space-between;
`;

const DashBoardStats = props => {
  const teams = ['Logistics', 'Finance', 'Tools'];

  const team = props.match ? props.match.params.team : props.team;
  //console.log(` RETURNS TEAM: ${team} , PROPS:  ${props.team}, PARAMS: ${props.match}`);
  //const { data, team } = props;
  console.log('Rendering');
  return (
    <Row>
      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="newbacklog"
        title="Support Backlog (excl. Solution Proposed)"
        refreshRate={0}
        type="areaspline"
        color="#555555"
      />
      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="surveyScore"
        title="Survey"
        type="column"
        refreshRate={0}
      />
      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="escalated"
        title="Escalations"
        color="#40a5ed"
        type="area"
        refreshRate={0}
      />

      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="opened"
        title="Opened"
        color="#b39ddb"
        type="area"
        refreshRate={0}
      />
      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="Closed"
        title="Closed"
        color="#ffc600"
        type="area"
        refreshRate={0}
      />
      <SummaryChartContainer
        id={shortid.generate()}
        team={team}
        value="chatpct"
        title="Chat %"
        color="#ffc600"
        type="column"
        refreshRate={0}
      />
    </Row>
  );
};
// added short id

export default DashBoardStats;
