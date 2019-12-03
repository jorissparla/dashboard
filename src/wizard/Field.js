import { Backdrop, Modal } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { DashBoardContext } from 'globalState/Provider';
import React from 'react';
import MarkDown from 'react-markdown';
import EditWizardDetails from './EditWizardDetails';
import { useStyles } from './useStyles';

export const Field = ({ name, label, edit = false, Icon, activeVersion }) => {
  const classes = useStyles();
  const { role = 'Guest' } = React.useContext(DashBoardContext);
  // const { activeVersion } = React.useContext(RootContext);
  // console.log('Field', name, activeVersion);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(activeVersion[name]);
  const [editable, toggleEdit] = React.useState(edit);
  function handleChange(e) {
    setValue(e.target.value);
  }
  // console.log('refresh', name, value, activeVersion);
  React.useEffect(() => {
    setValue(activeVersion[name]);
  }, [activeVersion]);
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        style={{ display: 'flex' }}
      >
        <Grid item xs={6}>
          <Typography variant="h6">
            {Icon ? <Icon color="#73398d" style={{ cursor: 'pointer' }}></Icon> : <div />}
            {label}
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {role === 'Admin' && (
            <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />
          )}
        </Grid>
        <Modal
          onClose={() => setisOpened(false)}
          open={isOpen}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div>
            <EditWizardDetails
              onClose={() => setisOpened(false)}
              name={name}
              label={label}
              value={value}
              id={activeVersion.id}
            />
          </div>
        </Modal>
      </Grid>

      <MarkDown source={activeVersion[name]}></MarkDown>
    </Paper>
  );
};
