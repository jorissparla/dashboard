import { Backdrop, Modal } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { DashBoardContext } from "globalState/Provider";
import React, { useRef } from "react";
import MarkDown from "react-markdown/with-html";
import EditWizardDetails from "./EditWizardDetails";

export const SimpleField = ({ name, label, activeVersion }) => {
  const { role = "Guest" } = React.useContext(DashBoardContext);
  // const { activeVersion } = React.useContext(RootContext);
  // console.log('Field', name, activeVersion);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(activeVersion[name]);

  // console.log('refresh', name, value, activeVersion);
  React.useEffect(() => {
    setValue(activeVersion[name]);
  }, [activeVersion, name]);
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
      <Modal
        onClose={() => setisOpened(false)}
        open={isOpen}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <EditWizardDetails onClose={() => setisOpened(false)} name={name} label={label} value={value} id={activeVersion.id} />
        </div>
      </Modal>
      {/* <JoditEditor
        id="description"
        name="description"
        style={{ font: '24px Arial', color: '#000', height: '50px' }}
        ref={viewer}
        value={activeVersion[name]}
        onChange={v => console.log(v)}
        onBlur={e => console.log(e)}
        config={config}
        tabIndex={2} // tabIndex of textarea
      /> */}
      <MarkDown source={activeVersion[name]} escapeHtml={false}></MarkDown>
    </div>
  );
};
