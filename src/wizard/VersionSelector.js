import React from "react";
import { Grid, InputLabel, Typography, Select, MenuItem, Chip } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { ALL_MAINTENANCE_QUERY } from "./Queries";

const VersionSelect = ({ versions = [""], onChange = () => {} }) => {
  const { data, loading } = useQuery(ALL_MAINTENANCE_QUERY);

  const [version, setVersion] = React.useState(versions[0]);

  React.useEffect(() => {
    if (data && data.allMaintenance) {
      console.log("version set");
      setVersion(data.allMaintenance[0]);
    }
  }, [data]);

  if (loading) {
    return <div />;
  }

  const handleChange = (event) => {
    setVersion(event.target.value);
    // ctx.setVersionByName(event.target.value, ctx.validMaintenance);
  };

  // if (!ctx.activeVersion) return <div />;
  return (
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs={12}>
        <Typography variant="h6">Version Information</Typography>
      </Grid>
      <Grid item xs={2}>
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
        <strong>Release Date:</strong>
        <Typography>{ctx.activeVersion.date.slice(0, 10)}</Typography>
        <Chip label={`${ctx.activeVersion.nryears} years old`} />
      </Grid>
      <Grid item xs={12} alignContent="flex-start">
        <Typography>{ctx.activeVersion["Are checks Required?"]}</Typography>
      </Grid>
    </Grid>
  );
};

export default VersionSelect;
