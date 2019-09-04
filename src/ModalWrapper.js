import React, { Component } from 'react';
import styled from 'styled-components';
import Portal from './Portal';

export default class Modal extends Component {
  render() {
    const { children, toggle, on, height = 100 } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalCard height={height}>
              <CloseButton onClick={toggle}>&times;</CloseButton>
              <div>{children}</div>
            </ModalCard>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  position: absolute;
  top: ${props => `${props.top}rem`};
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const ModalCard = styled.div`
  top: 10vh;
  width: 90vw;
  height: ${props => `${props.height}%`};
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 15px;
  min-width: 320px;
  z-index: 1000;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 100px;
  font-size: 12;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: 0;
  background: transparent;
  font-size: 48px;
  font-weight: 100;
  text-align: center;
  justify-content: center;
  border: none;
  width: 57px;
  height: 57px;
  :hover {
    cursor: pointer;
    background: lightgrey;
    border-radius: 50%;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;
