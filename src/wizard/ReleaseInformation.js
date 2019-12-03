import React from 'react';
import { Grid, Typography, Divider, Paper, Switch, FormControlLabel } from '@material-ui/core';
import { format } from 'date-fns';
import { SimpleField } from './SimpleField';

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
            <Typography variant="h3">{`${format(versionDate, 'YYYY')}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h4">{`${format(versionDate, 'MMMM')}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">{`${format(versionDate, 'dddd, DD')}`}</Typography>
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
          <Grid item xs={3}>
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
              label={
                validMaintenance ? (
                  <div style={{ color: 'green' }}>Valid Maintenance 👍</div>
                ) : (
                  <div style={{ color: 'red' }}>No Valid Maintenance 👎</div>
                )
              }
            />
            <Typography>
              Before doing anything else, please check if the customer is entitled to Extended
              Maintenance
            </Typography>
            <SimpleField name="checklink" label="" activeVersion={versionInfo} />
          </Grid>
        )}
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
              <Typography>{`Start: ${format(parseInt(xm_date_since), 'DD-MMM-YYYY')}`}</Typography>
            </Grid>
            <Grid>
              <Typography>{`End: ${format(parseInt(xm_end_date), 'DD-MMM-YYYY')}`}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default ReleaseInformation;
