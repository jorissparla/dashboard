import { Typography } from '@material-ui/core';
import { BlockNew } from 'elements/Block';
import { usePersistentState } from 'hooks';
import React, { useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import Spinner from 'utils/spinner';
import MaintenanceWizard from 'wizard/MaintenanceWizard';
import { OtherField } from 'wizard/OtherField';
import { ALL_MAINTENANCE_QUERY, CREATE_AUDIT_MUTATION_WIZARD } from '../wizard/Queries';
import { DashBoardContext } from 'globalState/Provider';

// const ALL_VERSIONS = gql`
//   query ALL_VERSIONS {
//     allMaintenance {
//       version
//     }
//   }
// `;

const VersionList = () => {
  const [selectedVersion, setSelectedVersion] = usePersistentState(
    'activeVersion',
    'INFOR LN 10.7'
  );

  const dbctx = React.useContext(DashBoardContext);

  const [createAudit] = useMutation(CREATE_AUDIT_MUTATION_WIZARD);

  const [faqIsVisible, setShowFAQ] = usePersistentState('FAQ', false);
  const [localizationsIsVisible, setLocalizationsVisible] = usePersistentState(
    'Localizations',
    false
  );

  const { data, loading } = useQuery(ALL_MAINTENANCE_QUERY);
  let versions = [];

  useEffect(() => {
    const input = {
      username: dbctx.fullname,
      page: '/maintenancewizard',
      linkid: null,
      type: 'MaintenanceWizard'
    };
    createAudit({ variables: { input } }).then(console.log);
  }, [createAudit, dbctx.fullname]);

  if (loading || !data) return <Spinner />;
  const { allMaintenance, maintenanceFAQ } = data;
  console.log('MaintenanceFAQ', maintenanceFAQ);

  function handleChange(version) {
    console.log('version', version);
    setSelectedVersion(version);
    setShowFAQ(false);
    // setActiveVersions(allMaintenance.filter(v => v.version === version));
  }
  function handleShowFAQ() {
    setShowFAQ(true);
    setLocalizationsVisible(false);
  }
  function handleShowLocalizations() {
    setShowFAQ(false);
    setLocalizationsVisible(true);
  }

  let activeVersions = allMaintenance.filter(v => v.version === selectedVersion);
  versions = [...new Set(allMaintenance.map(v => v.version))];
  // console.log('activeVersion', activeVersions, allMaintenance, selectedVersion);
  return (
    <div>
      {versions.map((version, index) => (
        <BlockNew
          key={index}
          selected={selectedVersion === version}
          onClick={() => handleChange(version)}
        >
          {version}
        </BlockNew>
      ))}
      <BlockNew key={'43242sfsf343^'} selected={faqIsVisible} onClick={() => handleShowFAQ()}>
        FAQ
      </BlockNew>
      <BlockNew
        key={'45552sfsf343^'}
        selected={localizationsIsVisible}
        onClick={() => handleShowLocalizations()}
      >
        Localizations
      </BlockNew>
      {/* {JSON.stringify(selectedVersion, null, 2)} */}
      {activeVersions.length > 0 ? (
        faqIsVisible ? (
          // <h1>{maintenanceFAQ.text}</h1>
          <OtherField
            name="text"
            label="Frequently asked Questions"
            text={maintenanceFAQ.text}
            bigger={true}
            id={maintenanceFAQ.id}
          ></OtherField>
        ) : localizationsIsVisible ? (
          <OtherField
            name="localizations"
            label="Localizations"
            text={maintenanceFAQ.localizations}
            bigger={true}
            id={maintenanceFAQ.id}
          ></OtherField>
        ) : (
          <MaintenanceWizard activeVersions={activeVersions} />
        )
      ) : (
        <Typography>Select a version</Typography>
      )}
    </div>
  );
};

export default VersionList;
