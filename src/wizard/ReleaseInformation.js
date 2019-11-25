import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { RootContext } from "pages/MaintenanceWizard";

function ReleaseInformation(props) {
  // const { version: versionInfo } = useContext(RootContext);
  // const { version, nryears, checksrequired, date } = versionInfo;
  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          {/* <Typography>{`Release ${version} was released on ${date}, more than ${nryears} ago`}</Typography> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default ReleaseInformation;
