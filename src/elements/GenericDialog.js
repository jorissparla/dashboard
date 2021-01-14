import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import TWButton from "./TWButton";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   drawer: {
//     width: "60%",
//     maxWidth: "100%",
//   },
//   header: {
//     padding: theme.spacing(2),
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   buttonIcon: {
//     marginRight: theme.spacing(1),
//   },
//   content: {
//     padding: theme.spacing(3),
//     flexGrow: 1,
//   },
//   contentSection: {
//     padding: theme.spacing(2),
//   },
//   contentSectionHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     cursor: "pointer",
//   },
//   contentSectionContent: {},
//   formGroup: {
//     padding: theme.spacing(2),
//   },
//   fieldGroup: {
//     display: "flex",
//     alignItems: "center",
//   },
//   field: {
//     marginTop: 0,
//     marginBottom: 0,
//   },
//   flexGrow: {
//     flexGrow: 1,
//   },
//   addButton: {
//     marginLeft: theme.spacing(1),
//   },
//   tags: {
//     marginTop: theme.spacing(1),
//   },
//   minAmount: {
//     marginRight: theme.spacing(3),
//   },
//   maxAmount: {
//     marginLeft: theme.spacing(3),
//   },
//   radioGroup: {},
//   actions: {
//     padding: theme.spacing(3),
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

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
    <div className="inset-0 flex z-50 bg-gray-700  bg-opacity-50 absolute w-full max-h-full pt-4">
      <div
        className={` pt-8 h-screen inset-y-0 ${
          showRight ? "right-0" : "left-0"
        } flex h-full bg-white fixed z-50 shadow-lg rounded pt-10 flex-col  -mt-12 w-3/4`}
      >
        <form {...rest} className="flex flex-col h-full" onSubmit={handleSubmit}>
          <div className="flex p3">
            <div className="ml-4 flex justify_beween ">{children}</div>
          </div>
        </form>
        <div className="flex items-center ml-2 mb-8">
          <TWButton onClick={onClose} color="transp">
            <CloseIcon className="mr-2" />
            Cancel
          </TWButton>
          <TWButton color="teal" onClick={handleClear} variant="contained">
            Save Details
          </TWButton>
          {/* <TWButton color="primary" type="submit" variant="contained">
              Apply filters
            </TWButton> */}
        </div>
      </div>
    </div>
  );
};

export default Filter;
