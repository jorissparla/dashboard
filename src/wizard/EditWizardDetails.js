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
import MarkDown from 'react-markdown/with-html';
import React, { useRef, useState } from 'react';
import { useMutation } from 'react-apollo';
import 'react-mde/lib/styles/css/react-mde-all.css';
import {
  ALL_MAINTENANCE_QUERY,
  MAINTENANCE_FAQ_QUERY,
  MUTATION_UPDATE_MAINTENANCE,
  MUTATION_UPDATE_MAINTENANCE_FAQ
} from './Queries';
import ReactMde from 'react-mde';

const useStyles = makeStyles(theme => ({
  root: {
    left: '20%',
    top: '20%',
    position: 'absolute',
    width: '60%',
    height: '70%',
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

const EditWizardDetails = props => {
  const { data, value: defaultValue, className, onClose, onView, label, id, name, ...rest } = props;
  console.log(id);
  const isFAQ = rest && rest.faq;
  console.log('isFAQ', isFAQ, name);
  const classes = useStyles();
  const editor = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const mutation = isFAQ ? MUTATION_UPDATE_MAINTENANCE_FAQ : MUTATION_UPDATE_MAINTENANCE;
  const [updateField] = useMutation(mutation);
  const handleChange = e => {
    e.persist();

    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const input = { id };
    input[name] = value;
    console.log({ input });
    updateField({
      variables: { input },
      refetchQueries: [
        {
          query: ALL_MAINTENANCE_QUERY
        },
        {
          query: MAINTENANCE_FAQ_QUERY
        }
      ]
    });
    onClose();
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
  const config2 = { ...config, toolbar: false, readonly: true };
  const taprops = { cols: 150, rows: 8, style: { fontFamily: 'roboto', fontSize: 'inherit' } };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit} style={{}}>
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

        {/* <JoditEditor
          ref={viewer}
          value={value}
          config={config2}
          tabIndex={2} // tabIndex of textarea
          // onBlur={newContent => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={newContent => {
          //   console.log(newContent);
          // }}
        /> */}
        {/* <MarkDown source={value} escapeHtml={false} /> */}
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </Card>
  );
};

export default EditWizardDetails;
