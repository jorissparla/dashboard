import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ReleaseInformation from 'wizard/ReleaseInformation';
import { Field } from './Field';
import { useStyles } from './useStyles';

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

// export const RootContext = React.createContext({
//   activeVersion: defaultValue,
//   setVersionByName: (name, valid) => {},
//   checksRequired: false,
//   validMaintenance: true,
//   setValidMaintenance: a => {}
// });

// const RootContextProvider = ({ children }) => {
//   const [activeVersion, setActiveVersion] = React.useState(maint[0]);
//   const [checksRequired, setChecksRequired] = React.useState(false);
//   const [validMaintenance, toggleValidMaintenance] = React.useState(true);
//   const { data, loading } = useQuery(ALL_MAINTENANCE_QUERY);

//   React.useEffect(() => {
//     setActiveVersion(data && data.allMaintenance ? data.allMaintenance[0] : maint[0]);
//     // console.log('here');
//   }, [data]);

//   if (loading || !data) return <div />;
//   // console.log({ data });
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

const MaintenanceInformation = ({
  activeVersion,
  checksRequired,
  validMaintenance,
  setValidMaintenance
}) => {
  const classes = useStyles();
  // const { activeVersion, checksRequired, validMaintenance, setValidMaintenance } = React.useContext(
  //   RootContext
  // );
  const handleCustomerHasValidMaintenance = event => {
    setValidMaintenance(!validMaintenance);
  };
  if (!activeVersion || activeVersion === {}) return <div />;
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
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={
              validMaintenance ? (
                <div style={{ color: 'green' }}>Valid Maintenance 👍</div>
              ) : (
                <div style={{ color: 'red' }}>Not Valid Maintenance 👎</div>
              )
            }
          />
          <Typography>How to check if customer has valid maintenance</Typography>
        </Grid>
        <Grid item xs={3}>
          <strong>
            {' '}
            If Customers wanted to have Extended Maintenance they were able to contract it since…
          </strong>
          <Typography variant="h3">{activeVersion.xm_date_since.slice(0, 10)}</Typography>
        </Grid>
        <Grid item xs={3}>
          <strong> Extended maintenance ended/will end</strong>
          <Typography>{activeVersion.xm_end_date.slice(0, 10)}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>
            Customers should be aware that after this date, they will only be able to benefit from
            Pre-existing solutions, no new Defects can be logged
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const MaintenanceWizard = ({ activeVersions }) => {
  const classes = useStyles();

  const [validMaintenance, toggleValidMaintenance] = React.useState(true);
  let activeVersion = checkActiveVersion(activeVersions, validMaintenance);

  function checkActiveVersion(vers, maint) {
    if (vers && vers.length > 1) {
      if (maint) {
        return vers[0];
      } else {
        return vers[1];
      }
    } else return vers[0];
  }
  // const { loading, data } = useQuery(ALL_MAINTENANCE_QUERY);
  function handleValidMaintenance() {
    toggleValidMaintenance(!validMaintenance);
    console.log('handleValidMaintenance', activeVersion);
  }
  if (activeVersion === {}) return <div />;
  // console.log('👀👀👀', versions, activeVersion);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ReleaseInformation
          versionInfo={activeVersion}
          handleCustomerHasValidMaintenance={handleValidMaintenance}
          validMaintenance={validMaintenance}
        />
      </Paper>

      <MaintenanceInformation
        version={activeVersion}
        setValidMaintenance={handleValidMaintenance}
        validMaintenance={validMaintenance}
      />
      <Grid item xs={12}>
        <Field name="checksrequired" label="" activeVersion={activeVersion} />
      </Grid>
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="stretch">
        <Grid item xs={3}>
          <Field
            name="comm_before"
            label="Communication before starting"
            activeVersion={activeVersion}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="comm_ics"
            label="Communication - Refer to ICS"
            activeVersion={activeVersion}
          />
        </Grid>
        <Grid item xs={3}>
          <Field name="solutions" label="Solutions" activeVersion={activeVersion} />
        </Grid>
        <Grid item xs={3}>
          <Field name="defects" label="Defects" activeVersion={activeVersion} />
        </Grid>
        <Grid item xs={3}>
          <Field name="communication" label="Other Communication" activeVersion={activeVersion} />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="comm_disappointed"
            label="Communication - Customer disappointed"
            activeVersion={activeVersion}
          />
        </Grid>
        <Grid item xs={3}>
          <Field name="portingset" label="Portingsets" activeVersion={activeVersion} />
        </Grid>
        <Grid item xs={3}>
          <Field name="data_corruption" label="Data corruption" activeVersion={activeVersion} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MaintenanceWizard;
