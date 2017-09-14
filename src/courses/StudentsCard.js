import React from "react";

import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";

const StudentsCard = ({ students }) => (
  <div>
    <Divider />
    {students.map(student => (
      <Avatar src={`https://randomuser.me/api/portraits/men/43.jpg`} />
    ))}
  </div>
);

export default StudentsCard;
