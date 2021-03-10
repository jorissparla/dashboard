import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { format } from "../utils/format";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const options = {
  chart: { renderTo: "chart", type: "bar", style: { fontFamily: "Poppins" } },
  subtitle: { text: "-", x: -80 },
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

// function TestChart() {
//   const { data, loading } = useQuery(TOP10_QUERY);
//   if (loading) return <div></div>;
//   console.log(data);
//   const { top10 } = data;
//   const {updated} = top10[0]
//   const updatedDate = format(updated, 'EEE, dd MMMM yyyy HH:mi')
//   const count_ar = top10.map((item) => item.count);
//   const esc_ar = top10.map((item) => item.esc);
//   const label_ar = top10.map((item) => item.customer);

//   options.series[0].data = count_ar;
//   options.series[1].data = esc_ar;
//   options.subtitle.text = 'Latest update: '+updatedDate
//   label_ar.map((label, index) => (options.xAxis.categories[index] = label));
//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// }

function TestChart() {
  return (
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div className="py-8">
          <h1 className="text-4xl font-bold">@tailwindcss/forms examples</h1>
          <p className="mt-2 text-lg text-gray-600">An opinionated form reset designed to make form elements easy to style with utility classes.</p>
          <div className="mt-4 flex space-x-4">
            <a className="text-lg underline" href="https://github.com/tailwindlabs/tailwindcss-forms">
              Documentation
            </a>
            <a className="text-lg underline" href="/kitchen-sink.html">
              Kitchen Sink
            </a>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-2xl font-bold">Unstyled</h2>
          <p className="mt-2 text-lg text-gray-600">This is how form elements look out of the box.</p>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input type="text" className="mt-1 block w-full" placeholder="" />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input type="email" className="mt-1 block w-full" placeholder="john@example.com" />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input type="date" className="mt-1 block w-full" />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select className="block w-full mt-1">
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea className="mt-1 block w-full" rows="3"></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input type="checkbox" checked />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-2xl font-bold">Simple</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input
                  type="checkbox"
                  className="mt-1 block rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder=""
                  value="Hallo"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="john@example.com"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows="3"
                ></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        checked
                      />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-2xl font-bold">Underline</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder=""
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input
                  type="email"
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="john@example.com"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input type="date" className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select className="block w-full mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  rows="2"
                ></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black" />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-2xl font-bold">Solid</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder=""
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="john@example.com"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  rows="3"
                ></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                      />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestChart;
