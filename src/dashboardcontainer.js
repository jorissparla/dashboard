import React, { Component } from "react";
import DynamicImport from "./DynamicImport";

import Anniversaries from "./awards/Anniversaries";
import FeedbackList from "./feedback/feedbackList";

const DashBoard = DynamicImport(() => import("./dashboard"));
const DashBoardStats = DynamicImport(() => import("./DashBoardStatsNew"));
const GoLives = DynamicImport(() => import("./golives/goLiveListNew"));
const SupportCards = DynamicImport(() => import("./supportcard/SupportCards"));
const HistoryDayAll = DynamicImport(() => import("./charts/historydayallcontainer"));
const NewsPage = DynamicImport(() => import("./news/newspage"));
const KudoList = DynamicImport(() => import("./kudos/kudolistcomponentnew"));

class DashBoardContainer extends Component {
  state = {
    index: 0,
    sel: null,
    region: "EMEA",
    components: [
      <DashBoardStats data1={["Logistics"]} team="Logistics" region={this.region} />,
      <DashBoardStats data1={["Logistics"]} team="Logistics" region={this.region} />,
      <DashBoardStats data1={["Finance"]} team="Finance" region={this.region} />,
      <DashBoardStats data1={["Tools"]} team="Tools" region={this.region} />,
      <GoLives region={this.region} />,
      <HistoryDayAll region={this.region} />,
      <KudoList />,
      <DashBoard region={this.region} />,
      <NewsPage region={this.region} />,
      <SupportCards region={this.region} />,
      <FeedbackList />,
      <Anniversaries />
    ]
  };

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
        {this.renderMyDashBoard(index)}
      </div>
    );
  }

  renderMyDashBoard = index => {
    const { region } = this.state;
    console.log(index, region);
    if (index > this.state.components.length - 1) return <div>Not found...</div>;
    return this.state.components[index];
  };

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
        //  return <GoLives region={region} />;
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
