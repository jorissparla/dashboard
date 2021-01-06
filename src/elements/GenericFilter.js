// import CloseIcon from "@material-ui/icons/Close";
// import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import React, { useState } from "react";
import TWButton from "./TWButton";

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const DeleteIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Filter = ({
  children,
  open,
  onClose = () => console.log("close"),
  onFilter = () => console.log("filter"),
  onClear = () => console.log("clear"),
  className = "text-gray-700 font-sans",
  onhandleSetFilterActive = () => console.log,
  showRight = true,
  ...rest
}) => {
  // const classes = useStyles();
  const initialValues = {};
  const [values, setValues] = useState(initialValues);

  const handleClear = () => {
    setValues({ ...initialValues });
    onhandleSetFilterActive(false);
    onClear();
    // console.log()
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onhandleSetFilterActive(true);
    onFilter && onFilter(values);
  };

  return (
    <div className="inset-0 flex z-50 bg-gray-700  bg-opacity-50 absolute w-full max-h-full">
      <div
        className={` h-screen inset-y-0 ${showRight ? "right-0" : "left-0"} flex h-full bg-white fixed z-50 shadow-lg rounded pt-10 flex-col  -mt-12`}
      >
        <form {...rest} className="flex flex-col h-full" onSubmit={handleSubmit}>
          <div className="flex items-center ml-2 mt-4">
            <TWButton onClick={onClose} color="transp">
              <CloseIcon className="mr-2" />
              Close
            </TWButton>
            {onClear && (
              <TWButton color="teal" onClick={handleClear} className="w-28 flex items-center space-x-1">
                <DeleteIcon className="mr-2" />
                <span>Clear</span>
              </TWButton>
            )}
            {/* <TWButton color="primary" type="submit" variant="contained">
              Apply filters
            </TWButton> */}
          </div>
          <div className="flex p3">
            <div className="ml-4 flex justify_beween ">{children}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
