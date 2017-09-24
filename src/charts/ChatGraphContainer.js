import React from "react";
import { gql, graphql } from "react-apollo";
import SummaryChart from "./NewSummaryChart";

class ChatGraphContainer extends React.Component {
  componentWillMount() {}

  render() {
    const { data: { loading, error, chats } } = this.props;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    const value = !this.props.value ? "percentage" : this.props.value;
    const title = !this.props.title ? "Chats" : this.props.title;
    const type = !this.props.type ? "column" : this.props.type;
    const team = this.props.team;
    const summary = chats; // .reverse()
    const color = this.props.color;
    console.log(summary);
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

const querySummaries = gql`
  query chats ($team: String) {
    chats(team: $team, recent: 6) {
      id
      weeknr
      percentage
    }
  }
`;

export default graphql(querySummaries, {
  options: props => ({ variables: { team: props.team || "Logistics" } })
})(ChatGraphContainer);
