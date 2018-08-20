import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import SummaryChart from "./NewSummaryChart";

class HistoryChartContainer extends Component {
  render() {
    const {
      data: { loading, error, history },
      region = "EMEAs"
    } = this.props;
    console.log("HistoryChartContainer", this.props);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    const value = !this.props.value ? "backlog" : this.props.value;
    const title = !this.props.title ? "Chats" : this.props.title;
    const type = !this.props.type ? "column" : this.props.type;
    const team = this.props.team;
    const summary = history; // .reverse()
    console.log("summary", summary);
    const color = this.props.color;
    return (
      <div>
        <SummaryChart
          data={summary}
          title={title}
          type={type}
          xvalue="hour"
          value={value}
          color={color}
          team={team}
          region={region}
        />
      </div>
    );
  }
}

const queryHistory = gql`
  query history($team: String) {
    history(team: $team) {
      Row
      backlog
      hour
      id
      team
    }
  }
`;

export default graphql(queryHistory, {
  options: props => ({ variables: { team: props.team || "Logistics" } })
})(HistoryChartContainer);
