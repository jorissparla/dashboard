import React, { Component } from "react";
import DashBoard from "./dashboard";
import DashBoardStats from "./dashboardstats";
import { StyleLoader } from "./common";
import KudoListAll from "./kudos/kudolistall";
import GoLives from "./golives/golives";
import HistoryDayContainer from "./charts/historydaycontainer";
import HistoryDayAll from "./charts/historydayallcontainer";
import NewsListContainer from "./news/newslistcontainer";
//import Award from './awards/award'

class DashBoardContainer extends Component {
  componentDidMount() {
    this.setState({
      index: 0
    });
    setInterval(this.myTimer.bind(this), this.props.refreshInterval || 60000);
  }

  myTimer() {
    const newIndex = this.state.index >= 7 ? 0 : this.state.index + 1;
    this.setState({
      index: newIndex
    });
  }

  render() {
    if (!this.state) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <StyleLoader stylesheetPath="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css" />
        </div>
        {this.renderDashBoard(this.state.index)}
      </div>
    );
  }

  renderDashBoard(index) {
    switch (index) {
      case 7:
        return <NewsListContainer />;
      case 5:
      case 6:
        return <DashBoard />;
      case 2:
        return <DashBoardStats data={["Tools"]} />;
      case 3:
        return <GoLives />;
      case 4:
        return <HistoryDayAll />;
      case 0:
        return <DashBoardStats data={["Logistics"]} />;
      case 1:
        return <DashBoardStats data={["Finance"]} />;
      default:
        return <div>Invalid Dashboard</div>;
    }
  }
}

const { number } = React.PropTypes;

DashBoardContainer.propTypes = {
  refreshInterval: number
};

export default DashBoardContainer;
