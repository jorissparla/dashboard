import { useMutation } from "@apollo/client";
import { Backdrop, Modal } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useAlert } from "globalState/AlertContext";
import React, { useRef } from "react";
import MarkDownFieldEditor from "./MarkdownFieldEditor";

const EditableMarkDownField = ({ canEdit = true, name, label, value, id, updateQuery }) => {
  const [isOpen, setisOpened] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState(value);
  const alert = useAlert();
  // const [editable, toggleEdit] = React.useState(canEdit);

  const [updateMutution] = useMutation(updateQuery);
  async function handleSaveAndClose(value) {
    // console.log({ variables: { id, [name]: value } });
    setFieldValue(value);
    setisOpened(false);
    const input = { id };
    input[name] = value;
    console.log({ input });
    await updateMutution({ variables: { input } });
    alert.setMessage("Thank you for updating " + label);
  }

  const viewer = useRef(null);
  return (
    <div className="text-gray-700 px-4 py-4 font-sans bg-gray-50">
      <div item xs={9}>
        <span className="text-lg font-semibold font-sans">{label}</span>
      </div>
      <div
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        justifyContent="flex-end"
      >
        {canEdit || (true && <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />)}
      </div>
      <Modal
        onClose={() => setisOpened(false)}
        open={isOpen}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <MarkDownFieldEditor
            onClose={() => setisOpened(false)}
            onSaveAndClose={handleSaveAndClose}
            name={name}
            label={label}
            value={fieldValue}
            id={id}
          />
        </div>
      </Modal>
      <div className="bg-white px-4 " dangerouslySetInnerHTML={{ __html: fieldValue }}></div>
    </div>
  );
};

export default EditableMarkDownField;
