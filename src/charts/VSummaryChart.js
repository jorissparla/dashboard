import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { VictoryLabel, VictoryArea, VictoryTheme, VictoryChart, VictoryAxis } from "victory";

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

const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

class VSummaryChart extends React.Component {
  static defaultProps = {
    team: "Tools",
    color: "#1da1f2"
  };
  render() {
    const color = this.props.color; //|| "#c43a31";

    return (
      <Query query={querySummaries} variables={{ team: this.props.team || "Tools" }}>
        {({ data, loading }) => {
          if (loading) return "Loading....";
          console.log("data", data);
          const { summaries } = data;
          const range = summaries.map(item => item["supportBacklog"]);
          let ymin;
          let ymax;
          if (range.length > 0) {
            ymin = Math.floor(Math.min(...range) / 10 - 1) * 10;
            ymax = Math.floor(Math.max(...range) / 10 + 1) * 10 + 5;
          }
          return (
            <div style={{ display: "flex", width: "30%" }}>
              <VictoryChart width={400} theme={VictoryTheme.material}>
                <VictoryArea
                  interpolation="natural"
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  theme={VictoryTheme.material}
                  data={summaries}
                  style={{
                    data: {
                      fill: color,
                      fillOpacity: 0.7,
                      stroke: color,
                      strokeWidth: 3
                    },
                    labels: {
                      fontSize: 15,
                      fill: d => (d.x === 3 ? "#000000" : color)
                    }
                  }}
                  x="weekNr"
                  y="supportBacklog"
                  sortOrder="descending"
                  labels={d => `(${d.supportBacklog})`}
                  domain={{ y: [ymin, ymax] }}
                  labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                />
                <VictoryLabel text={`Support Backlog - ${this.props.team}`} x={100} y={50} />
              </VictoryChart>
            </div>
          );
        }}
      </Query>
    );
  }
}
class Charts extends React.Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <VSummaryChart team="Tools" color="#81D4FA" />
        <VSummaryChart team="Finance" color="#8BC34A" />
        <VSummaryChart team="Logistics" />
      </div>
    );
  }
}

export default Charts;
