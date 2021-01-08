// import CloseIcon from "@material-ui/icons/Close";
// import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import React, { useState } from "react";
import { CloseIcon, DeleteIcon } from "./Icons";
import TWButton from "./TWButton";

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
