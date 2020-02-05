import React from 'react';
import { Backdrop, Modal, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { DashBoardContext } from 'globalState/Provider';
import MarkDown from 'react-markdown';
import MarkDownFieldEditor from './MarkdownFieldEditor';
import { useMutation } from 'react-apollo';
import Paper from '@material-ui/core/Paper';

const EditableMarkDownField = ({
  canEdit = true,
  name,
  label,
  value,
  id,
  classes,
  updateQuery,
  requeryFunction
}) => {
  const [isOpen, setisOpened] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState(value);
  const [editable, toggleEdit] = React.useState(canEdit);

  const [updateMutution] = useMutation(updateQuery);
  async function handleSaveAndClose(value) {
    // console.log({ variables: { id, [name]: value } });
    setFieldValue(value);
    setisOpened(false);
    const input = { id };
    input[name] = value;
    console.log({ input });
    await updateMutution({ variables: { input } });
  }

  return (
    <Paper
      className={classes.paper}
      style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, background: 'aliceblue' }}
    >
      <Grid item xs={9}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        justifyContent="flex-end"
      >
        {canEdit && <EditIcon color="primary" fontSize="small" onClick={() => setisOpened(true)} />}
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
          <MarkDownFieldEditor
            onClose={() => setisOpened(false)}
            onSaveAndClose={handleSaveAndClose}
            name={name}
            label={label}
            value={fieldValue}
            id={id}
          />
        </div>
      </Modal>
      <MarkDown source={fieldValue}></MarkDown>
    </Paper>
  );
};

export default EditableMarkDownField;
