import React from "react";

const CardSection = (props) => {
  return (
    <div
      className="flex mt-1 p bg-white items-center "
      // style={cardSectionStyle}
    >
      {props.children}
    </div>
  );
};

export { CardSection };
