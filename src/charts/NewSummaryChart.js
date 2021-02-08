import React from "react";
// import ReactHighCharts from "react-highcharts";
import shortid from "shortid";
import Highcharts from "highcharts";
import ReactHighCharts from "highcharts-react-official";

const arColors = ["#c62828", "#90caf9", "#01579b", "#ffa726", "#4db6ac", "#fbc02d", "#4527a0"];

const config = {
  chart: {
    type: "column",
    style: {
      fontFamily: "Arial",
    },
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
  plotOptions: {
    area: {
      color: "b39ddb",
    },
    column: {
      depth: 25,
    },
    series: {
      pointWidth: 50, // width of the column bars irrespective of the chart size
    },
  },
  series: [
    {
      name: "Tools",
      type: "column",
      data: [],
      dataLabels: { enabled: true },
    },
  ],
  colors: ["#c62828", "#90caf9", "#ffa726", "#4db6ac"],
  title: {
    text: "Hallo",
  },
};
export default (props) => {
  const renderSummary = (config, val, team, title, color, type, summary, xvalue) => {
    if (color) {
      config.plotOptions.area.color = color;
    }

    const mySummary = (summary || []).slice(); // .sort((a,b)=> a.weekNr > b.weekNr)
    const filteredSummary = mySummary.reverse().reduce(
      ({ xvalues, data }, item, index) => {
        xvalues.push(item[xvalue]);
        data.push({ y: item[val], color: arColors[index % 7] });
        return { xvalues, data };
      },
      { xvalues: [], data: [] }
    );
    config.xAxis.categories = filteredSummary.xvalues;
    const range = summary.map((item) => item[val]);
    if (range.length > 0) {
      config.yAxis = {};
      config.yAxis.floor = Math.floor(Math.min(...range) / 10 - 1) * 10;
      config.yAxis.ceiling = Math.floor(Math.max(...range) / 10 + 1) * 10;
    }
    config.series[0] = {
      data: filteredSummary.data,
      name: team,
      team: team,
      type: type,
      dataLabels: { enabled: true },
    };
    config.title.text = title;
    return config;
  };

  const { value, team, title, color, type, data, xvalue } = props;
  console.log(JSON.stringify(data));
  const newConfig = renderSummary(config, value, team, title, color, type, data, xvalue);
  console.log("summary");
  // console.log("newConfig", JSON.stringify(newConfig), newConfig.yAxis);
  return (
    <div className="shadow-lg m-4 rounded-lg" id={shortid.generate()}>
      <ReactHighCharts options={newConfig} id={shortid.generate()} highcharts={Highcharts} />
    </div>
  );
};
