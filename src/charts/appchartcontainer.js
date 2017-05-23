import React from "react";
import { connect } from "react-redux";
import { fetchSummary } from "../actions/index";
import SummaryChart from "./summarychart";

const { func, string, number, object, arrayOf } = React.PropTypes;

const AppChartContainer = React.createClass({
  propTypes: {
    fetchSummary: func,
    data: arrayOf(object),
    refreshRate: number,
    value: string,
    title: string,
    type: string,
    summary: arrayOf(object)
  },
  myTimer() {
    const data = !this.props.data ? ["Logistics"] : this.props.data;
    this.setState({
      index: this.state.index + 1,
      nrTeams: data.length
    });
    const { nrTeams, index } = this.state;
    if (index > nrTeams - 1) {
      this.setState({
        index: 0
      });
    }
  },

  componentWillMount() {
    this.setState({ index: 0 });
  },

  componentDidMount() {
    this.props.fetchSummary();

    if (this.props.refreshRate !== 0)
      this.timerhandle = setInterval(
        this.myTimer,
        this.props.refreshRate || 15000
      );
  },

  componentWillUnmount() {
    if (this.props.refreshRate !== 0) clearInterval(this.timerhandle);
  },

  render() {
    const data = !this.props.data ? ["Logistics"] : this.props.data;
    const value = !this.props.value ? "supportBacklog" : this.props.value;
    const title = !this.props.title ? value : this.props.title;
    const type = !this.props.type ? "line" : this.props.type;
    const team = data[this.state.index || 0];
    const summary = this.props.summary; // .reverse()
    const color = this.props.color;
    // console.dir('Summary', summary)
    return (
      <div>
        <SummaryChart
          data={summary}
          title={title}
          type={type}
          xvalue="weekNr"
          value={value}
          color={color}
          team={team}
        />
      </div>
    );
  }
});

const mapStateToProps = state => {
  return { summary: state.summary.summary };
};

export default connect(mapStateToProps, { fetchSummary })(AppChartContainer);
