import React from 'react';
import { Grid, Typography, Divider, Paper, Switch, FormControlLabel } from '@material-ui/core';
import { format } from 'date-fns';
import { SimpleField } from './SimpleField';
import { Field } from './Field';
import { useStyles } from './useStyles';

function ReleaseInformation({ versionInfo, handleCustomerHasValidMaintenance, validMaintenance }) {
  const [valid, setValid] = React.useState(validMaintenance);
  if (versionInfo === {} || !versionInfo) return <div />;
  // const { version: versionInfo } = useContext(RootContext);
  const {
    version,
    nryears,
    checksrequired,
    date,
    entitled_extended_maintenance,
    xm_end_date,
    xm_date_since
  } = versionInfo;
  const versionDate = parseInt(date);
  console.log('rendering releaseinfor', versionInfo, version);

  console.log(checksrequired);

  function handleChange(e) {
    console.log(validMaintenance);
    setValid(!valid);
    handleCustomerHasValidMaintenance();
  }
  return (
    <div>
      <Grid container>
        <Grid
          container
          xs={2}
          justify="flex-start"
          alignItems="center"
          style={{ flexDirection: 'column' }}
        >
          <Grid>
            <Typography variant="subtitle1">{`${version} was Released on `}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h3">{`${format(versionDate, 'yyyy')}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h4">{`${format(versionDate, 'MMMM')}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">{`${format(versionDate, 'EEEE, dd')}`}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          xs={2}
          justify="flex-start"
          alignItems="center"
          style={{ flexDirection: 'column' }}
        >
          <Grid>
            <Typography variant="subtitle1">This was</Typography>
          </Grid>
          <Grid>
            <Typography variant="h3">{`${nryears}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h4">{` years ago`}</Typography>
          </Grid>
        </Grid>

        {entitled_extended_maintenance !== 'N/A' && (
          <Grid
            container
            xs={2}
            justify="flex-start"
            alignItems="center"
            style={{ flexDirection: 'column' }}
          >
            <Grid>
              <Typography variant="h4">Extended Maintenance</Typography>
            </Grid>
            <Grid>
              <Typography>{`Start: ${format(parseInt(xm_date_since), 'dd-MMM-yyyy')}`}</Typography>
            </Grid>
            <Grid>
              <Typography>{`End: ${format(parseInt(xm_end_date), 'dd-MMM-yyyy')}`}</Typography>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          xs={6}
          justify="flex-end"
          alignItems="flex-end"
          style={{ flexDirection: 'column' }}
        >
          <Grid item xs={12}>
            <SimpleField name="checksrequired" label="" activeVersion={versionInfo} bigger={true} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
function MaintenanceCheck({ versionInfo, handleCustomerHasValidMaintenance, validMaintenance }) {
  const [valid, setValid] = React.useState(validMaintenance);
  const classes = useStyles();
  if (versionInfo === {} || !versionInfo) return <div />;
  // const { version: versionInfo } = useContext(RootContext);
  const { version, checksrequired, date, entitled_extended_maintenance } = versionInfo;
  console.log('rendering MaintenanceCheck', versionInfo, version);

  console.log(checksrequired);

  function handleChange(e) {
    console.log(validMaintenance);
    setValid(!valid);
    handleCustomerHasValidMaintenance();
  }

  if (entitled_extended_maintenance !== 'N/A')
    return (
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Typography>Does the customer have extended maintenance?</Typography>
            <Grid item>No</Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={validMaintenance}
                  disabled={!checksrequired}
                  onChange={handleChange}
                  value={valid}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label=""
            />
            <Grid item>Yes</Grid>

            <Typography>Please check entitlement for extended maintenance below</Typography>
            <SimpleField name="checklink" label="" activeVersion={versionInfo} />
          </Grid>
        </Grid>
      </Paper>
    );
  else return <div />;
}

export default ReleaseInformation;
export { MaintenanceCheck };
