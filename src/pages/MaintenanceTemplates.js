import { useQuery, gql } from "@apollo/client";
import InputTagsDropDown from "common/InputTagsDD";
import TWButton from "elements/TWButton";
import React from "react";
import { useHistory } from "react-router";
import Spinner from "utils/spinner";
const ALL_MAINTENANCE_VERSIONS = gql`
  query ALL_MAINTENANCE_VERSIONS {
    allmaintenanceVersions(productline: "LN") {
      version
      date
      productline
      extended_startdate
    }
    allmaintenanceTemplates(productline: "LN") {
      versions
      id
      name
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
export default function MaintenanceTemplates() {
  const { data, loading } = useQuery(ALL_MAINTENANCE_VERSIONS);
  const history = useHistory();
  if (loading) return <Spinner />;
  const versions = data.allmaintenanceVersions.slice().map((m) => m.version);
  function navigate(id) {
    history.push(`maintenancetemplate/${id}`);
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-2 m-2 rounded shadow-lg">
        <header className="flex items-center justify-between flex-wrap">
          <h2 className="font-semibold text-xl text-gray-600">Maintenance Templates </h2>

          <TWButton onClick={() => history.push("/maintenance")}>Back to Versions</TWButton>
        </header>
        <ul className="-mx-2 list-none divide-y-1 divide-gray-100 divide-solid">
          {data.allmaintenanceTemplates.map((tpl) => (
            <li className="px-2 py-2 text-gray-600  ">
              <div className="flex items-center justify-start divide-x-1">
                <button className="font-sans font-semibold underline" onClick={() => navigate(tpl.id)}>
                  {tpl.name}
                </button>
                <InputTagsDropDown listitems={versions} values={tpl.versions} className="ml-8" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
