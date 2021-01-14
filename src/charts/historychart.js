import React from "react";
import ReactHighCharts from "react-highcharts";

const baseConfiguration = {
  chart: {
    type: "column",
  },

  options3d: {
    enabled: true,
    alpha: 15,
    beta: 15,
    depth: 50,
    viewDistance: 25,
  },
  xAxis: {
    categories: [],
  },

  yAxis: {
    categories: [],
  },
  plotOptions: {
    area: {
      color: "#b39ddb",
    },
    series: {
      pointWidth: 50, // width of the column bars irrespective of the chart size
    },
    column: {
      depth: 25,
    },
  },
  series: [
    {
      name: "Tools",
      type: "column",
      color: "#ffb300",
      data: [],
      dataLabels: { enabled: true },
    },
  ],
  title: {
    text: "Hallo",
  },
};

var arColors = [];
arColors["LN"] = "#ffa726";
arColors["All"] = "#ff8a4c";
arColors["ageAll"] = "#ff8a4c";
arColors["Tools"] = "#84e1bc";
arColors["ageTools"] = "#84e1bc";
arColors["xpert"] = "#1da1f2";
arColors["age"] = "#373142";
arColors["auto"] = "#01579b";
arColors["plm"] = "var(--mediumpurp)";
arColors["Logistics"] = "#c62828";
arColors["Finance"] = "#01579b";
arColors["ageLogistics"] = "#c62828";
arColors["ageFinance"] = "#01579b";

function configureChart(config, xval, nameOfValueToShow, chartTitle, providedColor, chartType, allDataPoints) {
  let nameOfHorizontalVariable = !xval ? "weekNr" : xval;
  xval = !xval ? "weekNr" : xval;
  if (!allDataPoints) return config;
  // const dataPoints =
  const selectedDataPoints = allDataPoints
    .slice()
    .reverse()
    .map((item) => item[nameOfValueToShow]);
  let areaColor = arColors[nameOfValueToShow];
  if (providedColor) {
    config.plotOptions.area.color = providedColor;
  }

  config.xAxis.categories = allDataPoints
    .slice()
    .reverse()
    .map((item) => item[nameOfHorizontalVariable]);
  if (selectedDataPoints.length > 0) {
    config.yAxis = {};
    config.yAxis.floor = Math.floor(Math.min(...selectedDataPoints) / 10 - 1) * 10;
    config.yAxis.ceiling = Math.floor(Math.max(...selectedDataPoints) / 10 + 1) * 10;
  }
  config.series = [
    {
      data: selectedDataPoints, //filteredSummary.data,
      name: nameOfHorizontalVariable,
      color: areaColor,
      type: chartType,
      dataLabels: { enabled: true },
    },
  ];
  // config.series.push();
  config.title.text = chartTitle;
  return JSON.parse(JSON.stringify(config));
}

const historyChart = ({
  xvalue, //name of Horizontal variable
  value, //name of variable to display
  title, //title of Chart
  color,
  type,
  data,
}) => {
  const newConfig = configureChart(baseConfiguration, xvalue, value, title, color, type, data);
  return (
    <div className="rounded shadow-md p-4">
      <div className="card">
        <ReactHighCharts config={newConfig} />
      </div>
    </div>
  );
};
export default historyChart;
