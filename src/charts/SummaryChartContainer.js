import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import SummaryChart from "./NewSummaryChart";
import LoadingDots from "../common/LoadingDots";

class SummaryChartContainer extends React.Component {
  componentWillMount() {}

  render() {
    const {
      data: { loading, error, summaries }
    } = this.props;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    const value = !this.props.value ? "supportBacklog" : this.props.value;
    const title = !this.props.title ? value : this.props.title;
    const type = !this.props.type ? "column" : this.props.type;
    const team = this.props.team;
    const summary = summaries; // .reverse()
    const color = this.props.color;
    return (
      <SummaryChart
        data={summary}
        title={title}
        type={type}
        xvalue="weekNr"
        value={value}
        color={color}
        team={team}
      />
    );
  }
}

const querySummaries = gql`
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
    }
  }
`;

export default graphql(querySummaries, {
  options: props => ({
    variables: { team: props.team || "Logistics", region: props.region || "EMEA" }
  })
})(SummaryChartContainer);
