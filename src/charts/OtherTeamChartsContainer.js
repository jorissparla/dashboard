import { Grid } from "@material-ui/core";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/client";
import { format } from "utils/format";
import Spinner from "utils/spinner";
import HistoryChart from "./historychart";

const transform = (data, value) =>
  data.map(({ date, number }) => ({
    date: format(new Date(date), "dd"),
    odate: format(new Date(date), "yyyyMMdd"),
    [value]: number,
    label: number,
    data: { y: number, color: "rgba(144, 202, 249, 0.75)" },
  }));
const transform2 = (data, value) =>
  data.map(({ date, number, age }) => ({
    date: format(new Date(date), "dd"),
    odate: format(new Date(date), "yyyyMMdd"),
    [value]: age,
    label: age,
    data: { y: number, color: "rgba(144, 202, 249, 0.75)" },
  }));

const OtherTeamChartsContainer = ({ color = "#ffb74d" }) => {
  console.log("loading");
  const { data, loading } = useQuery(QUERY_HISTORY_OTHER);

  if (loading) return <Spinner />;

  const { AutoConnect } = data;
  let filteredAutoConnect = AutoConnect.filter((item) => item.owner_region === "EMEA");

  if (!data) return <div>No data</div>;
  console.log(transform(data.Xpert, "age"));
  const historyXpert = transform(data.Xpert, "xpert").filter((o) => o.odate > "20191001");
  const historyXpert2 = transform2(data.Xpert, "age").filter((o) => o.odate > "20191001");
  console.log(historyXpert.filter((o) => o.odate > "20190930"));
  const historyAuto = transform(data.AutoConnect, "auto");
  const historyAuto2 = transform2(data.AutoConnect, "age");
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-screen pb-4">
      <HistoryChart data={historyXpert} title={`Backlog Xpert (excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`xpert`} />
      <HistoryChart data={historyXpert2} title={`Average Age Xpert (excl. Sol.Proposed)`} type="area" color="#90caf9" xvalue="date" value={`age`} />
      <HistoryChart data={historyAuto} title={`Backlog AutoConnect (excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`auto`} />
      <HistoryChart
        data={historyAuto2}
        title={`Average Age AutoConnect (excl. Sol.Proposed)`}
        type="area"
        color={color}
        xvalue="date"
        value={`age`}
      />
    </div>
  );
};

const QUERY_HISTORY_OTHER = gql`
  query QUERY_HISTORY_OTHER {
    Xpert: backlogHistory(ownergroup: "Xpert Support") {
      date
      number
      age
    }
    AutoConnect: backlogHistory(ownergroup: "AutoConnect Support") {
      date
      number
      age
    }
    PLM: backlogHistory(ownergroup: "PLM Support") {
      date
      number
      age
    }
  }
`;

export default OtherTeamChartsContainer;
// export default connect(mapStateToProps, { fetchHistoryDay })(HistoryDayAll1);
