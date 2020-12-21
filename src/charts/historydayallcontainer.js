import { gql, useQuery } from "@apollo/client";
import React from "react";
import Spinner from "utils/spinner";
import HistoryChart from "./historychart";

export default function HistoryDayAllContainer(props) {
  const color = props.color || "#ffb74d";
  const { data, loading } = useQuery(QUERY_HISTORY_DAY);
  if (loading) return <Spinner />;

  if (!data) return <div>No data</div>;
  const history = data.historyday;
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-screen pb-4">
      <HistoryChart data={history} title={`Backlog LN (excl. Sol.Proposed)`} type="area" color={color} xvalue="day" value={`LN`} />
      <HistoryChart data={history} title={`Backlog Logistics (excl. Sol.Proposed)`} type="area" color={color} xvalue="day" value={`Logistics`} />
      <HistoryChart data={history} title={`Backlog Finance (excl. Sol.Proposed)`} type="area" color={color} xvalue="day" value={`Finance`} />

      <HistoryChart data={history} title={`Backlog Tools (excl. Sol.Proposed)`} type="area" color={color} xvalue="day" value={`Tools`} />
    </div>
  );
}

const QUERY_HISTORY_DAY = gql`
  query QUERY_HISTORY_DAY {
    historyday {
      id
      day
      month
      LN
      Tools
      Finance
      Logistics
    }
  }
`;
// export default connect(mapStateToProps, { fetchHistoryDay })(HistoryDayAll1);
