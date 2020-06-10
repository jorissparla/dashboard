import { Backdrop, Modal } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { DashBoardContext } from "globalState/Provider";
import JoditEditor from "jodit-react";
import React, { useRef } from "react";

import EditWizardDetails from "./EditWizardDetails";
import { useStyles } from "./useStyles";
import { useUser } from "User";
import { useUserContext } from "globalState/UserProvider";

export const Field = ({ name, label, edit = false, Icon, activeVersion, bigger = false, blue = false }) => {
  const classes = useStyles();
  const viewer = useRef(null);
  const config = {
    readonly: true, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: false,
    // theme: 'dark',
    autoHeight: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
  };
  const { role = "Guest" } = React.useContext(DashBoardContext);
  const { user } = useUserContext();
  // const { activeVersion } = React.useContext(RootContext);
  // console.log('Field', name, activeVersion);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(activeVersion[name]);
  let isValidEditor = false;
  if (user && user.permissions) {
    isValidEditor = user.permissions.some(({ permission }) => permission === "WIZARDEDIT") || user.role === "Admin";
  }

  // console.log('refresh', name, value, activeVersion);
  React.useEffect(() => {
    setValue(activeVersion[name]);
  }, [activeVersion, name]);
  return (
    <Paper className="p-4 font-sans text-gray-600" style={{ background: `${blue ? "aliceblue" : "lightyellow"}` }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        className={classes.stretch}
        style={{
          display: "flex",
          flex: "1 0 auto",
          minHeight: "90%",
          height: "100%",
        }}
      >
        <Grid item xs={9}>
          <Typography variant="h6">
            {Icon ? <Icon color="#73398d" style={{ cursor: "pointer" }}></Icon> : <div />}
            {label}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end" }}>
          {isValidEditor && <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />}
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
      </Grid>
      <JoditEditor
        id="description"
        name="description"
        style={{ font: "24px Arial", color: "#000" }}
        ref={viewer}
        value={activeVersion[name]}
        onChange={(v) => console.log(v)}
        onBlur={(e) => console.log(e)}
        config={config}
        tabIndex={2} // tabIndex of textarea
      />
    </Paper>
  );
};
