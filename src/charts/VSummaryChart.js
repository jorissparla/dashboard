import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import React from "react";
import { VictoryArea, VictoryChart, VictoryLabel, VictoryTheme } from "victory";

const querySummariesv2 = gql`
  query summaries2($team: String) {
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

class VSummaryChart extends React.Component {
  static defaultProps = {
    team: "Tools",
    color: "#1da1f2",
    field: "supportBacklog",
    type: "area",
  };
  render() {
    const { color, team, field } = this.props; //|| "#c43a31";

    return (
      <Query query={querySummariesv2} variables={{ team }}>
        {({ data, loading }) => {
          if (loading) return "Loading....";
          console.log("data", data);
          const { summaries2 } = data;
          const range = summaries2.map((item) => item[field]);
          console.log("range", range);
          let ymin;
          let ymax;
          if (range.length > 0) {
            ymin = Math.floor(Math.min(...range) / 10 - 1) * 10;
            ymax = Math.floor(Math.max(...range) / 10 + 1) * 10 + 5;
          }
          console.log({ ymin }, { ymax });
          return (
            <div style={{ display: "flex", width: "30%" }}>
              <VictoryChart width={400} theme={VictoryTheme.material}>
                <VictoryArea
                  type={this.props.type}
                  interpolation="natural"
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                  }}
                  theme={VictoryTheme.material}
                  data={summaries2}
                  style={{
                    data: {
                      fill: color,
                      fillOpacity: 0.7,
                      stroke: color,
                      strokeWidth: 3,
                    },
                    labels: {
                      fontSize: 15,
                      fill: (d) => (d.x === 3 ? "#000000" : color),
                    },
                  }}
                  x="weekNr"
                  y={field}
                  sortOrder="descending"
                  labels={(d) => `(${d[field]})`}
                  domain={{ y: [ymin, ymax] }}
                  labelComponent={<VictoryLabel renderInPortal dy={-10} style={{ color: "#000" }} />}
                />
                <VictoryLabel text={`${this.props.field} - ${this.props.team}`} x={100} y={50} />
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <VSummaryChart team="Tools" color="#81D4FA" field="opened" />
        <VSummaryChart team="Tools" color="#FF7043" field="Closed" />
        <VSummaryChart team="Tools" color="#1da1f2" field="supportBacklog" />
        <VSummaryChart team="Tools" color="#ffc600" field="surveyScore" />
        <VSummaryChart team="Tools" color="#8BC34A" field="chatpct" />
        <VSummaryChart team="Finance" color="#8BC34A" />
        <VSummaryChart team="Logistics" color="#ffc600" />
      </div>
    );
  }
}

export default Charts;
