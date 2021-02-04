import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditableMarkDownField = ({ canEdit = true, name, label, value, id, updateQuery }) => {
  const [, setisOpened] = useState(false);
  const [fieldValue, setFieldValue] = React.useState(value);
  const alert = useAlert();
  const [readOnly, toggleEdit] = React.useState(canEdit);
  console.log(readOnly);
  const [updateMutution] = useMutation(updateQuery);
  async function handleSaveAndClose() {
    console.log({ variables: { id, [name]: fieldValue } });
    // setFieldValue(value);
    setisOpened(false);
    const input = { id };
    input[name] = fieldValue;
    console.log({ input });
    await updateMutution({ variables: { input } });
    alert.setMessage("Thank you for updating " + label);
  }
  const config = readOnly
    ? {
        toolbar: [""],
      }
    : {
        // toolbar: "",
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
        },
      };
  return (
    <div className="text-gray-700 px-4 py-4 font-sans bg-gray-50">
      <div className="flex justify-between">
        <span className="text-lg font-semibold font-pop">{label}</span>
        {canEdit && (
          <TWButton color="transp" className="font-sans" onClick={handleSaveAndClose}>
            Save Content
          </TWButton>
        )}
      </div>

      <div>
        <CKEditor
          editor={ClassicEditor}
          config={config}
          disabled={readOnly}
          data={fieldValue}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log("Change", { event, editor, data });
            setFieldValue(() => data);
          }}
        />
        {/* <MarkDownFieldEditor
          onClose={() => setisOpened(false)}
          onSaveAndClose={handleSaveAndClose}
          name={name}
          label={label}
          value={fieldValue}
          id={id}
        /> */}
      </div>

      {/* <div className="bg-white px-4 " dangerouslySetInnerHTML={{ __html: fieldValue }}></div> */}
    </div>
  );
};

export default EditableMarkDownField;
