import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Block, BlockNew } from "elements/Block";
import { ALL_MAINTENANCE_QUERY } from "../wizard/Queries";
import { usePersistentState } from "hooks";
import MaintenanceWizard from "wizard/MaintenanceWizard";
import { Typography } from "@material-ui/core";
import Spinner from "utils/spinner";
import { DashBoardContext } from "globalState/Provider";

const ALL_VERSIONS = gql`
  query ALL_VERSIONS {
    allMaintenance {
      version
    }
  }
`;

const VersionList = () => {
  const [selectedVersion, setSelectedVersion] = usePersistentState("activeVersion", "INFOR LN 10.7");

  const { data, loading } = useQuery(ALL_MAINTENANCE_QUERY);
  let versions = [];
  const { allMaintenance } = data;

  function handleChange(version) {
    console.log("version", version);
    setSelectedVersion(version);
    // setActiveVersions(allMaintenance.filter(v => v.version === version));
  }
  if (loading) return <Spinner />;

  let activeVersions = allMaintenance.filter(v => v.version === selectedVersion);
  versions = [...new Set(allMaintenance.map(v => v.version))];
  console.log("activeVersion", activeVersions, allMaintenance, selectedVersion);
  return (
    <div>
      {versions.map((version, index) => (
        <BlockNew key={index} selected={selectedVersion === version} onClick={() => handleChange(version)}>
          {version}
        </BlockNew>
      ))}
      {/* {JSON.stringify(selectedVersion, null, 2)} */}
      {activeVersions.length > 0 ? (
        <MaintenanceWizard activeVersions={activeVersions} />
      ) : (
        <Typography>Select a version</Typography>
      )}
    </div>
  );
};

export default VersionList;
