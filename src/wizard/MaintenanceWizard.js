import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ReleaseInformation, { MaintenanceCheck } from "wizard/ReleaseInformation";
import { Field } from "./Field";

let defaultValue = {
  version: "",
  date: "",
  nryears: 3,

  mm_ended: "No",
  solutions: "Yes",
  defects: "Yes",
  data_corruption: "Yes",
  portingset: "Yes",
  communication: "Your version is under Mainstream maintenance.",
};
defaultValue["Are checks Required?"] = ".";
defaultValue["Check if Customer is entitled for Extended Maintenance?"] = "N/A";

const MaintenanceInformation = ({ activeVersion, checksRequired, validMaintenance, setValidMaintenance }) => {
  // const { activeVersion, checksRequired, validMaintenance, setValidMaintenance } = React.useContext(
  //   RootContext
  // );
  const handleCustomerHasValidMaintenance = (event) => {
    setValidMaintenance(!validMaintenance);
  };
  if (!activeVersion || activeVersion === {}) return <div />;
  return (
    <div className="">
      <Typography variant="h6">Maintenance Information</Typography>
      <Grid container spacing={2} justify="flex-start">
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
                <div style={{ color: "green" }}>
                  Valid Maintenance{" "}
                  <span role="img" aria-label="vm">
                    👍👍
                  </span>
                </div>
              ) : (
                <div style={{ color: "red" }}>
                  Not Valid Maintenance{" "}
                  <span role="img" aria-label="uvm">
                    👎
                  </span>
                </div>
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
            Customers should be aware that after this date, they will only be able to benefit from Pre-existing solutions, no new Defects can be
            logged
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const MaintenanceWizard = ({ activeVersions, productline }) => {
  const [validMaintenance, toggleValidMaintenance] = React.useState(true);
  let activeVersion = checkActiveVersion(activeVersions, validMaintenance);
  const { entitled_extended_maintenance } = activeVersion;

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
    console.log("handleValidMaintenance", activeVersion);
  }
  if (activeVersion === {}) return <div />;
  // console.log('👀👀👀', versions, activeVersion);
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-2 rounded shadow">
        <ReleaseInformation
          versionInfo={activeVersion}
          handleCustomerHasValidMaintenance={handleValidMaintenance}
          validMaintenance={validMaintenance}
        />
      </div>

      <MaintenanceInformation version={activeVersion} setValidMaintenance={handleValidMaintenance} validMaintenance={validMaintenance} />
      <div className="flex w-1/2" container spacing={2} justify="flex-start" style={{ marginTop: 5, marginBottom: 10, paddingLeft: 5 }}>
        {entitled_extended_maintenance !== "N/A" && (
          <div item xs={6}>
            <MaintenanceCheck
              versionInfo={activeVersion}
              handleCustomerHasValidMaintenance={handleValidMaintenance}
              validMaintenance={validMaintenance}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <div container item xs={12} spacing={1} justify="flex-start" alignItems="flex-start">
            <div item xs={12}>
              <Field blue={true} name="comm_before" label="Communication before starting" activeVersion={activeVersion} />
            </div>
            <div item xs={12}>
              <Field blue={true} name="comm_ics" label="Communication - Refer to ICS" activeVersion={activeVersion} text="comm_ics" />
              <div item xs={12}>
                <Field blue={true} name="communication" label="Other Communication" activeVersion={activeVersion} />
              </div>
              <div item xs={12}>
                <Field blue={true} name="comm_disappointed" label="Communication - Customer disappointed" activeVersion={activeVersion} />
              </div>
            </div>
          </div>
        </div>
        <div container direction="column">
          <div container item xs={12} spacing={1}>
            <div item xs={12}>
              <Field name="solutions" label="Solutions" activeVersion={activeVersion} />
            </div>
            <div item xs={12}>
              <Field name="defects" label="Defects" activeVersion={activeVersion} />
            </div>
            <div item xs={12}>
              <Field name="portingset" label="Portingsets" activeVersion={activeVersion} />
            </div>
            <div item xs={12}>
              <Field name="data_corruption" label="Data corruption" activeVersion={activeVersion} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceWizard;
