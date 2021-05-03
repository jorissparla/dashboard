import React from "react";
import SummaryChart from "./NewSummaryChart";
import gql from "graphql-tag";
import shortid from "shortid";
import { useQuery } from "@apollo/client";

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
// const SummaryChartContainer = props => {
const SummaryChartContainer = ({
  value = "supportBacklog",
  title = "supportBacklog",
  type = "column",
  team = "Logistics",
  color = "#FFF",
  region = "EMEA",
}) => {
  // const value = !props.value ? "supportBacklog" : props.value;
  // const title = !props.title ? value : props.title;
  // const type = !props.type ? "column" : props.type;
  // const team = props.team || "Logistics";
  const { data, loading } = useQuery(QUERY_SUMMARY_DATA, {
    variables: { team },
  });

  if (loading) return <div>Loading....</div>;
  if (data && data.summaries) {
    const summary = data.summaries;
    return <SummaryChart id={shortid.generate()} data={summary} title={title} type={type} xvalue="weekNr" value={value} color={color} team={team} />;
  } else {
    return "no data returned";
  }
};

/* export default graphql(querySummaries, {
  options: props => ({
    variables: { team: props.team || "Logistics", region: props.region || "EMEA" }
  })
})(SummaryChartContainer);
 */

export default SummaryChartContainer;
