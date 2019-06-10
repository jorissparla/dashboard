import * as React from "react";
import styled from "styled-components";

const SELECTEDCOLOR = "rgb(130, 216, 216)";
const HOVERCOLOR = "#524763";

function getBGColor(props: any) {
  if (props.selected && props.outline) {
    return HOVERCOLOR;
  }
  return SELECTEDCOLOR;
}

export const Block = styled("a")<{ selected?: boolean; outline?: boolean }>`
  font-family: Poppins;
  color: ${props => (props.selected ? "black" : "rgb(69, 69, 69)")};
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${props => getBGColor(props)};
  background-color: ${props => (props.selected ? SELECTEDCOLOR : "rgb(196, 196, 196)")};
  border-radius: 3px;
  padding: 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  transition: all 0.2s ease 0s;
  :hover {
    background-color: ${HOVERCOLOR};
    color: black;
    cursor: pointer;
  }
`;

export const Title = styled.h3`
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 900;
  text-align: left;
  text-shadow: rgba(0, 0, 0, 0.2) 1px 1px 1px;
  margin: 0px 0px 0.25em;
`;
