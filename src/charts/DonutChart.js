import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory";

const INCIDENT_QUERY = gql`
  {
    accounts(firstname: "Jos") {
      stats {
        Status
        StatusCount
        incidents {
          IncidentID
          summary
          DaysUpdated
        }
      }
    }
  }
`;

const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

export default class DonutChart extends Component {
  state = { incidents: [] };
  render() {
    return (
      <Query query={INCIDENT_QUERY}>
        {({ data, loading }) => {
          if (loading) return "...Loading";
          const { accounts } = data;
          const { stats } = accounts[0];
          console.log(accounts, stats);
          const pieData = stats.map(stat => ({ x: stat.Status, y: stat.StatusCount }));
          console.log(JSON.stringify(pieData));
          return (
            <div>
              <div style={{ width: "45%" }}>
                <VictoryPie
                  colorScale={colors}
                  width={600}
                  theme={VictoryTheme.material}
                  innerRadius={50}
                  data={pieData}
                  padAngle={3}
                  labels={d => `${d.x} (${d.y})`}
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onClick: () => {
                          return [
                            {
                              target: "labels",
                              mutation: props => {
                                this.setState({ incidents: stats[props.index].incidents });
                                return `<h1>${props.text}</h1>`;
                              }
                            }
                          ];
                        }
                      }
                    }
                  ]}
                />
              </div>
              <ul>
                {this.state.incidents.map(inc => (
                  <li>
                    {inc.IncidentID}: {inc.summary}({inc.DaysUpdated})
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}
