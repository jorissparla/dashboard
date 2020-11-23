import React, { useState, useEffect } from "react";
import "./Spinner.css";

// const texts = ['Just a few seconds more...', 'working on it...', 'Almost there..'];

const Spinner = ({ loadingMessage = "" }) => {
  return (
    <>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
      {loadingMessage && <div className="largeheader fade-in">{loadingMessage}</div>}
    </>
  );
};
export default Spinner;
