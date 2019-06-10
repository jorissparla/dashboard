import React from "react";

import styled from "styled-components";

export const But = styled.button`
  font: inherit;
  border: 1px solid #524763;
  background: #524763;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  text-decoration: none;
  :hover {
    background: #524777;
    border-color: #524777;
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }
`;

export default function MyButton() {
  return <div />;
}
