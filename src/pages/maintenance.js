import { useQuery, gql } from "@apollo/client";
import { usePersistentState } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format } from "utils/format";
import Spinner from "utils/spinner";

const ALL_MAINTENANCE_VERSIONS = gql`
  query ALL_MAINTENANCE_VERSIONS {
    allmaintenanceVersions(productline: "LN") {
      version
      date
      productline
      extended_startdate
    }
  }
`;

function Nav({ children }) {
  return (
    <nav className="p-4">
      <ul className="flex space-x-2 list-none">{children}</ul>
    </nav>
  );
}

function NavVersion({ href, isActive, children, handleClick }) {
  const history = useHistory();

  return (
    <li className="no-underline">
      <button
        onClick={() => handleClick(children)}
        className={`font-sans font-semibold hover:bg-light-blue-100 hover:text-light-blue-500 block px-4 py-2 rounded-md no-underline ${
          isActive ? "bg-amber-100 text-amber-700" : "text-gray-600"
        }`}
      >
        {children}
      </button>
    </li>
  );
}

function MaintenanceWizard() {
  const [activeVersion, setActiveVersion] = usePersistentState(null);
  const [versions, setVersions] = useState([]);
  const { data, loading } = useQuery(ALL_MAINTENANCE_VERSIONS);
  useEffect(() => {
    if (data) {
      let displayVersions = data.allmaintenanceVersions.slice().sort((item1, item2) => (item1.date > item2.date ? 1 : -1));
      setVersions(displayVersions);
      if (activeVersion === "") {
        setActiveVersion(displayVersions[0]);
      }
    }
  }, []);
  if (loading) {
    return <Spinner />;
  }
  function versionClicked(v) {
    const newActiveVersion = versions.find((item) => item.version === v);
    setActiveVersion(newActiveVersion);
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="m-2 p-2 rounded shadow-lg bg-white">
        <header className="flex items-center justify-between">
          <Nav>
            {versions.map((item, index) => (
              <NavVersion isActive={item.version === activeVersion?.version} key={item.id} handleClick={versionClicked}>
                {item.version}
              </NavVersion>
            ))}
          </Nav>
        </header>
        <h1>{format(activeVersion.date, "yyyy")}</h1>
        <span>{activeVersion.extended_startdate <= new Date() ? format(activeVersion.extended_startdate, "yyyy-MM-dd") : ""}</span>
      </div>
    </div>
  );
}

export default MaintenanceWizard;
