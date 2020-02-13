import { Button, TextField, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles: any = (theme: any) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    backgroundColor: 'black'
  },
  TextFieldStyle: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
});

interface Props {
  onDelete: Function;
  classes: any;
}
const deleteCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const SafeDeleteButton: React.FC<Props> = ({ onDelete, classes }) => {
  const [pin, setPin] = React.useState('');
  const [disabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    setEnabled(pin !== deleteCode);
  }, [pin]);
  async function handleChange(e: any) {
    await setPin(e.target.value);
  }
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        disabled={disabled}
        onClick={() => onDelete()}
      >
        {disabled ? `Enter ${deleteCode} to enable delete` : `Delete Item`}
      </Button>
      {disabled && (
        <TextField
          value={pin}
          className={classes.TextFieldStyle}
          onChange={e => handleChange(e)}
          label={`Enter ${deleteCode} to show delete button`}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(SafeDeleteButton);
