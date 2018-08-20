import React, { Component } from "react";
import DashBoard from "./dashboard";
import DashBoardStats from "./DashBoardStatsNew";
import GoLives from "./golives/goLiveListNew";
import HistoryDayAll from "./charts/historydayallcontainer";
import NewsPage from "./news/newspage";
import SupportCards from "./supportcard/SupportCards";
import KudoList from "./kudos/kudolistcomponentnew";
import Anniversaries from "./awards/Anniversaries";
import FeedbackList from "./feedback/feedbackList";

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
    const newIndex = this.state.index >= 10 ? 0 : this.state.index + 1;
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
        <div />
        {this.renderDashBoard(index)}
      </div>
    );
  }

  renderDashBoard(index) {
    const { region } = this.state;
    console.log(index, region);
    switch (index) {
      case 10:
        return <Anniversaries />;
      case 9:
        return <FeedbackList />;
      case 8:
        return <SupportCards region={region} />;
      case 7:
        return <NewsPage region={region} />;
      case 5:
        return <KudoList />;
      case 6:
        return <DashBoard region={region} />;
      case 2:
        return <DashBoardStats data1={["Tools"]} team="Tools" region={region} />;
      case 3:
        return <GoLives region={region} />;
      case 4:
        //return <GoLives region={region} />;
        return <HistoryDayAll region={region} />;
      case 0:
        return <DashBoardStats data1={["Logistics"]} team="Logistics" region={region} />;
      case 1:
        return <DashBoardStats data1={["Finance"]} team="Finance" region={region} />;
      default:
        return <div>Invalid Dashboard</div>;
    }
  }
}

export default DashBoardContainer;
