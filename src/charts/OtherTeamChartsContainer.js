import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, useQuery } from 'react-apollo';
import HistoryChart from './historychart';
import styled from 'styled-components';
import Spinner from 'utils/spinner';
import { format } from 'utils/format';

const Flexdiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* height: 800px; */
  width: 100vw;
`;
const Contdiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* width: 1000px; */
  height: 80%;
`;

const transform = (data, value) =>
  data.map(({ date, number }) => ({
    date: format(parseInt(date), 'DD'),
    odate: format(parseInt(date), 'YYYYMMDD'),
    [value]: number,
    label: number,
    data: { y: number, color: 'rgba(144, 202, 249, 0.75)' }
  }));

const OtherTeamChartsContainer = ({ color = '#ffb74d' }) => {
  const { data, loading } = useQuery(QUERY_HISTORY_OTHER);

  if (loading) return <Spinner />;
  console.log(data);
  if (!data) return <div>No data</div>;
  const historyXpert = transform(data.Xpert, 'xpert').filter(o => o.odate > '20191001');
  console.log(historyXpert.filter(o => o.odate > '20190930'));
  const historyAuto = transform(data.AutoConnect, 'auto');
  const historyPLM = transform(data.PLM, 'plm');
  // return <div>Data</div>;
  return (
    <Flexdiv>
      <Contdiv>
        <HistoryChart
          data={historyXpert}
          title={`Backlog Xpert (excl. Sol.Proposed)`}
          type="area"
          color={color}
          xvalue="date"
          value={`xpert`}
        />
      </Contdiv>
      <Contdiv>
        <HistoryChart
          data={historyAuto}
          title={`Backlog AutoConnect (excl. Sol.Proposed)`}
          type="area"
          color={color}
          xvalue="date"
          value={`auto`}
        />
      </Contdiv>
      {/* <Contdiv>
        <HistoryChart
          data={historyPLM}
          title={`Backlog PLM (excl. Sol.Proposed)`}
          type="area"
          color={color}
          xvalue="date"
          value={`plm`}
        />
      </Contdiv> */}
    </Flexdiv>
  );
};

const QUERY_HISTORY_OTHER = gql`
  {
    Xpert: backlogHistory(ownergroup: "Xpert Support") {
      date
      number
    }
    AutoConnect: backlogHistory(ownergroup: "AutoConnect Support") {
      date
      number
    }
    PLM: backlogHistory(ownergroup: "PLM Support") {
      date
      number
    }
  }
`;

export default OtherTeamChartsContainer;
// export default connect(mapStateToProps, { fetchHistoryDay })(HistoryDayAll1);
