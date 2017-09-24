import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import SummaryChart from "./NewSummaryChart";

class HistoryChartContainer extends Component {
  render() {
    const { data: { loading, error, history } } = this.props;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    const value = !this.props.value ? "backlog" : this.props.value;
    const title = !this.props.title ? "Chats" : this.props.title;
    const type = !this.props.type ? "column" : this.props.type;
    const team = this.props.team;
    const summary = history; // .reverse()
    const color = this.props.color;
    return (
      <div>
        <SummaryChart
          data={summary}
          title={title}
          type={type}
          xvalue="weeknr"
          value={value}
          color={color}
          team={team}
        />
      </div>
    );
  }
}

const queryHistory = gql`
  query history ($team: String) {
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
