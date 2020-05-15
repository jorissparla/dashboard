import React from "react";

const styles = {
  containerStyle: {
    borderBottomWidth: "1px",
    padding: "2px",
    backgroundColor: "#fff",
    flexDirection: "row",
    display: "flex",
    flex: 1,
    marginTop: "3px",
    alignItems: "space-between",
  },
};

const CardSection = (props) => {
  const cardSectionStyle = { ...styles.containerStyle, ...props.style };
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
