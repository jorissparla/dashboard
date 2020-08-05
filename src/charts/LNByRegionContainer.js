import { Grid } from "@material-ui/core";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/client";
import { format } from "utils/format";
import Spinner from "utils/spinner";
import HistoryChart from "./historychart";
import { usePersistentState } from "hooks";

const transform = (data, value) =>
  data.map(({ date, number }) => ({
    date: format(parseInt(date), "dd"),
    odate: format(parseInt(date), "yyyyMMdd"),
    [value]: number,
    label: number,
    data: { y: number, color: "rgba(144, 202, 249, 0.75)" },
  }));
const transform2 = (data, value) =>
  data.map(({ date, number, age }) => ({
    date: format(parseInt(date), "dd"),
    odate: format(parseInt(date), "yyyyMMdd"),
    [value]: age,
    label: age,
    data: { y: number, color: "rgba(144, 202, 249, 0.75)" },
  }));

const LNByRegionContainer = ({ color = "#ffb74d" }) => {
  const [region, setRegion] = usePersistentState("EMEA");
  const { data, loading } = useQuery(QUERY_HISTORY_LN, {
    variables: { region },
  });
  if (loading) return <Spinner />;
  console.log(data);

  // return <div>{JSON.stringify(data, null, 2)}</div>;
  // const { All, Logistics, Finance, Tools } = data;
  const All = transform(data.All, "All");
  const Logistics = transform(data.Logistics, "Logistics");
  const Finance = transform(data.Finance, "Finance");
  const Tools = transform(data.Tools, "Tools");
  const ageAll = transform2(data.All, "ageAll");
  const ageLogistics = transform2(data.Logistics, "ageLogistics");
  const ageFinance = transform2(data.Finance, "ageFinance");
  const ageTools = transform2(data.Tools, "ageTools");
  if (!data) return <div>No data</div>;

  // const historyPLM = transform(data.PLM, 'plm');
  // return <div>Data</div>;

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex flex-wrap mx-4">
        <div className="m-2 w-full rounded shadow-md bg-white p-2">
          <label className="block">
            <span className="text-gray-700">Filter Region</span>
            <select className="form-select block w-32 mt-1" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option>EMEA</option>
              <option>NA</option>
              <option>APJ</option>
              <option>LA</option>
            </select>
          </label>
        </div>
        <div className="m-2 rounded shadow-lg bg-orange-400">
          <HistoryChart data={All} title={`Backlog LN (excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`All`} />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart
            data={Logistics}
            title={`Backlog LN Logistics (excl. Sol.Proposed)`}
            type="area"
            color="#90caf9"
            xvalue="date"
            value={`Logistics`}
          />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart data={Finance} title={`Backlog LN Finance (excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`Finance`} />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart data={Tools} title={`Backlog LN Tools (excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`Tools`} />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart data={ageAll} title={`Age LN All(excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`ageAll`} />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart
            data={ageLogistics}
            title={`Age LN Logistics(excl. Sol.Proposed)`}
            type="area"
            color={color}
            xvalue="date"
            value={`ageLogistics`}
          />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart data={ageFinance} title={`Age LN Finance(excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`ageFinance`} />
        </div>
        <div className="m-2 rounded shadow-lg">
          <HistoryChart data={ageTools} title={`Age LN Tools(excl. Sol.Proposed)`} type="area" color={color} xvalue="date" value={`ageTools`} />
        </div>
      </div>
    </div>
  );
};

const QUERY_HISTORY_LN = gql`
  query QUERY_HISTORY_LN($region: String) {
    All: backlogHistory(
      ownergroup: ""
      ownergroups: ["LN Tools Support", "LN Finance Support", "LN Logistics Support", "LN Manufacturing Support"]
      region: $region
    ) {
      date
      number
      age
    }
    Logistics: backlogHistory(ownergroup: "", ownergroups: ["LN Logistics Support", "LN Manufacturing Support"], region: $region) {
      date
      number
      age
    }
    Finance: backlogHistory(ownergroup: "", ownergroups: ["LN Finance Support"], region: $region) {
      date
      number
      age
    }
    Tools: backlogHistory(ownergroup: "", ownergroups: ["LN Tools Support"], region: $region) {
      date
      number
      age
    }
  }
`;

export default LNByRegionContainer;
// export default connect(mapStateToProps, { fetchHistoryDay })(HistoryDayAll1);
