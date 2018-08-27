import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import HistoryChart from "./historychart";

class HistoryChartDayContainer extends Component {
  myTimer() {
    const data = !this.props.data ? ["LN", "Tools", "Logistics", "Finance"] : this.props.data;
    this.setState({
      index: this.state.index + 1,
      nrCols: data.length
    });

    const { nrCols, index } = this.state;
    if (index > nrCols - 1) {
      this.setState({
        index: 0
      });
    }
  }

  componentWillMount() {
    this.setState({ index: 0 });
  }

  componentDidMount() {
    //  this.props.fetchHistoryDay();
    this.timerhandle = setInterval(this.myTimer.bind(this), this.props.refreshRate || 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerhandle);
  }

  render() {
    const data = !this.props.data
      ? ["LN", "Logistics", "Finance", "Tools", "LN", "LN"]
      : this.props.data;

    const column = data[this.state.index || 0];
    // console.log("historydaycontainer", this.props.history);
    //const history = this.props.history; // .reverse();

    const color = this.props.color || "#ffb74d";
    const title = "Backlog ".concat(column);
    // if (!history) return <div> Loading....</div>;
    return (
      <Query query={QUERY_HISTORY_DAY}>
        {({ data, loading, ...props }) => {
          console.log("CCC", loading, data, { props });
          if (loading) {
            return <h1>Loading....</h1>;
          }

          return (
            <HistoryChart
              data={data.historyday}
              title={title}
              type="area"
              color={color}
              xvalue="day"
              value={column}
            />
          );
        }}
      </Query>
    );
  }
}

const QUERY_HISTORY_DAY = gql`
  {
    historyday {
      id
      day
      month
      LN
      Tools
      Finance
      Logistics
    }
  }
`;

export default HistoryChartDayContainer;
