import React, { Component } from "react";
import ReactHighCharts from "react-highcharts";
import "highcharts/highcharts-3d";
import styled from "styled-components";
import shortid from "shortid";

const Card = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
  background-color: #fff;
  transition: box-shadow 0.25s;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  width: 30%;
`;

const arColors = ["#c62828", "#90caf9", "#01579b", "#ffa726", "#4db6ac", "#fbc02d", "#4527a0"];

export default class summaryChart extends Component {
  state = {
    config: {
      chart: {
        type: "column",
        style: {
          fontFamily: "Arial"
        }
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
          pointWidth: 50 // width of the column bars irrespective of the chart size
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
    }
  };
  renderSummary = (config, val, team, title, color, type, summary, xvalue) => {
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
    const range = summary.map(item => item[val]);
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
      dataLabels: { enabled: true }
    };
    config.title.text = title;
    return config;
  };

  render() {
    const { value, team, title, color, type, data, xvalue } = this.props;
    const newConfig = this.renderSummary(
      this.state.config,
      value,
      team,
      title,
      color,
      type,
      data,
      xvalue
    );
    return (
      <Card id={shortid.generate()}>
        <ReactHighCharts config={newConfig} id={shortid.generate()} />
      </Card>
    );
  }
}
