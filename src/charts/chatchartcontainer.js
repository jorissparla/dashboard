import React from "react";
import { connect } from "react-redux";
import { fetchChat } from "../actions/index";
import SummaryChart from "./summarychart";

class ChatChartContainer extends React.Component {
  myTimer = () => {
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
  };

  componentWillMount() {
    this.setState({ index: 0 });
  }
  componentDidMount() {
    this.props.fetchChat();

    this.timerhandle = setInterval(
      this.myTimer,
      this.props.refreshRate || 15000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerhandle);
  }

  render() {
    const data = !this.props.data ? ["Logistics"] : this.props.data;
    const value = !this.props.value ? "percentage" : this.props.value;
    const title = !this.props.title ? "value" : this.props.title;
    const type = !this.props.type ? "column" : this.props.type;
    const team = data[this.state.index || 0];
    const chat = this.props.chat || []; //.reverse().slice(0, 6).reverse() // .reverse()

    return (
      <div>
        <SummaryChart
          data={chat}
          title={title}
          type={type}
          xvalue="weeknr"
          value={value}
          team={team}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chat: state.summary.chat };
};

export default connect(mapStateToProps, { fetchChat })(ChatChartContainer);
