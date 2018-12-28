import React from 'react';
import styled from 'styled-components';

const FolderIcon = ({ color = '#ededed' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
    <path
      stroke={color}
      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z "
    />
  </svg>
);

const ClockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-clock"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Tile = styled.div`
  display: flex;
  height: 12rem;
  width: 16rem;
  flex-direction: column;
  border: 1px solid lightgrey;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.23);
  background: white;
  position: relative;
  font-family: 'Montserrat';
  font-size: 13px;
  margin: 5px;
`;

const TileDetails = styled.div`
  display: flex;
  max-height: 10rem;
`;
const TileMedia = styled.div`
  background-image: url(${props => props.img});
  min-height: 7rem;
`;
const TileActions = styled.div`
  height: 2rem;
  font-size: 8px;
  align-items: center;
  align-content: center;
`;
const TileTitle = styled.div`
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  height: 3rem;
  padding: 2px;
  overflow: hidden;
`;

export default function SupportCard({ title = 'This is a title', description, category }) {
  const { name } = category;
  let image = 'default';
  if (name === 'Development' || name === 'IXS') {
    image = name;
  }
  return (
    <Tile>
      <TileMedia img={require(`../static/supportcards/${image}.jpg`)} />
      <TileTitle>{title}</TileTitle>
      <TileActions>actions</TileActions>
    </Tile>
  );
}
