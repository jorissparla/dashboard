import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import JoditEditor from 'jodit-react';
import ReactMde from 'react-mde';

import React, { useRef, useState } from 'react';
import MarkDown from 'react-markdown/with-html';
import 'react-mde/lib/styles/css/react-mde-all.css';

const useStyles = makeStyles(theme => ({
  root: {
    left: '10%',
    top: '5%',
    position: 'absolute',
    width: '80%',
    height: '90%',
    padding: 20
  },
  saveButton: {
    color: 'white',
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const MarkDownFieldEditor = props => {
  const {
    data,
    value: defaultValue,
    className,
    onClose,
    onSaveAndClose,
    onView,
    label,
    id,
    name,
    ...rest
  } = props;
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const editor = useRef(null);
  const [value, setValue] = useState(defaultValue);
  // const mutation = isFAQ ? MUTATION_UPDATE_MAINTENANCE_FAQ : MUTATION_UPDATE_MAINTENANCE;
  //
  // e.persist();

  // setValue(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    // const input = { id };
    // input[name] = value;
    // console.log({ input });
    // updateField({
    //   variables: { input },
    //   refetchQueries: [
    //     {
    //       query: ALL_MAINTENANCE_QUERY
    //     },
    //     {
    //       query: MAINTENANCE_FAQ_QUERY
    //     }
    //   ]
    // });
    onSaveAndClose(value);
  };
  console.log(id);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: true,
    // theme: 'dark',
    autoHeight: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false
  };
  const taprops = { cols: 180, rows: 10, style: { fontFamily: 'roboto', fontSize: 'inherit' } };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Edit ${label}`} />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <JoditEditor
              style={{ font: '24px Arial', color: '#000' }}
              ref={editor}
              value={value}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => {
                console.log(newContent);
              }}
            />
            {/* <ReactMde
              value={value}
              onChange={setValue}
              selectedTab="write"
              disablePreview={true}
              textAreaProps={taprops}
            /> */}
            {/* <TextField
                fullWidth
                multiline
                rows={8}
                label={label}
                name={name}
                onChange={handleChange}
                // required
                value={value}
                variant="outlined"
              /> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" type="submit" variant="contained">
            Save Changes
          </Button>
          <Button onClick={onClose} size="small">
            <CloseIcon className={classes.buttonIcon} />
            Close
          </Button>
        </CardActions>
        <Typography variant="h4">Preview </Typography>
        <Divider />
        {/* <MarkDown
          source={value}
          escapeHtml={false}
          className="bg-white border shadow-lg px-4 ml-2"
        /> */}
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </Card>
  );
};
export default MarkDownFieldEditor;
