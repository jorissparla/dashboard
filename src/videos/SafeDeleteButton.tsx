import { Button, TextField, withStyles } from "@material-ui/core";
import * as React from "react";
import TWButton from "elements/TWButton";

const styles: any = (theme: any) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    color: "white",
    backgroundColor: "black",
  },
  TextFieldStyle: {
    marginLeft: theme.spacing,
    marginRight: theme.spacing,
    width: 300,
  },
});

interface Props {
  onDelete: Function;
  classes: any;
}
const deleteCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const SafeDeleteButton: React.FC<Props> = ({ onDelete, classes }) => {
  const [pin, setPin] = React.useState("");
  const [disabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    setEnabled(pin !== deleteCode);
  }, [pin]);
  async function handleChange(e: any) {
    await setPin(e.target.value);
  }
  return (
    <div className={classes.root}>
      {disabled ? (
        <TWButton color="greyforbidden" variant="contained" disabled={disabled}>
          Enter {deleteCode} to enable delete
        </TWButton>
      ) : (
        <TWButton color="grey" onClick={() => onDelete()}>
          Delete This Item
        </TWButton>
      )}
      {disabled && (
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <input
            className="form-input block pl-10 w-48 text-gray-600 sm:text-sm sm:leading-5"
            value={pin}
            onChange={(e) => handleChange(e)}
            placeholder={`Enter ${deleteCode} `}
          />
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(SafeDeleteButton);
