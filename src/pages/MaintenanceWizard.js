import { Backdrop, Modal } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { MessageCircle } from "react-feather";
import ReleaseInformation from "../wizard/ReleaseInformation";
// import VersionList from "wizard/VersionList.js";
// import { maint } from "./maintenance.json";
import EditWizardDetails from "./../wizard/EditWizardDetails";
import { ALL_MAINTENANCE_QUERY } from "./../wizard/Queries";

const TextOrTypography = ({ edit = false, children = "" }) => {
  const [value, setValue] = React.useState(children);
  function handleChange(e) {
    setValue(e.target.value);
  }

  if (edit) {
    return <TextField variant="outlined" multiline rows="2" value={value} onChange={handleChange} />;
  } else {
    return <Typography>{children}</Typography>;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    top: "200px",
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  paper: {
    padding: 10,
    marginTop: 10
  },
  grid: {
    minHeight: 150
  },
  left: {
    gridColumn: 1
  },
  right: {
    gridColumn: 2
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

let defaultValue = {
  version: "",
  date: "",
  nryears: 3,

  mm_ended: "No",
  solutions: "Yes",
  defects: "Yes",
  data_corruption: "Yes",
  portingset: "Yes",
  communication: "Your version is under Mainstream maintenance."
};
defaultValue["Are checks Required?"] = ".";
defaultValue["Check if Customer is entitled for Extended Maintenance?"] = "N/A";

export const RootContext = React.createContext({
  activeVersion: defaultValue,
  setVersionByName: (name, valid) => {},
  checksRequired: false,
  validMaintenance: true,
  setValidMaintenance: a => {}
});

// const RootContextProvider = ({ children }) => {
//   const [activeVersion, setActiveVersion] = React.useState(maint[0]);
//   const [checksRequired, setChecksRequired] = React.useState(false);
//   const [validMaintenance, toggleValidMaintenance] = React.useState(true);
//   const { data, loading } = useQuery(ALL_MAINTENANCE_QUERY);

//   React.useEffect(() => {
//     setActiveVersion(data && data.allMaintenance ? data.allMaintenance[0] : maint[0]);
//     console.log("here");
//   }, [data]);

//   if (loading || !data) return <div />;
//   console.log({ data });
//   function setVersionByName(name, valid) {
//     let found = maint.filter(o => o.version === name);
//     console.log(found, found.length);
//     let index = 0;
//     if (found.length > 1) {
//       setChecksRequired(true);
//     } else {
//       toggleValidMaintenance(true);
//       setChecksRequired(false);
//     }

//     if (!valid) index = 1;
//     if (found) {
//       // if (valid) {
//       //   found = found.filter()
//       // }

//       setActiveVersion(found[index]);
//     }
//   }
//   function setValidMaintenance(val) {
//     toggleValidMaintenance(val);
//     setVersionByName(activeVersion.version, val);
//   }
//   return (
//     <RootContext.Provider
//       value={{
//         activeVersion,
//         setVersionByName,
//         checksRequired,
//         validMaintenance,
//         setValidMaintenance
//       }}
//     >
//       {children}
//     </RootContext.Provider>
//   );
// };

const MaintenanceInformation = () => {
  const classes = useStyles();
  const { activeVersion, checksRequired, validMaintenance, setValidMaintenance } = React.useContext(RootContext);
  const handleCustomerHasValidMaintenance = event => {
    setValidMaintenance(!validMaintenance);
  };
  if (!checksRequired) return <div />;
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Maintenance Information</Typography>
      <Grid container spacing={2} justify="center">
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch
                checked={validMaintenance}
                disabled={!checksRequired}
                onChange={handleCustomerHasValidMaintenance}
                value={validMaintenance}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={
              validMaintenance ? (
                <div style={{ color: "green" }}>Valid Maintenance 👍</div>
              ) : (
                <div style={{ color: "red" }}>Not Valid Maintenance 👎</div>
              )
            }
          />
          <Typography>How to check if customer has valid maintenance</Typography>
        </Grid>
        <Grid item xs={3}>
          <strong> If Customers wanted to have Extended Maintenance they were able to contract it since…</strong>
          <Typography variant="h3">{activeVersion.xm_date_since.slice(0, 10)}</Typography>
        </Grid>
        <Grid item xs={3}>
          <strong> Extended maintenance ended/will end</strong>
          <Typography>{activeVersion.xm_end_date.slice(0, 10)}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>
            Customers should be aware that after this date, they will only be able to benefit from Pre-existing
            solutions, no new Defects can be logged
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Field = ({ name, label, edit = false, Icon, activeVersion }) => {
  const classes = useStyles(null);
  // const { activeVersion } = React.useContext(RootContext);
  console.log("Field", name, activeVersion);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(activeVersion[name]);
  const [editable, toggleEdit] = React.useState(edit);
  function handleChange(e) {
    setValue(e.target.value);
  }

  React.useEffect(() => {
    console.log("refresh", name, value, activeVersion);
    setValue(activeVersion[name]);
  }, [activeVersion]);
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        // className={classes.grid}
      >
        <Grid item xs={6}>
          <Typography variant="h6">
            {Icon ? <Icon color="#73398d"></Icon> : <div />}
            {label}
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ display: "flex" }}>
          <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />
        </Grid>
        <Modal
          onClose={() => setisOpened(false)}
          open={isOpen}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div>
            <EditWizardDetails onClose={() => setisOpened(false)} name={name} label={label} value={value} />
          </div>
        </Modal>
      </Grid>
      {editable ? (
        <TextField variant="outlined" multiline fullWidth rows="2" value={value} onChange={handleChange} />
      ) : (
        <Typography>{activeVersion[name]}</Typography>
      )}
    </Paper>
  );
};

export default () => {
  const classes = useStyles(null);
  const [versions, setVersions] = useState([]);
  const [activeVersion, setActiveVersion] = React.useState({});
  const { loading, data } = useQuery(ALL_MAINTENANCE_QUERY);

  console.log(loading);
  useEffect(() => {
    setVersions(data.allMaintenance || []);
    console.log("🐱‍🏍🐱‍🏍🐱‍🏍versions", data.allMaintenance);
    setActiveVersion(data && data.allMaintenance && data.allMaintenance.length > 0 ? data.allMaintenance[0] : {});
  });
  if (loading) return <div />;
  console.log("👀👀👀", versions, activeVersion);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <VersionList onChangeSelection={() => {}} />
      </Paper>
      <Paper className={classes.paper}>
        <ReleaseInformation versionInfo={null} />>
      </Paper>
      <MaintenanceInformation />
      <Grid container spacing={3} justify="flex-start">
        <Grid item xs={2}>
          <Field name="solutions" label="Provide Solutions" activeVersion={activeVersion} Icon={null} />
        </Grid>
        <Grid item xs={4}>
          <Field name="defects" label="Resolve defects" activeVersion={activeVersion} Icon={null} />
        </Grid>
        <Grid item xs={4}>
          <Field name="data_corruption" label="Fix data corruption" activeVersion={activeVersion} Icon={null} />
        </Grid>
        <Grid item xs={2}>
          <Field name="portingset" label="Access to new Portingsets" activeVersion={activeVersion} Icon={null} />
        </Grid>
        <Grid item xs={6}>
          <Field name="communication" label="Communication" activeVersion={activeVersion} Icon={null} />
        </Grid>
      </Grid>
    </div>
  );
};