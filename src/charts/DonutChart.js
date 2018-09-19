import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Component from "../common/component-component";

const INCIDENT_QUERY = gql`
  query accounts($firstName: String) {
    accounts(firstname: $firstName) {
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
    supportfolks {
      id
      firstname
      lastname
    }
  }
`;

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

class DonutChart extends React.Component {
  state = {
    incidents: [],
    firstname: "Eddy",
    name: "hai"
  };

  handleChange = event => {
    console.log(event.target.name, event.target.value);
  };
  render() {
    const { classes } = this.props;
    const navhttp = "http://navigator.infor.com/N/incident.asp?IncidentID=";
    return (
      <Component initialValue={{ firstname: "Eddy", incidents: [] }}>
        {({ state, setState }) => {
          return (
            <Query query={INCIDENT_QUERY} variables={{ firstName: state.firstname || "Eddy" }}>
              {({ data, loading }) => {
                if (loading) return "...Loading";
                const { accounts, supportfolks } = data;
                const { stats } = accounts[0];
                console.log(accounts, stats);
                const pieData = stats.map(stat => ({ x: stat.Status, y: stat.StatusCount }));
                return (
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="firstname-label-placeholder">
                        First Name
                      </InputLabel>
                      <Select
                        value={state.firstname}
                        onChange={({ target: { name, value } }) => setState({ [name]: value })}
                        input={<Input name="firstname" id="firstname-label-placeholder" />}
                        displayEmpty
                        name="firstname"
                        className={classes.selectEmpty}
                      >
                        {supportfolks.map(({ id, firstname }) => (
                          <MenuItem key={id} value={firstname}>
                            {firstname}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Label + placeholder</FormHelperText>
                    </FormControl>
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
                                      setState({ incidents: stats[props.index].incidents });
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
                      {state.incidents.map(inc => (
                        <li key={inc.IncidentID}>
                          <a href={navhttp + inc.IncidentID} target="_blank">
                            {inc.IncidentID}: {inc.summary}({inc.DaysUpdated})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Component>
    );
  }
}

export default withStyles(styles)(DonutChart);
