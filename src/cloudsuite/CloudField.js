import React, { useRef } from "react";

import { DashBoardContext } from "globalState/Provider";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import HTMLEditor from "common/HTMLEditor";

const CloudField = ({ name, edit = false, Icon, initialValue }) => {
  const { role = "Guest" } = React.useContext(DashBoardContext);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(initialValue[name]);

  const viewer = useRef(null);
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8 }}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        justifyContent="flex-end"
      >
        {role === "Admin" && <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />}
      </Grid>
      <HTMLEditor value={value} onChange={(data) => setValue(data)} enabled={edit} />
    </div>
  );
};
export default CloudField;
