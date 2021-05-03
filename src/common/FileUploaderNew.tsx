import React, { useState } from "react";

import CopyToClipboard from "react-copy-to-clipboard";
import TWButton from "elements/TWButton";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

// const LINK_PREFIX = 'https://nlbavwdocsup1.infor.com:5001/';

const UPLOAD_FILE_MUTATION = gql`
  mutation UPLOAD_FILE_MUTATION($files: [Upload!]!, $folder: String) {
    multipleUpload(files: $files, folder: $folder) {
      id
      path
      filename
    }
  }
`;

type TWFileUploadProps = {
  httpLinkPrefix?: string;
  link?: string;
  type?: string;
  label?: string;
  readOnly?: boolean;
  setFile?: (name: string) => any | null;
  title?: string;
  showLink?: boolean;
};

const TWFileUpload: React.FC<TWFileUploadProps> = ({
  httpLinkPrefix = "https://nlbavwdocsup1.infor.com:5000/files/",
  link = "\\\\nlbavwdocsup1.infor.com\\SupportCards\\files",
  setFile = null,
  label = "Select a file",
  type = "*",
  showLink = false,
}) => {
  const [fileName, setFileName] = useState("");
  function handleChangeFile(value: string) {
    setFileName(value);
    if (setFile) {
      setFile(value);
    }
  }
  const [uploadFileMutation] = useMutation(UPLOAD_FILE_MUTATION);

  return (
    <div className="flex items-center flex-col">
      <label className="max-w-64 flex justify-center items-center px-2 py-1 text-teal-900 bg-teal-300 rounded-lg shadow-lg tracking-wide  border border-blue-200 cursor-pointer hover:bg-teal-400 hover:text-white">
        <span className="my-1 text-base leading-normal font-pop font-semibold hover:bg-teal-400 hover:text-white">{label}</span>
        <input
          type="file"
          accept={type}
          className="hidden"
          onChange={async ({ target: { files } }) => {
            const { data } = await uploadFileMutation({ variables: { files, folder: link } });
            if (data) {
              const uploadedFile = data.multipleUpload[0].filename;
              console.log("files", uploadedFile);
              handleChangeFile(httpLinkPrefix + uploadedFile);
            }
          }}
        />
      </label>
      {showLink && (
        <CopyToClipboard text={fileName} onCopy={() => console.log("Copied")}>
          <div className="flex flex-col justify-center">
            <a href={fileName} target="_blank_" className="mx-2" rel="noreferrer">
              {fileName}
            </a>
            {fileName && (
              <TWButton title=" click to copy" color="amber" className="w-48">
                Link To Clipboard
              </TWButton>
            )}
          </div>
        </CopyToClipboard>
      )}
    </div>
  );
};

export { TWFileUpload };
export default TWFileUpload;
