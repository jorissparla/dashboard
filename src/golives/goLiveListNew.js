import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import styled from "styled-components";
import _ from "lodash";
import { format } from "date-fns";
import { withStyles } from "@material-ui/core/styles";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  color0: {
    backgroundColor: "#1da1f2"
  },
  color1: {
    backgroundColor: "#BA68C8"
  },
  color2: {
    backgroundColor: "#81D4FA"
  },
  color3: {
    backgroundColor: "#FF7043"
  }
});

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

const GoLiveItem = ({ item, bg = "#ec407a", index, classes }) => {
  const { id, day, customername, customerid, region, version, comments } = item;
  const nr = index % 3;
  const className = `classes.color${nr}`;
  return (
    <ListItem
      key={id}
      onClick={() =>
        window.open(`http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=${customerid}`)
      }
    >
      <ListItemAvatar>
        <Avatar className={nr === 1 ? classes.color1 : nr === 2 ? classes.color2 : classes.color3}>{day}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Div>
            <Span>{`${customername.toUpperCase()}`}</Span>
            <Mid>{`${region}`}</Mid>
            <Right>{version}</Right>
          </Div>
        }
        secondary={comments.slice(0, 300) + "..."}
      />
    </ListItem>
  );
};

/* <ListItem
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
      onClick={() =>
        window.open(`http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=${customerid}`)
      }
    /> */

const RenderMonthItems = ({ items, classes }) =>
  items.map((item, index) => (
    <GoLiveItem key={index} item={item} bg={colors[index % 6]} index={index} classes={classes} />
  ));

const goLivesContainer = ({ data: { loading, golives }, classes }) => {
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
  return (
    <List style={{ backgroundColor: "white" }}>
      {goLivesByMonth.map((m, index) => (
        <div key={index}>
          <Title>{m[0].month}</Title>
          <RenderMonthItems items={m} classes={classes} />
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

export default graphql(UPCOMING_GOLIVES_QUERY)(withStyles(styles)(goLivesContainer));
