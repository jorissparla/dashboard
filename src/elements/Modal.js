import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;
const ModalWindow = styled.div`
  position: fixed;
  top: 10%;
  margin-top: 10rem;
  left: 10%;
  width: 50%;
  max-height: 90vh;
  background: white;
  border-radius: 5px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;
export default function Modal({ children, visible = false, setVisible }) {
  return (
    <ModalBackdrop onClick={() => setVisible(false)}>
      <ModalWindow>{children}</ModalWindow>
    </ModalBackdrop>
  );
}
