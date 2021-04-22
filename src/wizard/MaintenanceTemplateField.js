import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import HTMLEditor from "common/HTMLEditor";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import { useUserContext } from "globalState/UserProvider";

const MUTATION_UPDATE_MAINTENANCE_TEMPLATE = gql`
  mutation MUTATION_UPDATE_MAINTENANCE_TEMPLATE($where: MaintenanceTemplateWhere, $input: MaintenanceTemplateInput) {
    updateMaintenanceTemplate(where: $where, input: $input) {
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

export function useUpdateMaintenanceTemplateField() {
  const mutation = MUTATION_UPDATE_MAINTENANCE_TEMPLATE;
  const [updateField] = useMutation(mutation);

  async function update(where, input) {
    const result = await updateField({
      variables: { where, input },
    });
    return result;
  }
  return { update };
}

export const MaintenanceTemplateField = ({ name, label, id, initialValue, className = "", forceReadOnly = false }) => {
  const updater = useUpdateMaintenanceTemplateField();
  const alert = useAlert();

  const { user } = useUserContext();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let isValidEditor = false;
  if (user && user.permissions) {
    isValidEditor = user.permissions.some(({ permission }) => permission === "WIZARDEDIT") || user.role === "Admin";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = { [name]: value };
    const where = { id };
    input[name] = value;
    await updater.update(where, input);
    alert.setMessage(`Content was updated for field '${name}'`);
  };
  const config2 =
    isValidEditor && !forceReadOnly
      ? {
          ckfinder: {
            uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
          },
        }
      : {
          toolbar: "",
        };

  return (
    <div className={`p-4 font-sans text-gray-600`}>
      <div className="flex justify-between pb-2">
        <div>
          <div className="text-blue-400 font-sans font-semibold text-xl w-full">{label}</div>
        </div>
        <div className="flex">
          {isValidEditor && !forceReadOnly && (
            <TWButton color="amber" className="font-sans" onClick={handleSubmit}>
              Save
            </TWButton>
          )}
        </div>
      </div>
      <HTMLEditor value={value} onChange={(data) => setValue(data)} enabled={isValidEditor} />
      {/* <CKEditor
        editor={ClassicEditor}
        config={config2}
        disabled={!isValidEditor}
        data={value}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log("Change", { event, editor, data });
          setValue(data);
        }}
      /> */}
    </div>
  );
};

export default MaintenanceTemplateField;
