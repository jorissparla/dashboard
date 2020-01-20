import React, { useContext, useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import _ from 'lodash';
import Spinner from '../utils/spinner';
import { QUERY_PRIORITY_BACKLOG } from './queries/BACKLOG_QUERY2a';
import { StyledInitials } from 'styles';
import { format } from './../utils/format';

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
  color: ${props => (props.textcolor ? props.textcolor : 'black')};
  background-color: ${props => (props.color ? props.color : 'lightblue')};
  border-radius: 4px;
  background-image: ${props =>
    `linear-gradient(to bottom right, ${props.color || 'black'}, white)`};
`;
const Box2 = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  padding: 10px;
  margin: 20px;
  width: 22%;
  min-width: 200px;
  color: ${props => (props.textcolor ? props.textcolor : 'black')};
  background-color: ${props => (props.color ? props.color : 'lightblue')};
  border-radius: 4px;
`;

const Article = styled.article`
  background-image: ${props =>
    `linear-gradient(to bottom right, ${props.color || 'black'}, white)`};
  background-size: cover;
`;

const P = styled.div`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.125;
`;

const SubP = styled.p`
  text-align: center;
  letter-spacing: ${props => (props.space ? '0.2rem' : '0')};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.25;
`;
const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.33;
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  justify-content: space-between;
`;
const RedText = styled.div`
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #ededed;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: ${props => (props.size ? props.size + 'px' : '32px')};
  height: ${props => (props.size ? props.size + 'px' : '32px')};
`;

const Image = ({ image, fullname, size = 32 }) => {
  const initials = fullname
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  if (image) {
    return <Avatar src={image.replace('http://','https://')} size={size} />;
  } else {
    return (
      <StyledInitials color="#1da1f2" size={size}>
        {initials}
      </StyledInitials>
    );
  }
};

export default function PriorityDashboard() {
  const { loading, data } = useQuery(QUERY_PRIORITY_BACKLOG, {
    variables: { products: ['LN'] }
  });
  if (loading) {
    return <Spinner />;
  }
  const { all, active, mostRecentUpdate, accounts } = data;
  const escalated = active.filter(item => item.escalated !== 0);
  const sev2 = active
    .filter(item => item.severity === 3)
    .map(item => {
      const account = accounts.find(account => account.fullname === item.owner);
      let image;
      if (account) {
        image = account.image || '';
      }
      return { ...item, image };
    });
  const sev1 = all
    .filter(item => item.severity === 4)
    .map(item => {
      const account = accounts.find(account => account.fullname === item.owner);
      let image;
      if (account) {
        image = account.image || '';
      }
      return { ...item, image };
    });
  console.log(sev1);
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
      <hr />
      <Container>
        {sev1.map(item => {
          return (
            <Box2 key={item.incident} color="#313348">
              <Vertical>
                <Image image={item.image} fullname={item.owner} size={96} />

                <span style={{ color: 'white', paddingTop: 5 }}>{item.owner}</span>
              </Vertical>
              <Vertical>
                <span style={{ color: 'white', paddingTop: 5, fontSize: '0.8rem' }}>
                  {item.title}
                </span>
                <RedText>{item.customername}</RedText>
                <span
                  style={{ color: 'white', paddingTop: 5, letterSpacing: '0.3em', fontWeight: 100 }}
                >
                  INCIDENT {item.incident}
                </span>
                <span
                  style={{ color: 'white', paddingTop: 5, letterSpacing: '0.3em', fontWeight: 100 }}
                >
                  Status: {item.status}
                </span>
                <span style={{ color: 'white', paddingTop: 5, fontSize: '0.8rem' }}>
                  Last updated: {format(item.lastupdated, 'EEE, dd-MMM-yyyy hh:mm')}
                </span>
              </Vertical>
            </Box2>
          );
        })}
      </Container>
      <Container>
        {sev2.map(item => {
          return (
            <Box2 key={item.incident} color="#fb8c00">
              <Vertical>
                <Image image={item.image} fullname={item.owner} size={96} />

                <span style={{ color: 'white', paddingTop: 5 }}>{item.owner}</span>
              </Vertical>
              <Vertical>
                <span style={{ color: 'white', paddingTop: 5, fontSize: '0.8rem' }}>
                  {item.title}
                </span>
                <RedText>{item.customername}</RedText>
                <span
                  style={{ color: 'white', paddingTop: 5, letterSpacing: '0.3em', fontWeight: 100 }}
                >
                  INCIDENT {item.incident}
                </span>
                <span
                  style={{ color: 'white', paddingTop: 5, letterSpacing: '0.3em', fontWeight: 100 }}
                >
                  Status: {item.status}
                </span>
                <span style={{ color: 'white', paddingTop: 5, fontSize: '0.8rem' }}>
                  Last updated: {format(item.lastupdated, 'EEE, dd-MMM-yyyy hh:mm')}
                </span>
              </Vertical>
            </Box2>
          );
        })}
      </Container>
    </>
  );
}
