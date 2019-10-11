import React from 'react';
import ReactHighCharts from 'react-highcharts';

const config = {
  chart: {
    type: 'column'
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

  yAxis: {
    categories: []
  },
  plotOptions: {
    area: {
      color: '#b39ddb'
    },
    series: {
      pointWidth: 50 // width of the column bars irrespective of the chart size
    },
    column: {
      depth: 25
    }
  },
  series: [
    {
      name: 'Tools',
      type: 'column',
      color: '#ffb300',
      data: [],
      dataLabels: { enabled: true }
    }
  ],
  title: {
    text: 'Hallo'
  }
};

var arColors = [];
arColors['LN'] = '#ffa726';
arColors['Tools'] = '#90caf9';
arColors['xpert'] = '#90caf9';
arColors['auto'] = '#01579b';
arColors['plm'] = 'var(--mediumpurp)';
arColors['Logistics'] = '#c62828';
arColors['Finance'] = '#01579b';

const renderSummary = (config, xval, val, title, color, type, asummary) => {
  xval = !xval ? 'weekNr' : xval;
  if (!asummary) return config;
  const summary = asummary.slice().reverse();
  const range = summary.map(item => item[val]);
  // const filteredSummary = summary.map(item => [].concat(item[xval], item[val]));
  console.log('Range', title, { val }, range);
  color = arColors[val];
  if (color) {
    config.plotOptions.area.color = color;
  }

  config.xAxis.categories = summary.map(i => i[xval]);
  if (range.length > 0) {
    config.yAxis = {};
    config.yAxis.floor = Math.floor(Math.min(...range) / 10 - 1) * 10;
    config.yAxis.ceiling = Math.floor(Math.max(...range) / 10 + 1) * 10;
  }
  config.series = [];
  config.series.push({
    data: range, //filteredSummary.data,
    name: xval,
    color: color,
    type: type,
    dataLabels: { enabled: true }
  });
  config.title.text = title;
  return JSON.parse(JSON.stringify(config));
};

const historyChart = ({ xvalue, value, title, color, type, data }) => {
  const newConfig = renderSummary(config, xvalue, value, title, color, type, data);
  return (
    <div className="col s4">
      <div className="card">
        <ReactHighCharts config={newConfig} />
      </div>
    </div>
  );
};
export default historyChart;
