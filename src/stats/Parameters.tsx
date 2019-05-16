import * as React from 'react';
import { Paper, withStyles, createStyles, Button } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useLocalStorage } from '../utils/useLocalStorage';
import { SharedSnackbarContext } from '../globalState/SharedSnackbar.context';

const styles = createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    margin: 5,
    width: 50,
    padding: '0.5rem',
    fontSize: '16px',
    display: 'flex',
    borderRadius: 4
  },
  flex: {
    display: 'flex',
    margin: 10
  }
});

interface Props {
  param: string;
  initial: string | number;
  classes: any;
  label: string;
  keyUp: any;
  other?: TextFieldProps;
}

const Pazameter: React.FC<Props> = ({ param, initial, classes, label, other, keyUp }) => {
  // const { param, initial } = props;
  const [name, setName] = useLocalStorage(param, initial);
  return (
    <TextField
      value={name}
      type="number"
      style={{ width: '50' }}
      label={label}
      className={classes.textField}
      {...other}
      onChange={(e: { target: { value: any } }) => {
        setName(e.target.value);
        keyUp();
      }}
    />
  );
};

const Parameter = withStyles(styles)(Pazameter);

interface Props {
  history?: any;
}

export const Parameters: React.FC<Props> = props => {
  let snackbar: any;
  snackbar = React.useContext(SharedSnackbarContext);
  console.log(snackbar);
  function handleKeyUp() {
    console.log('Item changes');
    if (snackbar) {
      snackbar.openSnackbar('Item changed');
    }
  }
  return (
    <Paper style={{ margin: 15, padding: 10, display: 'flex', flexDirection: 'column' }}>
      <h2>PARAMETERS</h2>
      <h5>These parameters will be stored and used the next time the Worklist is run</h5>
      <div style={{ margin: 5, display: 'flex' }}>
        <h3>CLOUD</h3>
        <Parameter
          param="C_AWAITINGCUSTOMER"
          initial={7}
          label="Awaiting Customer"
          keyUp={handleKeyUp}
        />
        <Parameter param="C_AWAITINGINFOR" initial={1} label="Awaiting Infor" keyUp={handleKeyUp} />
        <Parameter param="C_RESEARCHING" initial={3} label="Researching" keyUp={handleKeyUp} />
        <Parameter param="C_NEW" initial={1} label="New" keyUp={handleKeyUp} />
      </div>
      <div style={{ margin: 5, display: 'flex' }}>
        <h3>ALL LN</h3>
        <Parameter
          param="N_AWAITINGCUSTOMER"
          initial={7}
          label="Awaiting Customer"
          keyUp={handleKeyUp}
        />
        <Parameter param="N_AWAITINGINFOR" initial={1} label="Awaiting Infor" keyUp={handleKeyUp} />
        <Parameter param="N_RESEARCHING" initial={3} label="Researching" keyUp={handleKeyUp} />
        <Parameter param="N_NEW" initial={1} label="New" keyUp={handleKeyUp} />
        <Parameter
          param="N_SOLUTIONPROPOSED"
          initial={30}
          label="Solutio Proposed"
          keyUp={handleKeyUp}
        />
      </div>
      <div style={{ margin: 5, display: 'flex' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: 200 }}
          onClick={() => props.history.push('/mywork')}
        >
          To Worklist
        </Button>
      </div>
    </Paper>
  );
};
