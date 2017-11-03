import React from "react";
import { gql, graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import moment from "moment";
import { Loading } from "../styles";
import styled from "styled-components";
import _ from "lodash";
import { format } from "date-fns";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

const Title = styled.h3`
  display: flex;
  align-content: center;
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
  background-color: lightgrey;
  height: 50px;
  align-items: center;
`;

const big = styled.div`
  display: flex;
  font-size: 16px;
  text-transform: uppercase;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Span = styled.div`
  display: flex;
  font-weight: bold;
  color: black;
`;
const dayPart = d => format(Date.parse(d), "DD");
const monthPart = d => format(Date.parse(d), "MMMM");

const GoLiveItem = ({ item, bg = "#ec407a" }) => {
  const { id, day, customername, country, region, version, comments } = item;
  console.log(item);
  const initials = customername
    .split("")
    .slice(0, 2)
    .join()
    .toUpperCase();
  return (
    <ListItem
      key={id}
      leftAvatar={
        <Avatar backgroundColor={bg} color="white">
          {day}
        </Avatar>
      }
      primaryText={
        <Div>
          <big>{customername.toUpperCase()}</big>
          <Span>{version}</Span>
        </Div>
      }
      secondaryText={<p>{comments}</p>}
      secondaryTextLines={2}
    />
  );
};

const RenderMonthItems = ({ items }) =>
  items.map((item, index) => <GoLiveItem item={item} bg={colors[index % 6]} />);

const goLivesContainer = ({ data: { loading, golives } }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  const goLivesByMonth = _.chain(golives)
    .sortBy(o => Date.parse(o.date))
    .groupBy(function(g) {
      return format(g.date, "MMMM");
    })
    .map(o => _.map(o, i => _.merge({ day: dayPart(i.date), month: monthPart(i.date) }, i)))
    .value();
  console.log(goLivesByMonth);
  return (
    <List style={{ backgroundColor: "white" }}>
      {goLivesByMonth.map(m => (
        <div>
          <Title>{m[0].month}</Title>
          <RenderMonthItems items={m} />
        </div>
      ))}
    </List>
  );
};

const queryGoLives = gql`
  query golives {
    golives {
      id
      customername
      country
      region
      version
      comments
      date
    }
  }
`;

export default graphql(queryGoLives)(goLivesContainer);
