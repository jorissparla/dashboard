import React from "react";
import ReactHighCharts from "react-highcharts";
import "highcharts/highcharts-3d";

const arColors = ["#c62828", "#90caf9", "#01579b", "#ffa726", "#4db6ac", "#fbc02d", "#4527a0"];

Math.easeOutBounce = function(pos) {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos;
  }
  if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
  }
  if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
  }
  return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
};

const config = {
  chart: {
    type: "column"
  },
  options3d: {
    enabled: true,
    alpha: 15,
    beta: 15,
    depth: 50,
    viewDistance: 25
  },
  xAxis: {
    categories: []
  },
  plotOptions: {
    area: {
      color: "b39ddb"
    },
    column: {
      depth: 25
    },
    series: {
      pointWidth: 50, // width of the column bars irrespective of the chart size
      animation: {
        duration: 3000,
        easing: "easeOutBounce"
      }
    }
  },
  series: [
    {
      name: "Tools",
      type: "column",
      data: [],
      dataLabels: { enabled: true }
    }
  ],
  colors: ["#c62828", "#90caf9", "#ffa726", "#4db6ac"],
  title: {
    text: "Hallo"
  }
};

const renderSummary = (config, val, team, title, color, type, summary, xvalue) => {
  if (color) {
    config.plotOptions.area.color = color;
  }
  console.log("SUMMARYCHART", val, team, title, color, type, summary, xvalue);
  const mySummary = (summary || []).slice(); // .sort((a,b)=> a.weekNr > b.weekNr)
  const filteredSummary = mySummary
    .filter(item => item.team === team)
    .reverse()
    .slice(0, 6)
    .reverse()
    .reduce(
      ({ xvalues, data }, item, index) => {
        xvalues.push(item[xvalue]);
        data.push({ y: item[val], color: arColors[index % 7] });
        return { xvalues, data };
      },
      { xvalues: [], data: [] }
    );
  config.xAxis.categories = filteredSummary.xvalues;
  config.series[0] = {
    data: filteredSummary.data,
    name: team,
    team: team,
    type: type,
    dataLabels: { enabled: true }
  };
  config.title.text = title;
  return config;
};

const summaryChart = ({ value, team, title, color, type, data, xvalue = "weekNr" }) => {
  const newConfig = renderSummary(config, value, team, title, color, type, data, xvalue);
  return (
    <div className="col s4">
      <div className="card">
        <ReactHighCharts config={newConfig} />
      </div>
    </div>
  );
};
export default summaryChart;
