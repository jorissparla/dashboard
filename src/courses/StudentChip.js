import React from "react";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import _ from "lodash";
import pink from "@material-ui/core/colors/pink";
import transparent from "@material-ui/core/colors/deepOrange";
const returnInitials = fullname => {
  return fullname
    .split(" ")
    .map(item => item[0])
    .join("")
    .toUpperCase();
};

const StudentChip = ({ id, fullname, image, handleClick }) => (
  <Chip
    style={{
      margin: 4,
      backgroundColor: "#ededed",
      color: "black"
    }}
    key={id ? `chip_${id}` : _.uniqueId("chip_")}
    onClick={() => handleClick()}
  >
    {image ? (
      <Avatar src={image} />
    ) : (
      <Avatar color={pink} backgroundColor={transparent} style={{ left: 8 }}>
        {returnInitials(fullname)}
      </Avatar>
    )}
    {fullname}
  </Chip>
);

export default StudentChip;
