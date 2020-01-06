import React from "react";
import Paper from "@material-ui/core/Paper";

const styles = {
  containerStyle: {
    backGround: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#EEE",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: "0px", height: "2px" },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: "15px",
    padding: "10px",
    marginRight: "5px",
    marginTop: "10px",
    alignItems: "flex-start",
    flexDirection: "column",
    flex: 1,
    height: "80%",
    minWidth: "200px"
  }
};

export const Card = props => {
  const cardStyle = { ...styles.containerStyle, ...props.style };
  return <Paper style={cardStyle}>{props.children}</Paper>;
};
