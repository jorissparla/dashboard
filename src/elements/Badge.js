import React from "react";
import styled from "styled-components";

// const BadgeWrapper = styled.span`
//   display: inline-block;
//   margin: 0 0.25rem;
//   border-radius: 3px;
//   border: 1px solid ${props => (props.color ? props.color : "#2eca13")};
//   background: ${props => (props.color ? props.color : "#2eca13")};
//   color: white;
//   letter-spacing: 0.2rem;
//   padding: 0 0.5rem;
//   font-family: "Lato", sans-serif;
//   font-size: ${props => (props.small ? "10.5px" : "1.2rem")};
// `;
export default function Badge({ title = "Farm", children, isVisible = false, color = "bg-teal-300", small }) {
  return (
    <div className="flex flex-col">
      <span
        // style={{ background: `${color ? color : "#2eca13"}` }}
        className={`${color}  font-pop rounded shadow text-white text-sm tracking-widest  border-teal-800 mx-1 px-4 h-10 flex items-center min-w-12 overflow-hidden`}
      >
        {title}
      </span>
      <span className="border border-b border-b-green mx-1 px-4 flex flex-col text-center align-middle  justify-items-center rounded-b text-2xl bg-white shadow pb-1 font-semibold text-gray-600 ">
        {children}
      </span>
    </div>
  );
}
