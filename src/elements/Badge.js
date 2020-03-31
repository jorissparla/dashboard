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
export default function Badge({ children, isVisible = false, color, small }) {
  // const props = useSpring(
  //   { opacity: isVisible ? 1 : 0, transform: isVisible ? "scale(1.0)" : "scale(0.2)" },
  //   { config: config.slow }
  // );
  return (
    <div>
      <span
        style={{ background: `${color ? color : "#2eca13"}` }}
        className={`inline-block font-pop rounded shadow-lg text-white tracking-widest text-xl border-teal-800 mx-1 px-4 `}
        color={color}
        small={small}
      >
        {children}
      </span>
    </div>
  );
}
