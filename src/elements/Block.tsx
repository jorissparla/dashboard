import React from 'react';
import styled from 'styled-components';

const SELECTEDCOLOR = 'rgb(130, 216, 216)';
const SELECTEDCOLORNEW = 'rgb(0,0,0)';
const HOVERCOLOR = '#524763';

function getBGColor(props: any) {
  if (props.selected && props.outline) {
    return HOVERCOLOR;
  }
  return SELECTEDCOLOR;
}

export const Block = styled('button')<{ selected?: boolean; outline?: boolean }>`
  font-family: Poppins;
  color: ${props => (props.selected ? 'black' : 'rgb(69, 69, 69)')};
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${props => getBGColor(props)};
  background-color: ${props => (props.selected ? SELECTEDCOLOR : 'rgb(196, 196, 196)')};
  border-radius: 3px;
  padding: 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  transition: all 0.2s ease 0s;
  :hover {
    background-color: ${HOVERCOLOR};
    color: ${props => (props.selected ? 'white' : 'white')}; // "rgb(69, 69, 69)")};
    cursor: pointer;
  }
`;
export const BlockNew = styled('button')<{ selected?: boolean; outline?: boolean }>`
  font-family: Poppins;
  color: ${props => (props.selected ? 'white' : 'rgb(69, 69, 69)')};
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${props => getBGColor(props)};
  background-color: ${props => (props.selected ? SELECTEDCOLORNEW : 'rgb(196, 196, 196)')};
  border-radius: 3px;
  padding: 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  margin: 5px;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.3);

  transition: all 0.2s ease 0s;
  :hover {
    background-color: ${HOVERCOLOR};
    color: ${props => (props.selected ? 'white' : 'white')}; // "rgb(69, 69, 69)")};
    cursor: pointer;
  }
`;
export const BlockButton = styled('a')<{ background?: string; color?: string }>`
  font-family: Poppins;
  color: ${props => (props.color ? props.color : 'white')};
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${props => (props.background ? props.background : SELECTEDCOLOR)};
  border-radius: 3px;
  padding: 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  transition: all 0.2s ease 0s;
  :hover {
    background-color: ${HOVERCOLOR};
    color: ${props => (props.background ? 'white' : 'white')}; // "rgb(69, 69, 69)")};
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
