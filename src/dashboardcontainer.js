import React, { Component } from "react";
import DashBoard from "./dashboard";
import DashBoardStats from "./dashboardstats";
import { StyleLoader } from "./common";
import GoLives from "./golives/goLiveListNew";
import HistoryDayAll from "./charts/historydayallcontainer";
//import NewsListContainer from "./news/newslistcontainer";
import NewsPage from "./news/newspage";
import SupportCards from "./supportcard/SupportCards";
import KudoList from "./kudos/kudolistcomponentnew";
//import Award from './awards/award'

class DashBoardContainer extends Component {
  state = { index: 0, sel: null };

  componentWillMount() {
    console.log("DashboardContainer", this.props.match.params.region);
    const region = this.props.match.params.region || "EMEA";
    this.setState({ region: region });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  componentDidMount() {
    const sel = parseInt(this.props.match.params.id, 2);
    if (sel) {
      this.setState({ index: 0, sel: sel });
    }

    this.timerID = setInterval(this.myTimer.bind(this), this.props.refreshInterval || 60000);
  }

  myTimer() {
    const newIndex = this.state.index >= 8 ? 0 : this.state.index + 1;
    this.setState({ index: newIndex });
  }

  render() {
    if (!this.state) {
      return <div>Loading...</div>;
    }
    const index = this.state.sel ? this.state.sel : this.state.index;
    if (!(index >= 0)) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>
          <StyleLoader stylesheetPath="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css" />
        </div>
        {this.renderDashBoard(index)}
      </div>
    );
  }

  renderDashBoard(index) {
    const { region } = this.state;
    console.log(index, region);
    switch (index) {
      case 8:
        return <SupportCards region={region} />;
      case 7:
        return <NewsPage region={region} />;
      case 5:
        return <KudoList />;
      case 6:
        return <DashBoard region={region} />;
      case 2:
        return <DashBoardStats data={["Tools"]} region={region} />;
      case 3:
        return <GoLives region={region} />;
      case 4:
        return <HistoryDayAll region={region} />;
      case 0:
        return <DashBoardStats data={["Logistics"]} region={region} />;
      case 1:
        return <DashBoardStats data={["Finance"]} region={region} />;
      default:
        return <div>Invalid Dashboard</div>;
    }
  }
}

export default DashBoardContainer;
