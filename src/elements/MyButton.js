import React from 'react';

import styled from 'styled-components';

export const niceblue = '#40a5ed';
export const babyblue = '#ecf6fd';
export const twitterblue = '#1da1f2';

// const COLOR_PRIMARY = "#524763";
// const COLOR_PRIMARY_OFF = "#524777";
// const COLOR_SECONDARY = "#1da1f2";
// const COLOR_SECONDARY_OFF = "#40a5ed";

export const But = styled.button`
  font: inherit;
  border: ${props => (props.secondary ? `1px solid #1da1f2` : `1px solid #524763`)};
  background-color: ${props => (props.secondary ? `#1da1f2` : `#524763`)};
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
  :hover {
    background-color: ${props => (props.secondary ? ` #40a5ed` : ` #524777`)};
    border-color: #524777;
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }
`;

export default function MyButton() {
  return <div />;
}
