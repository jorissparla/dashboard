import React from 'react';
import './LoadingDots.css';
export default function LoadingDots() {
  return (
    <div class="loader--container">
      <div class="loader">
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--text"></div>
      </div>
    </div>
  );
}
