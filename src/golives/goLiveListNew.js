import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
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

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Span = styled.div`
  display: flex;
  flex-grow: 1;
  font-weight: bold;
  font-size: 16px;
  color: black;
  width: 52%;
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

const dayPart = d => format(Date.parse(d), "DD");
const monthPart = d => format(Date.parse(d), "MMMM");

const GoLiveItem = ({ item, bg = "#ec407a" }) => {
  const { id, day, customername, region, version, comments } = item;
  console.log(item);

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
          <Span>{`${customername.toUpperCase()}`}</Span>
          <Mid>{`${region}`}</Mid>
          <Right>{version}</Right>
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
