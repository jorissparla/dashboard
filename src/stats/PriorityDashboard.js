import React, { useContext, useState } from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import _ from "lodash";
import { format } from "../utils/format";
import Spinner from "../utils/spinner";
import { QUERY_PRIORITY_BACKLOG } from "./queries/BACKLOG_QUERY2";

const Container = styled.div`
  margin-top: -1rem;
  background: #ededed;
  height: 100%;
  display: flex;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  margin: 20px;
  width: 22%;
  min-width: 200px;
  color: ${props => (props.textcolor ? props.textcolor : "black")};
  background-color: ${props => (props.color ? props.color : "lightblue")};
  border-radius: 4px;
  background-image: ${props => `linear-gradient(to bottom right, ${props.color || "black"}, white)`};
`;

const Article = styled.article`
  background-image: ${props => `linear-gradient(to bottom right, ${props.color || "black"}, white)`};
  background-size: cover;
`;

const P = styled.div`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.125;
`;

const SubP = styled.p`
  text-align: center;
  letter-spacing: ${props => (props.space ? "0.2rem" : "0")};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.25;
`;
const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.87);
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.33;
`;

export default function PriorityDashboard() {
  const { loading, data } = useQuery(QUERY_PRIORITY_BACKLOG, {
    suspend: false,
    variables: { products: ["LN"] }
  });
  if (loading) {
    return <Spinner />;
  }
  const { all, active, mostRecentUpdate } = data;
  const escalated = active.filter(item => item.escalated !== 0);
  const sev2 = active.filter(item => item.severity === 3);
  const sev1 = all.filter(item => item.severity === 4);
  console.log(data);
  return (
    <>
      <H2>Priority Dashboard - updated {mostRecentUpdate}</H2>
      <Container>
        <Box color="red">
          <SubP space>Severity One</SubP>
          <P>{sev1.length}</P>
          <SubP>Production Outages</SubP>
        </Box>
        <Box color="orange">
          <SubP space>Sev2 Major Impact</SubP>
          <P>{sev2.length}</P>
          <SubP>Active Incidents</SubP>
        </Box>
        <Box color="#40a5ed">
          <SubP space>Escalations</SubP>
          <P>{escalated.length}</P>
          <SubP>Active Incidents</SubP>
        </Box>
        <Box color="green">
          <SubP space>Support Backlog</SubP>
          <P>{all.length}</P>
          <SubP>Incidents</SubP>
        </Box>
      </Container>
    </>
  );
}
