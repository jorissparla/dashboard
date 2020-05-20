import React from "react";
import gql from "graphql-tag";
import { graphql, useQuery } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import _ from "lodash";
//import { format } from "date-fns";
import { format } from "../utils/format";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  color0: {
    backgroundColor: "#1da1f2",
  },
  color1: {
    backgroundColor: "#BA68C8",
  },
  color2: {
    backgroundColor: "#81D4FA",
  },
  color3: {
    backgroundColor: "#FF7043",
  },
});

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Span = styled.div`
  display: flex;
  flex-grow: 1;

  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.75);
  letter-spacing: 0.1rem;
  font-size: 16px;
  font-wwidth: 52%;
`;

const Mid = styled.div`
  flex-grow: 1;
  font-weight: bold;
  font-size: 16px;
  color: black;
  border-radius: 2px;
  width: 5%;
`;

const Right = styled.div`
  display: flex;
  flex-grow: 1;
  font-weight: bold;
  font-size: 16px;
  color: black;
  width: 33%;
  justify-content: flex-end;
`;

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
    return <div>Loading...</div>;
  }
  const { golives } = data;
  const goLivesByMonth = _.chain(golives)
    .sortBy((o) => Date.parse(o.date))
    .groupBy(function (g) {
      return format(g.date, "MMMM");
    })
    .map((o) => _.map(o, (i) => _.merge({ day: dayPart(i.date), month: monthPart(i.date) }, i)))
    .value();
  return (
    <List style={{ backgroundColor: "white" }}>
      {goLivesByMonth.map((m, index) => (
        <div key={index}>
          <div className="flex bg-gray-200 text-lg py-3 pl-6 items-center text-gray-700 font-semibold font-pop shadow-lg">{m[0].month}</div>
          <RenderMonthItems items={m} />
        </div>
      ))}
    </List>
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
    }
  }
`;

export default GoLivesContainer;
