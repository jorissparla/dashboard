import { Card, colors } from "@material-ui/core";
import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import HTMLEditor from "common/HTMLEditor";
import TWButton from "elements/TWButton";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
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

  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSaveAndClose(value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <div title={`Edit ${label}`} />
        <div className="flex items-center justify-start mt-4 w-full z-50 flex-1 flex-col">
          <HTMLEditor value={value} onChange={(data) => setValue(data)} />
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
