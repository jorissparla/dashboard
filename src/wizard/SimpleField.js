import { Backdrop, Modal } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { DashBoardContext } from 'globalState/Provider';
import React from 'react';
import MarkDown from 'react-markdown/with-html';
import EditWizardDetails from './EditWizardDetails';
import { useStyles } from './useStyles';

export const SimpleField = ({ name, label, edit = false, Icon, activeVersion }) => {
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
    <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        justifyContent="flex-end"
      >
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
      <MarkDown source={activeVersion[name]} escapeHtml={false}></MarkDown>
    </div>
  );
};
