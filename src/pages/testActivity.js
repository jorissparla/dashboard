import FileUploader, { TWFileUpload } from "common/FileUploaderNew";
import { useAlert } from "globalState/AlertContext";
import React from "react";
import { useUser } from "User";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder"

const TestActivity = (props) => {
  const all = useUser();
  let email = all?.user ? user.email : "generic";

  function handleSetFile(v) {
    console.log(v);
  }
  const alert = useAlert();
  alert.setTimerSeconds(15000);

  function setFileUploaded(value) {
    alert.setMessage(` file ${value} was uploaded`);
  }
  return (
    <div className="flex flex-wrap">
      <TWFileUpload setFile={setFileUploaded} />
    </div>
  );
};
export default TestActivity;
