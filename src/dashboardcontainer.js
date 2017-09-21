import React, { Component } from "react";
import DashBoard from "./dashboard";
import DashBoardStats from "./dashboardstats";
import { StyleLoader } from "./common";
import GoLives from "./golives/golives";
import HistoryDayAll from "./charts/historydayallcontainer";
import NewsListContainer from "./news/newslistcontainer";
import NewsPage from "./news/newspage";
import SupportCards from "./supportcard/SupportCards";
//import Award from './awards/award'

class DashBoardContainer extends Component {
  componentDidMount() {
    this.setState({
      index: 0
    });
    setInterval(this.myTimer.bind(this), this.props.refreshInterval || 10000);
  }

  myTimer() {
    const newIndex = this.state.index >= 8 ? 0 : this.state.index + 1;
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
      case 8:
        return <SupportCards />;
      case 7:
        return <NewsPage />;
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
