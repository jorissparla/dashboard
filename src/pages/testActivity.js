import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder"
import React, { useRef, useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";

const UPLOAD_MUTATION = gql`
  mutation UPLOAD_MUTATION_1($files: [Upload!]!, $folder: String) {
    multipleUpload(files: $files, folder: $folder) {
      id
      path
      filename
    }
  }
`;

const TestActivity = (props) => {
  const [values, setValues] = React.useState("");
  const events = [1, 21, 12, 9, 8, 34, 7, 5, 6];
  const ar = [100, 150, 200, 300, 500, 700, 1000];
  return (
    <div>
      <ol className="p-4">
        {events.map((event, i) => (
          <li className="feed-item relative pb-5 pl-6 border-l-2 border-red-300 last:border-transparent" key={`event${i}`}>
            <time className="block text-gray-500 relative uppercase text-sm -top-1" dateTime="9-25">
              Sep 25
            </time>
            <span className="text">
              Responded to need{"{"}" "{"}"}
              <a href="single-need.php">“Volunteer opportunity”</a>
            </span>
          </li>
        ))}
      </ol>
      <div className="px-4 box-content border-l-8 border-r-8 border-blue-400 border-opacity-50 group space-y-4 w-80 mx-auto">
        {ar.map((x, i) => (
          <div className={`h-16 w-16 bg-blue-200  rounded-lg shadow-xl transform opacity-100  transition ease-in-out delay-${x} duration-100`}></div>
        ))}
      </div>
      <div className="p-10 min-h-0 flex items-center justify-center bg-green-500">
        <div className="px-4 box-content border-l-8 border-r-8 border-green-400 border-opacity-50 group space-y-4 w-80 mx-auto">
          <div className="h-16 w-16 bg-white opacity-25 rounded-lg shadow-xl transform group-hover:opacity-100 group-hover:translate-x-64 transition ease-in-out duration-700"></div>
          <div className="h-16 w-16 bg-white opacity-25 rounded-lg shadow-xl transform group-hover:opacity-100 group-hover:translate-x-64 transition ease-in-out duration-700 delay-200"></div>
          <div className="h-16 w-16 bg-white opacity-25 rounded-lg shadow-xl transform group-hover:opacity-100 group-hover:translate-x-64 transition ease-in-out duration-700 delay-500"></div>
          <div className="h-16 w-16 bg-white opacity-25 rounded-lg shadow-xl transform group-hover:opacity-100 group-hover:translate-x-64 transition ease-in-out duration-700 delay-1000"></div>
        </div>
      </div>
    </div>
    // <div>
    //   bla
    //   <div className="flex text-gray-600 mb-4">
    //     {
    //       // !readOnly ? (
    //       <CKEditor
    //         editor={ClassicEditor}
    //         config={{
    //           toolbar: "",
    //           ckfinder: {
    //             // plugins: [ CKFinder ],
    //             // Upload the images to the server using the CKFinder QuickUpload command.
    //             uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
    //           },
    //         }}
    //         // disabled={readOnly}
    //         data={values}
    //         onInit={(editor) => {
    //           // You can store the "editor" and use when it is needed.
    //           console.log("Editor is ready to use!", editor);
    //           // editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
    //           //   return new MyUploadAdapter(loader);
    //           // };
    //         }}
    //         onChange={(event, editor) => {
    //           const data = editor.getData();
    //           // console.log("Change", { event, editor, data });
    //           setValues(data);
    //         }}
    //       />
    //     }
    //   </div>
    // </div>
  );
};

export default TestActivity;

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open("POST", "https://nlbavwixs.infor.com:4001", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url,
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  _sendRequest(file) {
    // Prepare the form data.
    let data = new FormData();

    data.append("upload", file);
    console.log(data, file);
    data = {
      operations: {
        operationName: "UPLOAD_FILE_MUTATION",
        variables: { files: [null], folder: "\\\\nlbavwixs.infor.com\\images\\news\\" },
        query:
          "mutation UPLOAD_FILE_MUTATION($files: [Upload!]!, $folder: String) {\n  multipleUpload(files: $files, folder: $folder) {\n    id\n    path\n    filename\n    __typename\n  }\n}\n",
      },
      map: { 1: ["variables.files.0"] },
    };
    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    // xhr.send(JSON.stringify(query));
    this.xhr.send(data);
  }
}
