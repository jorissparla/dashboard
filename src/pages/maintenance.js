import { useQuery, gql } from "@apollo/client";
import { usePersistentState } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format } from "utils/format";
import differenceInYears from "date-fns/differenceInYears";
import Spinner from "utils/spinner";
import { MaintenanceTemplateFields } from "./EditMaintenanceTemplate";
import TWButton from "elements/TWButton";
import MaintenanceTemplateField from "wizard/MaintenanceTemplateField";

export const ALL_MAINTENANCE_VERSIONS = gql`
  query ALL_MAINTENANCE_VERSIONS {
    allmaintenanceVersions(productline: "LN") {
      version
      date
      productline
      extended_startdate
      sustained_startdate
    }
    allmaintenanceTemplates(productline: "LN") {
      versions
      id
      name
      checklink
      checksrequired
      solutions
      defects
      portingset
      data_corruption
      communication
      communication_ics
      communication_disappointed
      communication_before
    }
  }
`;

function Nav({ children }) {
  return (
    <nav className="p-4">
      <ul className="flex space-x-2  list-none flex-wrap">{children}</ul>
    </nav>
  );
}

function NavVersion({ href, isActive, children, handleClick, isXM }) {
  const history = useHistory();

  return (
    <li className="no-underline my-1 ">
      <button
        onClick={() => handleClick(children)}
        className={`font-sans font-semibold hover:bg-light-blue-100 hover:text-light-blue-500 block px-4 py-2 rounded-md no-underline    ${
          isActive ? "bg-amber-200 text-amber-700  border-2" : "text-gray-600"
        } ${isXM ? "bg-amber-100" : isActive ? "bg-teal-200 text-teal-700 border-teal-300" : "bg-teal-200 text-teal-700"}`}
      >
        {children}
      </button>
    </li>
  );
}

function MaintenanceWizard() {
  const history = useHistory();
  const [activeVersion, setActiveVersion] = usePersistentState("activeMaintenanceVersion", null);
  const [templates, setTemplates] = usePersistentState("template", null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [versions, setVersions] = useState([]);
  const { data, loading } = useQuery(ALL_MAINTENANCE_VERSIONS);
  useEffect(() => {
    if (data) {
      let displayVersions = data.allmaintenanceVersions.slice().sort((item1, item2) => (parseInt(item1.date) > parseInt(item2.date) ? 1 : -1));
      setVersions(displayVersions);
      const firstVersion = displayVersions[0];
      if (activeVersion === "") {
        setActiveVersion(displayVersions[0]);
      }
      const selectedTemplates = data.allmaintenanceTemplates.slice().filter((tpl) => tpl.versions.includes(firstVersion.version));
      setTemplates(selectedTemplates);
      if (selectedTemplates.length > 0) {
        setSelectedTemplate(selectedTemplates[0]);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("activeversion", activeVersion);
    if (data) {
      const selectedTemplates = data.allmaintenanceTemplates.slice().filter((tpl) => tpl.versions.includes(activeVersion.version));
      setTemplates(selectedTemplates);
      if (selectedTemplates.length > 0) {
        setSelectedTemplate(selectedTemplates[0]);
      }
    }
  }, [activeVersion]);
  if (loading) {
    return <Spinner />;
  }
  function versionClicked(v) {
    const newActiveVersion = versions.find((item) => item.version === v);
    setActiveVersion(newActiveVersion);
  }

  function changeSelectedTemplate(id) {
    const currTemplate = data.allmaintenanceTemplates.find((tpl) => tpl.id === id);
    setSelectedTemplate(currTemplate);
  }
  if (!selectedTemplate) return <div></div>;
  return (
    <div className="bg-gray-100 h-screen">
      <div className="m-2 p-2 rounded shadow-lg bg-white">
        <header className="flex items-center justify-between flex-wrap">
          <Nav>
            {versions.map((item, index) => (
              <NavVersion
                isActive={item.version === activeVersion?.version}
                key={item.version}
                handleClick={versionClicked}
                isXM={item.extended_startdate < new Date().getTime()}
              >
                {item.version}
              </NavVersion>
            ))}
          </Nav>
        </header>
        <div className="bg-gray-100 mt-4 border-t border-gray-100">
          <div className="bg-white overflow-hidden flex">
            <div className="px-4 py-5 sm:p-6 flex flex-col">
              <dt className="text-sm font-medium text-gray-500 truncate text-center">{activeVersion.version} was released</dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-900">{format(activeVersion.date, "yyyy, MMMM dd")}</dd>
            </div>
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
              <dt className="text-sm font-medium text-gray-500 truncate text-center">This was </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{differenceInYears(new Date(), parseInt(activeVersion.date))} years ago</dd>
            </div>
            {activeVersion.extended_startdate < new Date().getTime() && (
              <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
                <dt className="text-sm font-medium text-gray-500 truncate text-center">Extended maintenance start date </dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">{format(activeVersion.extended_startdate, "dd MMMM yyyy")} </dd>
              </div>
            )}
            {activeVersion.extended_startdate < new Date().getTime() && (
              <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
                <dt className="text-sm font-medium text-gray-500 truncate text-center">Sustained maintenance start date </dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">{format(activeVersion.sustained_startdate, "dd MMMM yyyy")} </dd>
              </div>
            )}
            {/* <MaintenanceTemplateField name="checklink" label="Link" id={activeVersion.id} value={activeVersion.checklink} /> */}
          </div>

          {/* <span>{activeVersion.extended_startdate = new Date() ? format(activeVersion.extended_startdate, "yyyy-MM-dd") : ""}</span> */}
          <div className="flex justify-between items-center bg-white">
            <div className="mt-4">
              <span className="text-gray-700 font-semibold ">Select</span>
              <div className="mt-2">
                {templates.map((tpl) => (
                  <label key={tpl.id} className="inline-flex items-center x-space-2 m-2">
                    <input
                      type="radio"
                      checked={selectedTemplate.id === tpl.id}
                      className="form-checkbox"
                      name="selectedTemplate"
                      value={tpl.id}
                      onChange={(e) => changeSelectedTemplate(e.target.value)}
                    />
                    <span className="ml-2">{tpl.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <TWButton onClick={() => history.push("/maintenancetemplates")} color="teal" className="h-10">
              To Templates
            </TWButton>
          </div>
        </div>
        <MaintenanceTemplateField
          label="Checks Required?"
          name="checksrequired"
          initialValue={selectedTemplate.checksrequired}
          forceReadOnly={true}
        />
        <MaintenanceTemplateFields initialTemplate={selectedTemplate} forceReadOnly={true} />
        {/* <pre>{JSON.stringify(selectedTemplate)}</pre> */}
      </div>
    </div>
  );
}

export default MaintenanceWizard;
