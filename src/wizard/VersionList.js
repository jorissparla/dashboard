import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Block } from "elements/Block";
import { RootContext } from "pages/MaintenanceWizard";

const ALL_VERSIONS = gql`
  query ALL_VERSIONS {
    allMaintenance {
      version
    }
  }
`;

const VersionList = ({ onChangeSelection }) => {
  const { activeVersion, setVersionByName } = React.useContext(RootContext);
  const { data, loading } = useQuery(ALL_VERSIONS);
  const [selectedVersion, setSelectedVersion] = React.useState("");
  let versions = [];
  const { allMaintenance } = data;
  React.useEffect(() => {
    setSelectedVersion(versions[0]);
  }, [loading]);
  versions = [...new Set(allMaintenance.map(v => v.version))];

  function handleChange(version) {
    setSelectedVersion(version);
    setVersionByName(version, true);
  }
  if (loading) return <div />;
  return (
    <div>
      {versions.map((version, index) => (
        <Block key={index} selected={selectedVersion === version} onClick={() => handleChange(version)}>
          {version}
        </Block>
      ))}
    </div>
  );
};

export default VersionList;
