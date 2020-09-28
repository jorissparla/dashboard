import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { format } from '../utils/format';

const options = {
  chart: { renderTo: "chart", type: "bar", style: { fontFamily: "Poppins" } },
  subtitle: { text: '-', x: -80 },
  xAxis: {
    labels: { rotation: -10, align: "right", style: { size: "12px", fontWeight: "bold" } },
    categories: [],
    left: 200,
    fontSize: 20,
  },
  yAxis: {
    title: { text: "Count" },
    stackLabels: { style: { color: "black" }, enabled: true },
  },
  title: {
    text: "Top 10 Customers",
  },
  plotOptions: {
    area: {
      color: "b39ddb",
    },
    column: {
      depth: 25,
      stacking: "normal",
      dataLabels: {
        enabled: true,
      },
    },
    legend: {
      layout: "vertical",
      backgroundColor: "#FFFFFF",
      align: "right",
      verticalAlign: "top",
      floating: false,
      x: 10,
      y: 30,
    },
    series: {
      pointWidth: 30, // width of the column bars irrespective of the chart size
    },
  },
  colors: ["#90caf9", "#ffa726", "#4db6ac"],
  series: [
    {
      label: "x",
      title: "x",
      color: "teal",
      name: "logged",
      data: [1, 2, 3],
      dataLabels: { enabled: true },
      pointWidth: 30,
    },
    {
      name: "escalated",
      color: "orange",
      data: [],
      dataLabels: { enabled: true },
      pointWidth: 20,
    },
  ],
};

const TOP10_QUERY = gql`
  query TOP10_QUERY {
    top10 {
      count
      esc
      company_id
      customer
      updated
    }
  }
`;

function TestChart() {
  const { data, loading } = useQuery(TOP10_QUERY);
  if (loading) return <div></div>;
  console.log(data);
  const { top10 } = data;
  const {updated} = top10[0]
  const updatedDate = format(updated, 'EEE, dd MMMM yyyy HH:mi')
  const count_ar = top10.map((item) => item.count);
  const esc_ar = top10.map((item) => item.esc);
  const label_ar = top10.map((item) => item.customer);

  options.series[0].data = count_ar;
  options.series[1].data = esc_ar;
  options.subtitle.text = 'Latest update: '+updatedDate
  label_ar.map((label, index) => (options.xAxis.categories[index] = label));
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default TestChart;
