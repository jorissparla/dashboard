import { Backdrop, Modal } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { DashBoardContext } from 'globalState/Provider';
import React, { useEffect } from 'react';
import MarkDown from 'react-markdown';
import EditWizardDetails from './EditWizardDetails';
import { useStyles } from './useStyles';

export const OtherField = ({
  name,
  label,
  edit = false,
  Icon,
  text,
  id,
  bigger = false,
  blue = false
}) => {
  const classes = useStyles();
  const { role = 'Guest' } = React.useContext(DashBoardContext);
  // const { activeVersion } = React.useContext(RootContext);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(text);
  const [editable, toggleEdit] = React.useState(edit);
  function handleChange(e) {
    setValue(e.target.value);
  }
  // console.log('refresh', name, value, activeVersion);
  console.log('Field', name, text, value);

  useEffect(() => {
    setValue(text);
  }, [text]);

  return (
    <Paper
      className={classes.paper}
      style={{ background: `${blue ? 'aliceblue' : 'lightyellow'}` }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        className={classes.stretch}
        style={{
          display: 'flex',
          flex: '1 0 auto',
          minHeight: '90%',
          height: '100%'
        }}
      >
        <Grid item xs={9}>
          <Typography variant="h6">
            {Icon ? <Icon color="#73398d" style={{ cursor: 'pointer' }}></Icon> : <div />}
            {label}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              id={id}
              faq="true"
            />
          </div>
        </Modal>
      </Grid>

      <MarkDown source={value}></MarkDown>
    </Paper>
  );
};
