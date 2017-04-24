import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHistoryDay } from "../actions/index";
import HistoryChart from "./historychart";
import styled from "styled-components";

const Flexdiv = styled.div`
  display: flex;
  height: 800px;
`;
const Contdiv = styled.div`
  flex: row;
  width: 50%;
  height: 80%;
`;

class HistoryDayAll extends Component {
  componentWillMount() {
    this.setState({ index: 0 });
  }

  componentDidMount() {
    this.props.fetchHistoryDay();
  }

  render() {
    //const data = (!this.props.data) ? [ 'LN', 'Logistics',  'Finance', 'Tools','LN','LN'] : this.props.data

    //const column = data[this.state.index || 0]
    const history = this.props.history; // .reverse();

    const color = this.props.color || "#ffb74d";
    //const title = 'Backlog '.concat(column)
    if (!history) return <div> Loading....</div>;
    return (
      <Flexdiv>
        <Contdiv>
          <HistoryChart
            data={history}
            title={`Backlog LN`}
            type="area"
            color={color}
            xvalue="day"
            value={`LN`}
          />
          <HistoryChart
            data={history}
            title={`Backlog Logistics`}
            type="area"
            color={color}
            xvalue="day"
            value={`Logistics`}
          />
        </Contdiv>
        <Contdiv>
          <HistoryChart
            data={history}
            title={`Backlog Finance`}
            type="area"
            color={color}
            xvalue="day"
            value={`Finance`}
          />

          <HistoryChart
            data={history}
            title={`Backlog Tools`}
            type="area"
            color={color}
            xvalue="day"
            value={`Tools`}
          />
        </Contdiv>
      </Flexdiv>
    );
  }
}

const mapStateToProps = state => {
  return { history: state.summary.history_day };
};

export default connect(mapStateToProps, { fetchHistoryDay })(HistoryDayAll);
