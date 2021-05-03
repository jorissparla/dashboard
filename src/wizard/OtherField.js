import { ALL_MAINTENANCE_QUERY, MAINTENANCE_FAQ_QUERY, MUTATION_UPDATE_MAINTENANCE_FAQ } from "./Queries";
import React, { useEffect } from "react";

import { DashBoardContext } from "globalState/Provider";
import HTMLEditor from "common/HTMLEditor";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import { useMutation } from "@apollo/client";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const OtherField = ({ name, label, edit = false, Icon, text, id, bigger = false, blue = false, productline = "LN" }) => {
  const { role = "Guest" } = React.useContext(DashBoardContext);
  const canEdit = role === "Admin";
  const alert = useAlert();
  const config = !canEdit
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
  // const { activeVersion } = React.useContext(RootContext);
  const [value, setValue] = React.useState(text);
  // console.log('refresh', name, value, activeVersion);
  // console.log('Field', name, text, value);
  const mutation = MUTATION_UPDATE_MAINTENANCE_FAQ;
  const [updateField] = useMutation(mutation);
  useEffect(() => {
    setValue(text);
    console.log("change", text);
  }, [text, name]);

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
    // onClose();
  };
  console.log(id);

  if (productline !== "LN" && (name === "text" || name === "localizations")) return <div />;
  console.log("name", name, productline);

  return (
    <div
      className="bg-white m-2 p-2 rounded shadow-lg"
      // style={{ background: `${blue ? "aliceblue" : "lightyellow"}` }}
    >
      <div className="flex items-center pb-2">
        <div>
          <div className="text-blue-500 font-sans font-semibold text-xl w-full">
            {Icon ? <Icon color="#73398d" style={{ cursor: "pointer" }}></Icon> : <div />}
            {label}
          </div>
        </div>
        <div className="flex items-center" item xs={3} style={{ display: "flex", justifyContent: "flex-end" }}>
          {canEdit && (
            // <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />
            <TWButton color="transp" className="font-sans" onClick={handleSubmit}>
              Save Content
            </TWButton>
          )}
        </div>
      </div>
      <HTMLEditor value={value} onChange={(data) => setValue(data)} enabled={canEdit} />
    </div>
  );
};
// other editor
