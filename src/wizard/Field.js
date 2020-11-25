import { useMutation } from "@apollo/client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import { DashBoardContext } from "globalState/Provider";
import { useUserContext } from "globalState/UserProvider";
import React, { useRef } from "react";
import { ALL_MAINTENANCE_QUERY, MAINTENANCE_FAQ_QUERY, MUTATION_UPDATE_MAINTENANCE } from "./Queries";
import { useStyles } from "./useStyles";
import "./field.css";

export const Field = ({ name, label, edit = false, Icon, activeVersion, bigger = false, blue = false }) => {
  const classes = useStyles();
  const viewer = useRef(null);
  const mutation = MUTATION_UPDATE_MAINTENANCE;
  const [updateField] = useMutation(mutation);
  const alert = useAlert();
  const config = {
    readonly: true, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: false,
    // theme: 'dark',
    autoHeight: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
  };

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
  const { role = "Guest" } = React.useContext(DashBoardContext);
  const { user } = useUserContext();
  // const { activeVersion } = React.useContext(RootContext);
  // console.log('Field', name, activeVersion);
  const [isOpen, setisOpened] = React.useState(false);
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
    <div className="p-4 font-sans text-gray-600  bg-blue-200" style={{ background: `${blue ? "aliceblue" : "lightyellow"}` }}>
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
        onInit={(editor) => {
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
      {/* <JoditEditor
        id="description"
        name="description"
        style={{ font: "24px Arial", color: "#000" }}
        ref={viewer}
        value={activeVersion[name]}
        onChange={(v) => console.log(v)}
        onBlur={(e) => console.log(e)}
        config={config}
        tabIndex={2} // tabIndex of textarea
      /> */}
    </div>
  );
};
