import { useQuery } from "@apollo/client";
import List from "@material-ui/core/List";
import clsx from "clsx";
import gql from "graphql-tag";
import _ from "lodash";
import React from "react";
import Spinner from "utils/spinner";
//import { format } from "date-fns";
import { format } from "../utils/format";
import { NoData } from "./NoData";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

const dayPart = (d) => format(d, "dd");
const monthPart = (d) => format(d, "MMMM");

const GoLiveItem = ({ item, bg = "#ec407a", index }) => {
  const { id, day, customername, customerid, region, version, comments } = item;
  const nr = index % 3;
  const baseClass = `w-12 h-12 p-2 mt-2 ml-2 flex items-center justify-center text-xl rounded-full shadow-xl col-span-1 row-span-2 `;
  const colorClass = nr === 0 ? `bg-orange-300 text-orange-700` : nr === 1 ? `bg-blue-300 text-blue-700` : `bg-pink-300 text-pink-700`;
  const cls = clsx(baseClass, colorClass);
  return (
    <div
      className="grid grid-cols-10 grid-rows-2 mt-2 border-b border-gray-200"
      key={id}
      onClick={() => window.open(`http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=${customerid}`)}
    >
      <div className={cls}>{day}</div>
      <div className="col-span-6 row-span-2">
        <span className="font-semibold text-gray-700">{`${customername.toUpperCase()}`}</span>
        <p className="text-sm overflow-hidden italic text-gray-600">{comments.slice(0, 300) + "..."}</p>
      </div>
      <div className="col-span-1 row-span-2 font-semibold flex items-center justify-center">{`${region}`}</div>
      <div className="col-span-2 row-span-2 flex items-center justify-start text-sm">{version}</div>
    </div>
  );
};

const RenderMonthItems = ({ items }) => items.map((item, index) => <GoLiveItem key={index} item={item} bg={colors[index % 6]} index={index} />);

const GoLivesContainer = () => {
  const { data, loading } = useQuery(UPCOMING_GOLIVES_QUERY);
  if (loading) {
    return <Spinner loadingMessage="fetching data" />;
  }
  console.log("data", data);
  if (!data) {
    return (
      <NoData>
        <p>No Data Found. contact your system administrator</p>
      </NoData>
    );
  }
  const { golives = null } = data;
  const goLivesByMonth = _.chain(golives)
    .sortBy((o) => Date.parse(o.date))
    .groupBy(function (g) {
      return format(g.date, "MMMM");
    })
    .map((o) => _.map(o, (i) => _.merge({ day: dayPart(i.date), month: monthPart(i.date) }, i)))
    .value();
  console.log({ goLivesByMonth });
  return (
    <div className="bg-white">
      <div className="w-full text-sm text-gray-500 font-sans ml-2 py-2">data was last updated: {format(golives[0].lastupdated, "EEEE, d MMMM ")}</div>
      {goLivesByMonth.map((m, index) => (
        <div key={index}>
          <div className="flex bg-gray-200 text-lg py-3 pl-6 items-center text-gray-700 font-semibold font-pop shadow-lg">{m[0].month}</div>
          <RenderMonthItems items={m} />
        </div>
      ))}
    </div>
  );
};

const UPCOMING_GOLIVES_QUERY = gql`
  query UPCOMING_GOLIVES_QUERY {
    golives {
      id
      customername
      customerid
      country
      region
      version
      comments
      date
      lastupdated
    }
  }
`;

export default GoLivesContainer;
