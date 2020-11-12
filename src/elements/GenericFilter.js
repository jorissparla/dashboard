import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState } from "react";
import TWButton from "./TWButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    width: "60%",
    maxWidth: "100%",
  },
  header: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  contentSection: {
    padding: theme.spacing(2),
  },
  contentSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  contentSectionContent: {},
  formGroup: {
    padding: theme.spacing(2),
  },
  fieldGroup: {
    display: "flex",
    alignItems: "center",
  },
  field: {
    marginTop: 0,
    marginBottom: 0,
  },
  flexGrow: {
    flexGrow: 1,
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
  tags: {
    marginTop: theme.spacing(1),
  },
  minAmount: {
    marginRight: theme.spacing(3),
  },
  maxAmount: {
    marginLeft: theme.spacing(3),
  },
  radioGroup: {},
  actions: {
    padding: theme.spacing(3),
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Filter = (props) => {
  const {
    children,
    open,
    onClose = () => console.log("close"),
    onFilter = () => console.log("filter"),
    onClear = () => console.log("clear"),
    className = "text-gray-700 font-sans",
    onhandleSetFilterActive = () => console.log,
    ...rest
  } = props;

  const classes = useStyles();
  const initialValues = {};
  const [values, setValues] = useState(initialValues);

  const handleClear = () => {
    setValues({ ...initialValues });
    onhandleSetFilterActive(false);
    onClear();
    // console.log()
  };

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues((values) => ({
      ...values,
      [field]: value,
    }));
  };
  const handleChange = (event) => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ values });
    onhandleSetFilterActive(true);
    onFilter && onFilter(values);
  };

  // {/* <Drawer anchor="right" classes={{ paper: classes.drawer }} onClose={onClose} open={open}> */}

  return (
    <div className="inset-y-0 right-0 flex z-50 bg-gray-700 bg-opacity-50 absolute w-full">
      <div className="w-2/3 flex h-full bg-white fixed z-50 shadow-lg rounded pt-20 flex-col">
        <form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
          <div className="flex items-center ml-2 mt-4">
            <TWButton onClick={onClose} color="transp">
              <CloseIcon className={classes.buttonIcon} />
              Close
            </TWButton>
            <TWButton color="teal" onClick={handleClear} variant="contained">
              <DeleteIcon className={classes.buttonIcon} />
              Clear
            </TWButton>
            {/* <TWButton color="primary" type="submit" variant="contained">
              Apply filters
            </TWButton> */}
          </div>
          <div className={classes.content}>
            <div className={classes.contentSection}>{children}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
