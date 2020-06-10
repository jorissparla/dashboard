import { FormControlLabel, Grid, Paper, Switch, Typography } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { SimpleField } from "./SimpleField";
import { useStyles } from "./useStyles";

function ReleaseInformation({ versionInfo, handleCustomerHasValidMaintenance, validMaintenance }) {
  // const [valid, setValid] = React.useState(validMaintenance);
  if (versionInfo === {} || !versionInfo) return <div />;
  // const { version: versionInfo } = useContext(RootContext);
  const {
    version,
    nryears,
    // checksrequired,
    date,
    entitled_extended_maintenance,
    xm_end_date,
    xm_date_since,
  } = versionInfo;
  const versionDate = parseInt(date);

  // function handleChange(e) {
  //   setValid(!valid);
  //   handleCustomerHasValidMaintenance();
  // }
  return (
    <div className="font-sans text-gray-600">
      <Grid container>
        <Grid container xs={2} justify="flex-start" alignItems="center" style={{ flexDirection: "column" }}>
          <Grid>
            <Typography variant="subtitle1">{`${version} was Released on `}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h3">{`${format(versionDate, "yyyy")}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h4">{`${format(versionDate, "MMMM")}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">{`${format(versionDate, "EEEE, dd")}`}</Typography>
          </Grid>
        </Grid>

        <Grid container xs={2} justify="flex-start" alignItems="center" style={{ flexDirection: "column" }}>
          <Grid>
            <div className="font-semibold">This was</div>
          </Grid>
          <Grid>
            <div className="text-5xl font-semibold">{`${nryears}`}</div>
          </Grid>
          <Grid>
            <div variant="h4">{` years ago`}</div>
          </Grid>
        </Grid>

        {entitled_extended_maintenance !== "N/A" && (
          <Grid container xs={2} justify="flex-start" alignItems="center" style={{ flexDirection: "column" }}>
            <Grid>
              <div className="font-semibold" variant="h4">
                Extended Maintenance
              </div>
            </Grid>
            <Grid>
              <div>{`Start: ${format(parseInt(xm_date_since), "dd-MMM-yyyy")}`}</div>
            </Grid>
            <Grid>
              <div>{`End: ${format(parseInt(xm_end_date), "dd-MMM-yyyy")}`}</div>
            </Grid>
          </Grid>
        )}
        <Grid container xs={6} justify="flex-end" alignItems="flex-end" style={{ flexDirection: "column" }}>
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
  const { checksrequired, entitled_extended_maintenance } = versionInfo;

  function handleChange(e) {
    setValid(!valid);
    handleCustomerHasValidMaintenance();
  }

  if (entitled_extended_maintenance !== "N/A")
    return (
      <Paper className="p-4 font-sans">
        <Grid item xs={12}>
          <Grid component="label" container alignItems="center" spacing={1} style={{ overflow: "hidden" }}>
            <div className="w-full flex items-center justify-between">
              <span className="px-2 ml-4 pb-4">Does the customer have extended maintenance?</span>
              <div className="flex items-center mx-10">
                <span className="mx-2">No</span>
                <FormControlLabel
                  control={
                    <Switch
                      checked={validMaintenance}
                      disabled={!checksrequired}
                      onChange={handleChange}
                      value={valid}
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label=""
                />
                <span>Yes</span>
              </div>
            </div>
            <div className="text-sm font-semibold font-sans">Please check entitlement for extended maintenance below</div>
            <SimpleField name="checklink" label="" activeVersion={versionInfo} />
          </Grid>
        </Grid>
      </Paper>
    );
  else return <div />;
}

export default ReleaseInformation;
export { MaintenanceCheck };
