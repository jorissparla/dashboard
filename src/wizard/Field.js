import { useMutation } from "@apollo/client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import { useUserContext } from "globalState/UserProvider";
import React from "react";
import "./field.css";
import { ALL_MAINTENANCE_QUERY, MAINTENANCE_FAQ_QUERY, MUTATION_UPDATE_MAINTENANCE } from "./Queries";

export const Field = ({ name, label, Icon, activeVersion, blue = false, className = "" }) => {
  const mutation = MUTATION_UPDATE_MAINTENANCE;
  const [updateField] = useMutation(mutation);
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = { id };
    input[name] = value;
    console.log({ input });
    updateField({
      variables: { input },
      refetchQueries: [
        {
          query: ALL_MAINTENANCE_QUERY,
        },
        {
          query: MAINTENANCE_FAQ_QUERY,
        },
      ],
    });
    alert.setMessage(`Content was updated for field '${name}'`);
  };
  const { user } = useUserContext();
  const [value, setValue] = React.useState(activeVersion[name]);
  const id = activeVersion.id;
  let isValidEditor = false;
  if (user && user.permissions) {
    isValidEditor = user.permissions.some(({ permission }) => permission === "WIZARDEDIT") || user.role === "Admin";
  }
  const config2 = !isValidEditor
    ? {
        toolbar: "",
      }
    : {
        // toolbar: "",
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
        },
      };
  // console.log('refresh', name, value, activeVersion);
  React.useEffect(() => {
    setValue(activeVersion[name]);
  }, [activeVersion, name]);
  return (
    <div className={`p-4 font-sans text-gray-600 ${blue ? "bg-blue-100" : "bg-yellow-50"}`}>
      <div container direction="row" justifyContent="space-between" alignItems="flex-start" className="flex justify-between pb-2">
        <div item xs={9}>
          <div className="text-blue-400 font-sans font-semibold text-xl w-full">
            {Icon ? <Icon color="#73398d" style={{ cursor: "pointer" }}></Icon> : <div />}
            {label}
          </div>
        </div>
        <div className="flex">
          {isValidEditor && (
            // <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />

            // <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />
            <TWButton color="transp" className="font-sans" onClick={handleSubmit}>
              Save Content
            </TWButton>
          )}
        </div>
      </div>

      <CKEditor
        editor={ClassicEditor}
        config={config2}
        disabled={!isValidEditor}
        data={value}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
          // editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
          //   return new MyUploadAdapter(loader);
          // };
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log("Change", { event, editor, data });
          setValue(data);
        }}
      />
    </div>
  );
};
