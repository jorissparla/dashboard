import { Backdrop, Modal } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { DashBoardContext } from 'globalState/Provider';
import React from 'react';
import MarkDown from 'react-markdown';
import EditCloudFieldDetails from './EditCloudFieldDetails';
import useStyles from './useCloudFieldStyles';

const CloudField = ({ name, label, edit = false, Icon, initialValue }) => {
  const classes = useStyles();
  const { role = 'Guest' } = React.useContext(DashBoardContext);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(initialValue[name]);
  const [editable, toggleEdit] = React.useState(edit);
  function handleChange(e) {
    setValue(e.target.value);
  }

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
        {/* <div>
          <EditCloudFieldDetails
            onClose={() => setisOpened(false)}
            name={name}
            label={label}
            value={value}
            id={initialValue.id}
          />
        </div> */}
      </Modal>
      <MarkDown source={initialValue[name]}></MarkDown>
    </div>
  );
};
export default CloudField;
