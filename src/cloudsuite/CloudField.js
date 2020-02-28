import { Backdrop, Modal } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { DashBoardContext } from 'globalState/Provider';
import React, { useRef } from 'react';
import MarkDown from 'react-markdown/with-html';
import useStyles from './useCloudFieldStyles';
import JoditEditor from 'jodit-react';

const CloudField = ({ name, label, edit = false, Icon, initialValue }) => {
  const classes = useStyles();
  const { role = 'Guest' } = React.useContext(DashBoardContext);
  const [isOpen, setisOpened] = React.useState(false);
  const [value, setValue] = React.useState(initialValue[name]);
  const [editable, toggleEdit] = React.useState(edit);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: true,
    // theme: 'dark',
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false
  };
  const config2 = { ...config, toolbar: false, readonly: true };
  function handleChange(e) {
    setValue(e.target.value);
  }

  const viewer = useRef(null);
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
      <JoditEditor
        ref={viewer}
        value={value}
        config={config2}
        tabIndex={2} // tabIndex of textarea
        // onBlur={newContent => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => {
        //   console.log(newContent);
        // }}
      />
      {/* <MarkDown source={initialValue[name]} escapeHtml={false}></MarkDown> */}
    </div>
  );
};
export default CloudField;
