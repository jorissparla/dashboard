import { useMutation, useQuery } from "@apollo/client";
import { BlockNewer as BlockNew } from "elements/Block";
import { DashBoardContext } from "globalState/Provider";
import { usePersistentState } from "hooks";
import React, { useEffect } from "react";
import Spinner from "utils/spinner";
import MaintenanceWizard from "wizard/MaintenanceWizard";
import { OtherField } from "wizard/OtherField";
import { ALL_MAINTENANCE_QUERY, CREATE_AUDIT_MUTATION_WIZARD } from "../wizard/Queries";

// const ALL_VERSIONS = gql`
//   query ALL_VERSIONS {
//     allMaintenance {
//       version
//     }
//   }
// `;

const VersionList = ({ productline = "LN" }) => {
  console.log("😎", productline);
  const [selectedVersion, setSelectedVersion] = usePersistentState(`${productline}_version`, "INFOR LN 10.7");

  const dbctx = React.useContext(DashBoardContext);

  const [createAudit] = useMutation(CREATE_AUDIT_MUTATION_WIZARD);

  const [faqIsVisible, setShowFAQ] = usePersistentState(`${productline}_faq`, false);
  const [localizationsIsVisible, setLocalizationsVisible] = usePersistentState(`${productline}_local`, false);

  const { data, loading } = useQuery(ALL_MAINTENANCE_QUERY, { variables: { productline } });
  let versions = [];

  useEffect(() => {
    const input = {
      username: dbctx.fullname,
      page: "/maintenancewizard/" + productline,
      linkid: null,
      type: "MaintenanceWizard",
    };
    createAudit({ variables: { input } }).then(console.log);
  }, [createAudit, dbctx.fullname]);

  if (loading || !data) return <Spinner />;
  const { allMaintenance, maintenanceFAQ } = data;
  console.log("MaintenanceFAQ", maintenanceFAQ);

  function handleChange(version) {
    console.log("version", version);
    setSelectedVersion(version);
    setShowFAQ(false);
    setLocalizationsVisible(false);
    // setActiveVersions(allMaintenance.filter(v => v.version === version));
  }
  function handleShowFAQ() {
    setShowFAQ(productline === "LN" && true);
    setLocalizationsVisible(productline === "LN" && true);
  }
  function handleShowLocalizations() {
    setShowFAQ(false);
    setLocalizationsVisible(true);
  }

  let activeVersions = allMaintenance.filter((v) => v.version === selectedVersion);
  versions = [...new Set(allMaintenance.map((v) => v.version))];
  // console.log('activeVersion', activeVersions, allMaintenance, selectedVersion);
  return (
    <div className="h-screen bg-gray-100">
      {versions.map((version, index) => (
        <BlockNew key={index} selected={selectedVersion === version} onClick={() => handleChange(version)}>
          {version}
        </BlockNew>
      ))}
      <BlockNew key={"43242sfsf343^"} selected={faqIsVisible} onClick={() => handleShowFAQ()}>
        FAQ /Language Templates
      </BlockNew>
      <BlockNew key={"45552sfsf343^"} selected={localizationsIsVisible} onClick={() => handleShowLocalizations()}>
        Localizations
      </BlockNew>
      {/* {JSON.stringify(selectedVersion, null, 2)} */}
      {activeVersions.length > 0 ? (
        faqIsVisible && productline === "LN" ? (
          // <h1>{maintenanceFAQ.text}</h1>
          <OtherField
            productline={productline}
            name="text"
            label="Frequently asked Questions"
            text={maintenanceFAQ.text}
            bigger={true}
            id={maintenanceFAQ.id}
          ></OtherField>
        ) : localizationsIsVisible && productline === "LN" ? (
          <OtherField
            productline={productline}
            name="localizations"
            label="Localizations"
            text={maintenanceFAQ.localizations}
            bigger={true}
            id={maintenanceFAQ.id}
          ></OtherField>
        ) : (
          <MaintenanceWizard activeVersions={activeVersions} productline={productline} />
        )
      ) : (
        <div>Select a version</div>
      )}
    </div>
  );
};

export default VersionList;
