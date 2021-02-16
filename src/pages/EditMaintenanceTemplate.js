import { useQuery, gql } from "@apollo/client";
import InputTagsDropDown from "common/InputTagsDD";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import { useUserContext } from "globalState/UserProvider";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Spinner from "utils/spinner";
import MaintenanceTemplateField, { useUpdateMaintenanceTemplateField } from "wizard/MaintenanceTemplateField";
const QUERY_SINGLE_VERSION = gql`
  query ALL_MAINTENANCE_VERSIONS($where: MaintenanceTemplateWhere) {
    allmaintenanceVersions(productline: "LN") {
      version
      date
      productline
      extended_startdate
    }
    maintenanceTemplate(where: $where) {
      versions
      id
      name
      checksrequired
      checklink
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

const EditMaintenanceTemplate = () => {
  const [versions, setversions] = useState("");
  const [allversions, setallversions] = useState([]);
  const { id } = useParams();
  const where = { id };
  const { user } = useUserContext();
  const history = useHistory();
  const alert = useAlert();
  const fieldUpdater = useUpdateMaintenanceTemplateField();
  const { data, loading } = useQuery(QUERY_SINGLE_VERSION, { variables: { where } });
  useEffect(() => {
    if (data) {
      setversions(data.maintenanceTemplate.versions);
      setallversions(data.allmaintenanceVersions.slice().map((m) => m.version));
    }
  }, [data]);
  if (loading) return <Spinner />;
  let isValidEditor = false;
  if (user && user.permissions) {
    isValidEditor = user.permissions.some(({ permission }) => permission === "WIZARDEDIT") || user.role === "Admin";
  }
  const template = data.maintenanceTemplate;

  async function handleChangeVersions(v) {
    const where = { id };
    const input = { versions: v };
    await fieldUpdater.update(where, input);
    alert.setMessage("version field updated");
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="m-4 p-2 rounded shadow-lg bg-white">
        <header className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-600">Maintenance Template for {template.name}</h2>

          <TWButton onClick={() => history.push("/maintenancetemplates")}>Back to Templates</TWButton>
        </header>
        <InputTagsDropDown
          label="Versions"
          values={versions}
          listitems={allversions}
          className="ml-8 my-4"
          readOnly={!isValidEditor}
          onChange={handleChangeVersions}
        />
        <MaintenanceTemplateFields initialTemplate={template} />
      </div>
    </div>
  );
};

export const MaintenanceTemplateFields = ({ initialTemplate, forceReadOnly = false }) => {
  const [template, setTemplate] = useState(null);
  useEffect(() => {
    setTemplate(initialTemplate);
  }, [initialTemplate]);
  if (!template) {
    return <div />;
  }
  return (
    <div className="p-2 grid md: grid-cols-3 grid-rows-4 grid-cols-4 divide-y-1 divide-gray-100">
      <MaintenanceTemplateField
        label="Communication before starting"
        name="communication_before"
        initialValue={template.communication_before}
        id={template.id}
        forceReadOnly={forceReadOnly}
      />
      <MaintenanceTemplateField
        label="Communication - refer to ICS"
        name="communication_ics"
        initialValue={template.communication_ics}
        id={template.id}
        forceReadOnly={forceReadOnly}
      />
      <MaintenanceTemplateField
        label="Communication - Other"
        name="communication"
        initialValue={template.communication}
        id={template.id}
        forceReadOnly={forceReadOnly}
      />
      <MaintenanceTemplateField
        label="Communication - Customer Disappointed"
        name=" communication_disappointed"
        initialValue={template.communication_disappointed}
        id={template.id}
        forceReadOnly={forceReadOnly}
      />
      <MaintenanceTemplateField label="Solutions" name="solutions" initialValue={template.solutions} id={template.id} forceReadOnly={forceReadOnly} />
      <MaintenanceTemplateField label="Defects" name="defects" initialValue={template.defects} id={template.id} forceReadOnly={forceReadOnly} />
      <MaintenanceTemplateField
        label="Porting Sets"
        name="portingset"
        initialValue={template.portingset}
        id={template.id}
        forceReadOnly={forceReadOnly}
      />
      <MaintenanceTemplateField
        label="Data Corruption"
        name="data_corruption"
        initialValue={template.data_corruption}
        id={template.id}
        forceReadOnly={forceReadOnly}
      />
    </div>
  );
};

export default EditMaintenanceTemplate;
