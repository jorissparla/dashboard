import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { maint } from './maintenance.json';

const TextOrTypography = ({ edit = false, children = '' }) => {
  const [value, setValue] = React.useState(children);
  function handleChange(e) {
    setValue(e.target.value);
  }

  if (edit) {
    return (
      <TextField variant="outlined" multiline rows="2" value={value} onChange={handleChange} />
    );
  } else {
    return <Typography>{children}</Typography>;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    top: '200px',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  paper: {
    padding: 10,
    marginTop: 10
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
  version: '',
  date: '',
  nryears: 3,

  mm_ended: 'No',
  solutions: 'Yes',
  defects: 'Yes',
  data_corruption: 'Yes',
  portingset: 'Yes',
  communication: 'Your version is under Mainstream maintenance.'
};
defaultValue['Are checks Required?'] = '.';
defaultValue['Check if Customer is entitled for Extended Maintenance?'] = 'N/A';

export const RootContext = React.createContext({
  activeVersion: defaultValue,
  setVersionByName: (name, valid) => {},
  checksRequired: false,
  validMaintenance: true,
  setValidMaintenance: a => {}
});

const RootContextProvider = ({ children }) => {
  const [activeVersion, setActiveVersion] = React.useState(maint[0]);
  const [checksRequired, setChecksRequired] = React.useState(false);
  const [validMaintenance, toggleValidMaintenance] = React.useState(true);

  function setVersionByName(name, valid) {
    let found = maint.filter(o => o.version === name);
    console.log(found, found.length);
    let index = 0;
    if (found.length > 1) {
      setChecksRequired(true);
    } else {
      toggleValidMaintenance(true);
      setChecksRequired(false);
    }

    if (!valid) index = 1;
    if (found) {
      // if (valid) {
      //   found = found.filter()
      // }

      setActiveVersion(found[index]);
    }
  }
  function setValidMaintenance(val) {
    toggleValidMaintenance(val);
    setVersionByName(activeVersion.version, val);
  }
  return (
    <RootContext.Provider
      value={{
        activeVersion,
        setVersionByName,
        checksRequired,
        validMaintenance,
        setValidMaintenance
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

const MaintenanceInformation = () => {
  const classes = useStyles();
  const { activeVersion, checksRequired, validMaintenance, setValidMaintenance } = React.useContext(
    RootContext
  );
  const handleCustomerHasValidMaintenance = event => {
    setValidMaintenance(!validMaintenance);
  };
  if (!checksRequired) return <div />;
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Maintenance Information</Typography>
      <Grid container spacing={2} justify="center">
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch
                checked={validMaintenance}
                disabled={!checksRequired}
                onChange={handleCustomerHasValidMaintenance}
                value={validMaintenance}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Customer has Valid Maintenance"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong> XM started:</strong>
            {activeVersion.xm_date_since.slice(0, 10)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong> XM ended:</strong>
            {activeVersion.xm_end_date.slice(0, 10)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Field = ({ name, label, edit = false }) => {
  const classes = useStyles();
  const { activeVersion } = React.useContext(RootContext);
  const [value, setValue] = React.useState(activeVersion[name]);
  const [editable, toggleEdit] = React.useState(edit);
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <Paper className={classes.paper}>
      <Grid container xs={12} direction="row" justify="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">{label}</Typography>
        </Grid>
        <Grid item xs={6} alignItems="flex-end">
          <Button variant="contained" onClick={() => toggleEdit(!editable)}>
            <EditIcon />
          </Button>
        </Grid>
      </Grid>
      {editable ? (
        <TextField
          variant="outlined"
          multiline
          fullWidth
          rows="2"
          value={value}
          onChange={handleChange}
        />
      ) : (
        <Typography>{activeVersion[name]}</Typography>
      )}
    </Paper>
  );
};

const s = new Set(maint.map(m => m.version));
const arVersions = [...s];
export default () => {
  const classes = useStyles();

  return (
    <RootContextProvider>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <VersionSelect versions={arVersions} />
        </Paper>
        <MaintenanceInformation />
        <Grid container xs={12} spacing={3}>
          <Grid item xs={4}>
            <Field name="solutions" label="Provide Solutions" />
          </Grid>
          <Grid item xs={4}>
            <Field name="defects" label="Resolve defects" />
          </Grid>
          <Grid item xs={4}>
            <Field name="data_corruption" label="Fix data corruption" />
          </Grid>
          <Grid item xs={4}>
            <Field name="portingset" label="Access to new Portingsets" />
          </Grid>
          <Grid item xs={4}>
            <Field name="communication" label="Communication" />
          </Grid>
        </Grid>
      </div>
    </RootContextProvider>
  );
};

const VersionSelect = ({ versions = [''], onChange = () => {} }) => {
  const ctx = React.useContext(RootContext);
  const [version, setVersion] = React.useState(versions[0]);
  const handleChange = event => {
    setVersion(event.target.value);
    ctx.setVersionByName(event.target.value, ctx.validMaintenance);
  };

  return (
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs={12}>
        <Typography variant="h6">Version Information</Typography>
      </Grid>
      <Grid item xs={4}>
        <InputLabel id="demo-simple-select-label">LN/Baan version</InputLabel>
        <Select id="demo-simple-select" value={version} onChange={handleChange}>
          {versions.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4} alignContent="center">
        <Typography>
          <strong>Release Date:</strong> {ctx.activeVersion.date.slice(0, 10)}
        </Typography>
        <Chip label={`${ctx.activeVersion.nryears} years old`} />
      </Grid>
    </Grid>
  );
};
