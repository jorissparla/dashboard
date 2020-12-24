import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { Field } from "./Field";
import { SimpleField } from "./SimpleField";

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
          <div>
            <span variant="subtitle1">{`${version} was Released on `}</span>
          </div>
          <div>
            <span className="text-6xl font-semibold">{`${format(versionDate, "yyyy")}`}</span>
          </div>
          <div>
            <span className="text-lg font-semibold">{`${format(versionDate, "MMMM")}`}</span>
          </div>
          <div>
            <span className="h5">{`${format(versionDate, "EEEE, dd")}`}</span>
          </div>
        </Grid>

        <Grid container xs={2} justify="flex-start" alignItems="center" style={{ flexDirection: "column" }}>
          <div>
            <span className="font-semibold">This was</span>
          </div>
          <div>
            <span className="text-6xl font-semibold">{`${nryears}`}</span>
          </div>
          <div>
            <span className="font-sans">{` years ago`}</span>
          </div>
        </Grid>

        {entitled_extended_maintenance !== "N/A" && (
          <Grid container xs={2} justify="flex-start" alignItems="center" style={{ flexDirection: "column" }}>
            <div>
              <span className="font-semibold mb-1" variant="h4">
                Extended Maintenance
              </span>
            </div>
            <div>
              <span>{`Start: ${format(parseInt(xm_date_since), "dd-MMM-yyyy")}`}</span>
            </div>
            <div>
              <span>{`End: ${format(parseInt(xm_end_date), "dd-MMM-yyyy")}`}</span>
            </div>
          </Grid>
        )}
        <Grid container xs={6} justify="flex-end" alignItems="flex-end" style={{ flexDirection: "column" }}>
          <div item xs={12}>
            <Field name="checksrequired" label="" activeVersion={versionInfo} bigger={true} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
function MaintenanceCheck({ versionInfo, handleCustomerHasValidMaintenance, validMaintenance }) {
  const [valid, setValid] = React.useState(validMaintenance);

  if (versionInfo === {} || !versionInfo) return <div />;
  // const { version: versionInfo } = useContext(RootContext);
  const { checksrequired, entitled_extended_maintenance } = versionInfo;

  function handleChange(e) {
    setValid(!valid);
    handleCustomerHasValidMaintenance();
  }

  if (entitled_extended_maintenance !== "N/A")
    return (
      <div className="p-4 font-sans bg-white rounded shadow m-2">
        <Grid item xs={12}>
          <Grid component="label" container alignItems="center" spacing={1} style={{ overflow: "hidden" }}>
            <div className="w-full flex items-center justify-between">
              <span className="px-2 ml-4 pb-4 text-blue-500 font-sans font-semibold text-xl">Does the customer have extended maintenance?</span>
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
      </div>
    );
  else return <div />;
}

export default ReleaseInformation;
export { MaintenanceCheck };
