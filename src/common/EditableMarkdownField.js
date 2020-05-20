import { Backdrop, Modal, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import JoditEditor from "jodit-react";
import React, { useRef } from "react";
import { useMutation } from "react-apollo";
import MarkDownFieldEditor from "./MarkdownFieldEditor";
import { useAlert } from "globalState/AlertContext";

const EditableMarkDownField = ({ canEdit = true, name, label, value, id, classes, updateQuery, requeryFunction }) => {
  const [isOpen, setisOpened] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState(value);
  const alert = useAlert();
  // const [editable, toggleEdit] = React.useState(canEdit);

  const [updateMutution] = useMutation(updateQuery);
  async function handleSaveAndClose(value) {
    // console.log({ variables: { id, [name]: value } });
    setFieldValue(value);
    setisOpened(false);
    const input = { id };
    input[name] = value;
    console.log({ input });
    await updateMutution({ variables: { input } });
    alert.setMessage("Thank you for updating " + label);
  }
  const config = {
    readonly: true, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: false,
    // theme: 'dark',
    autoHeight: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
  };
  const viewer = useRef(null);
  return (
    <Paper
      className={classes.paper}
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 8,
        background: "aliceblue",
      }}
    >
      <Grid item xs={9}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "flex-end",
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
          timeout: 500,
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
      <JoditEditor
        id="description"
        name="description"
        style={{
          font: "24px Arial",
          color: "#000",
          borderLeft: "solid 4px #ccc",
        }}
        ref={viewer}
        value={fieldValue}
        onChange={(v) => console.log(v)}
        onBlur={(e) => console.log(e)}
        config={config}
        tabIndex={2} // tabIndex of textarea
      />
      {/* <MarkDown source={fieldValue} escapeHtml={false}></MarkDown> */}
    </Paper>
  );
};

export default EditableMarkDownField;
