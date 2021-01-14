import { usePersistentState } from "hooks";
import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Spinner from "../utils/spinner";
import { format } from "./../utils/format";
import { QUERY_PRIORITY_BACKLOG } from "./queries/BACKLOG_QUERY2a";

const Container = styled.div`
  margin-top: -1rem;
  background: #ededed;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  margin-left: 0.5rem;
  width: 22%;
  min-width: 200px;

  color: ${(props) => (props.textcolor ? props.textcolor : "#4a5568")};
  background-color: ${(props) => (props.color ? props.color : "lightblue")};
  border-radius: 0.5rem;
  background-image: ${(props) => `linear-gradient(to bottom right, ${props.color || "black"}, white)`};
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const P = styled.div`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.125;
`;

const SubP = styled.p`
  text-align: center;
  letter-spacing: ${(props) => (props.space ? "0.2rem" : "0")};
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

  margin-left: 1.5rem;
`;

export default function PriorityDashboard() {
  const [region] = usePersistentState("region", "EMEA");
  const { loading, data } = useQuery(QUERY_PRIORITY_BACKLOG, {
    variables: { products: ["LN"] },
  });
  if (loading) {
    return <Spinner />;
  }

  const { all, active, mostRecentUpdate, accounts } = data;
  function filterByRegion(incidents) {
    if (incidents && incidents.length) {
      // console.log(incidents);
      return incidents.filter((inc) => inc.owner_region === region);
    } else return incidents;
  }
  console.log(all.length, filterByRegion(all.length));
  const escalated = filterByRegion(active.filter((item) => item.escalated !== 0));
  const sev2 = filterByRegion(
    active
      .filter((item) => item.severity === 3)
      .map((item) => {
        const account = accounts.find((account) => account.fullname === item.owner);
        let image;
        if (account) {
          image = account.image || "";
        }
        return { ...item, image };
      })
  );
  const sev1 = filterByRegion(
    all
      .filter((item) => item.severity === 4)
      .map((item) => {
        const account = accounts.find((account) => account.fullname === item.owner);
        let image;
        if (account) {
          image = account.image || "";
        }
        return { ...item, image };
      })
  );
  // console.log(sev1);
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ededed" }}>
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
          <P>{filterByRegion(all).length}</P>
          <SubP>Incidents</SubP>
        </Box>
      </Container>
      <hr />
      <Container>
        {[...sev1, ...sev2].map((item) => {
          let bgclass = "bg-white shadow-xl";
          if (item.severity === 4) {
            bgclass = "bg-red-100 shadow-xl-red";
          }
          console.log(item.severity);
          const statusColor = item.status === "Awaiting Infor" ? "bg-orange-700 text-orange-200 " : "bg-teal-700 text-teal-100 ";
          return (
            <div key={item.incident} className={`flex w-1/4 max-w-xs flex-col m-2 justify-end border ${bgclass} rounded-lg  overflow-hidden`}>
              <img
                className="h-32 w-full object-cover"
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                }
                alt="incident owner"
              />
              <div className="p-2">
                <div className="flex items-baseline">
                  <div className="ml-2 text-gray-600  uppercase font-semibold tracking-wider">{item.owner}</div>
                </div>
              </div>
              <h3 className="align-text-bottom bt-2 px-2 border-gray-700 font-semibold text-gray-700 mb-2 text-left overflow-hidden font-pop uppercase">
                {item.customername}
              </h3>
              <div className="mb-2 mr-2 px-4 h-8 max-w-sm text-gray-600 flex items-baseline text-xs overflow-hidden">{item.title}</div>
              <div className="flex items-baseline px-2">
                <span className={`mb-2  inline-block  ${statusColor} text-xs px-2 py-1 rounded-full  font-semibold tracking-wide`}>
                  {item.status}
                </span>
                <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">{item.incident}</div>
              </div>

              <div className="flex  mb-2 px-1">
                <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
                </svg>
                <span className="text-xs tracking-widest">Last updated: {format(item.lastupdated, "EEE, dd-MMM-yyyy hh:mm")}</span>
              </div>
            </div>
          );
        })}
        {/* {sev1.map(item => {
          return (
            <Box2 key={item.incident} color="#313348">
              <Vertical>
                <Image image={item.image} fullname={item.owner} size={96} />

                <span style={{ color: "white", paddingTop: 5 }}>{item.owner}</span>
              </Vertical>
              <Vertical>
                <span style={{ color: "white", paddingTop: 5, fontSize: "0.8rem" }}>{item.title}</span>
                <RedText>{item.customername}</RedText>
                <span style={{ color: "white", paddingTop: 5, letterSpacing: "0.3em", fontWeight: 100 }}>INCIDENT {item.incident}</span>
                <span style={{ color: "white", paddingTop: 5, letterSpacing: "0.3em", fontWeight: 100 }}>Status: {item.status}</span>
                <span style={{ color: "white", paddingTop: 5, fontSize: "0.8rem" }}>
                  Last updated: {format(item.lastupdated, "EEE, dd-MMM-yyyy hh:mm")}
                </span>
              </Vertical>
            </Box2>
          );
        })} */}
      </Container>
      <Container>
        {/* {sev2.map(item => {
          const statusColor =
            item.status === 'Awaiting Infor'
              ? 'bg-orange-700 text-orange-200 '
              : 'bg-teal-700 text-teal-100';
          return (
            <div
              key={item.incident}
              className="flex w-64  max-w-xs flex-col m-2 justify-end border shadow-xl rounded-lg bg-white overflow-hidden"
            >
              <img
                className="h-48 w-full object-cover"
                src={
                  item.image ||
                  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
                alt="incident owner"
              />
              <div className="p-2">
                <div className="flex items-baseline">
                  <div className="ml-2 text-gray-600  uppercase font-semibold tracking-wider">
                    {item.owner}
                  </div>
                </div>
              </div>
              <h3 className="align-text-bottom bt-2 border-gray-700 font-semibold text-gray-700 mb-2 text-left overflow-hidden font-pop uppercase">
                {item.customername}
              </h3>
              <div className="mb-2 mr-2 px-4 h-8 max-w-sm text-gray-600 flex items-baseline text-xs overflow-hidden">
                {item.title}
              </div>
              <div className="flex items-baseline">
                <span
                  className={`mb-2 inline-block  ${statusColor} text-xs px-2 py-1 rounded-full  font-semibold tracking-wide`}
                >
                  {item.status}
                </span>
                <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                  {item.incident}
                </div>
              </div>

              <div className="flex  mb-2">
                <svg
                  className="fill-current w-4 h-4 text-gray-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
                </svg>
                <span className="text-xs tracking-widest">
                  Last updated: {format(item.lastupdated, 'EEE, dd-MMM-yyyy hh:mm')}
                </span>
              </div>
            </div>
          );
        })} */}
      </Container>
    </div>
  );
}
