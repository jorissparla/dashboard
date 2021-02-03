import { Card, colors } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import TWButton from "elements/TWButton";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";

// import "react-mde/lib/styles/css/react-mde-all.css";

const useStyles = makeStyles((theme) => ({
  root: {
    left: "10%",
    top: "5%",
    position: "absolute",
    width: "80%",
    height: "90%",
    padding: 20,
  },
  saveButton: {
    color: "white",
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
}));

const MarkDownFieldEditor = (props) => {
  const { data, value: defaultValue, className, onClose, onSaveAndClose, onView, label, id, name, ...rest } = props;
  const classes = useStyles();

  const editor = useRef(null);
  const [value, setValue] = useState(defaultValue);
  // const mutation = isFAQ ? MUTATION_UPDATE_MAINTENANCE_FAQ : MUTATION_UPDATE_MAINTENANCE;
  //
  // e.persist();

  // setValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    onSaveAndClose(value);
  };
  console.log(id);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: true,
    // theme: 'dark',
    autoHeight: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
    style: {
      color: "#525252",
      height: "70vh",
    },
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <div title={`Edit ${label}`} />
        <div className="flex items-center justify-start mt-4 w-full z-50 flex-1 flex-col">
          <JoditEditor
            style={{ font: "24px Arial", color: "#000", height: "100%" }}
            ref={editor}
            value={value}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              console.log(newContent);
            }}
          />
        </div>
        <div className="flex mt-2 w-1/5 justify-between items-center">
          <TWButton color="primary" type="submit" variant="contained">
            Save Changes
          </TWButton>
          <TWButton color="teal" onClick={onClose} size="small">
            <CloseIcon className={classes.buttonIcon} />
            Close
          </TWButton>
        </div>
      </form>
    </Card>
  );
};
export default MarkDownFieldEditor;
