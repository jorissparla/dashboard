import React from "react";

import "./App.css";
import AppChartCombi from "./charts/appchartcombi";
import KudoList from "./kudos/kudolist1";
//import AlertWidget from './alerts/alertwidget'
import NewsCardContainer from "NewsCardContainer";
import AppChartContainer from "./charts/appchartcontainer";
import HistoryChartContainer from "./charts/historycontainer";
import GoLiveList from "./golives/golivelist";
import GoLiveList1 from "./golives/golivelist1";
import { StyleLoaderM } from "./common";
import { ContainerStyle, LeftPanelStyle, RightPanelStyle, ItemStyle } from "./layout";

const DashBoard = () => {
  return (
    <ContainerStyle>
      <LeftPanelStyle>
        <GoLiveList1 nrItems={10} />
      </LeftPanelStyle>
      <RightPanelStyle>
        <ItemStyle flex={5} width={200}>
          <KudoList refreshRate={10000} showNumberKudos={4} />
        </ItemStyle>
        <ItemStyle height={"100px"}>
          <NewsCardContainer refreshRate={33000} />
        </ItemStyle>
        <ItemStyle>
          <AppChartContainer data={["Tools", "Logistics", "Finance"]} refreshRate={16000} />
        </ItemStyle>
        <ItemStyle>
          <HistoryChartContainer refreshRate={16000} />
        </ItemStyle>
      </RightPanelStyle>
    </ContainerStyle>
  );
};

export default DashBoard;
