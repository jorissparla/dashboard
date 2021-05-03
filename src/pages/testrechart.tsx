import { Area, AreaChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import { format, parseISO, subDays } from "date-fns";
import { gql, useQuery } from "@apollo/client";

import Testnewlogin from "./Testnewlogin";

const QUERY_SUMMARY_DATA = gql`
  query summaries($team: String) {
    summaries(team: $team, recent: 6) {
      weekNr
      supportBacklog
      opened
      Closed
      surveyScore
      nrSurveys
      backlog
      escalated
      chatpct
      newbacklog
    }
  }
`;

interface ISummary {
  weekNr: string;
  supportBacklog: number;
  opened: number;
  Closed: number;
  backlog: number;
  escalated: number;
  newbacklog: number;
}
interface IData {
  summaries: ISummary[];
}

const TestRechart = () => {
  const { data, loading } = useQuery<IData | null>(QUERY_SUMMARY_DATA, { variables: { team: "Logistics" } });
  if (!data) return <div></div>;
  const summaries1 = data && data.summaries;
  const summaries = summaries1.slice().reverse();
  console.log("summaries", summaries);
  return (
    <div>
      Test
      <ResponsiveContainer width="95%" height={500}>
        <AreaChart data={summaries}>
          <Area type="monotone" dataKey="backlog" stroke="#8884d8" label="backlog" />
          <XAxis dataKey="weekNr" tick={renderCustomXAxisTick}></XAxis>
          <YAxis dataKey="backlog" domain={["dataMin-100", "dataMax + 10"]}></YAxis>
          <CartesianGrid opacity={0.3} stroke="#fff" strokeDasharray="3 3" />
          <LabelList dataKey="backlog" position="top" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

function renderCustomXAxisTick({ x, y, payload }: { x: number; y: number; payload: any }) {
  console.log(payload);
  return (
    <text x={x} y={y + 10} width={24} height={24} className="font-bold text-sm">
      {payload.value}
    </text>
  );
}

const Test = () => (
  <div className="flex">
    <Testnewlogin />
    {/* <TestRechart />
    <TestRechart />
    <TestRechart /> */}
  </div>
);
export default Test;
