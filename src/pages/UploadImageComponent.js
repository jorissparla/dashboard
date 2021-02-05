import React, { useState, createContext, useContext } from "react";
import { TWFileUpload } from "common/FileUploaderNew";
import CopyToClipBoard from "react-copy-to-clipboard";
import { usePersistentState } from "hooks";

const AlertContext = createContext(null);

const AlertContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex items-center flex-col h-screen bg-gray-100">
        {children}
        {isOpen && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">File was uploaded</h3>
              <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                <p>You can copy the location from the link above</p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md  hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AlertContext.Provider>
  );
};

const TestComponent = () => {
  const [file, setFile] = usePersistentState("");
  const [folder, setFolder] = usePersistentState("news");
  const alertContext = useContext(AlertContext);
  console.log("context", alertContext);

  function handleSetFile(f) {
    setFile(f);
    alertContext.setIsOpen(true);
  }
  return (
    <>
      <div className="flex ">
        <TWFileUpload
          link={`\\\\nlbavwixs.infor.com\\images\\${folder}\\`}
          httpLinkPrefix={`https://nlbavwixs.infor.com/images/${folder}/`}
          type="image/*"
          setFile={handleSetFile}
        />
        <div className="ml-2 flex items-baseline">
          <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
            Folder
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="folder"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="form-input block w-full sm:text-sm sm:leading-5"
              placeholder="news"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col m-8 bg-white rounded shadow-lg p-8 bg-cover">
        <CopyToClipBoard text={file} onCopy={() => console.log("Copied")}>
          <span title=" click to copy" className="bg-purple-100 mt-2 mb-2 border border-gray-100 rounded-lg p-2 hover:bg-purp hover:text-white">
            {file}
          </span>
        </CopyToClipBoard>
        <img src={file} alt="" className="w-full object-cover" />
      </div>
    </>
  );
};

const WrappedComponent = () => (
  <AlertContextProvider>
    <TestComponent />
  </AlertContextProvider>
);

export default WrappedComponent;
