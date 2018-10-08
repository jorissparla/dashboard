import React from "react";
import ReactHighCharts from "react-highcharts";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ALL_RESOLUTIONS = gql`
  {
    resolutions(recent: 12) {
      id
      weeknr
      avgTime
      Deployment
      Tenant
      Number
    }
  }
`;

const config = {
  chart: {
    type: "column",
    style: {
      fontFamily: "Roboto"
    }
  },
  title: {
    text: "Average Time to Solution Proposed or Resolution"
  },
  legend: {
    borderRadius: 5,
    borderWidth: 1,
    itemStyle: {
      fontSize: 20
    }
  },

  subtitle: {
    text: "Source: Infor Xtreme"
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    crosshair: true,
    labels: {
      style: {
        fontSize: 16
      }
    }
  },
  yAxis: {
    min: 0,
    max: 60,
    title: {
      text: "Nr of Days"
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} days</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0
    }
  },
  series: [
    {
      name: "Tokyo",
      color: "rgba(165,170,217,1)",
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    },
    {
      name: "New York",
      color: "rgba(186,60,61,.9)",
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    },
    {
      name: "London",
      color: "rgba(248,161,63,1)",
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    },
    {
      name: "Berlin",
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    }
  ]
};

export default () => {
  return (
    <Query query={ALL_RESOLUTIONS}>
      {({ data, loading }) => {
        if (loading) return "Loading....";
        const resolutions = data.resolutions.slice().reverse();
        const weeknrs = Array.from(new Set(resolutions.map(r => r.weeknr)));
        console.log("weeknr", weeknrs);
        config.xAxis.categories = weeknrs;
        config.series = [];

        const onPrem = resolutions
          .filter(item => item.Deployment === "On-Premise")
          .map(item => [].concat(item.Number.toString(), item.avgTime));
        const STCloud = resolutions
          .filter(item => item.Deployment === "Cloud" && item.Tenant === "Single Tenant")
          .map(item => [].concat(item.Number.toString(), item.avgTime));
        const MTCloud = resolutions
          .filter(item => item.Deployment === "Cloud" && item.Tenant === "Multi-Tenant")
          .map(item => [].concat(item.Number.toString(), item.avgTime));
        config.series.push({
          name: "On-Premise",
          data: onPrem,
          color: "rgba(248,161,63,1)",
          dataLabels: {
            enabled: true,
            useHTML: true,
            format: "<h2>{y} days</h2><BR> (#{point.name} )"
          }
        });
        config.series.push({
          name: "Cloud ST",
          data: STCloud,
          color: "rgba(186,60,61,.9)",
          dataLabels: {
            enabled: true,
            useHTML: true,
            format: "<h2>{y} days</h2><BR> (#{point.name}  )"
          }
        });
        config.series.push({
          name: "Cloud MT",
          data: MTCloud,
          color: "rgba(165,170,217,1)",
          dataLabels: {
            enabled: true,
            useHTML: true,
            format: "<h2>{y} days</h2><BR> (#{point.name}  )"
          }
        });
        return <ReactHighCharts config={config} />;
      }}
    </Query>
  );
};
