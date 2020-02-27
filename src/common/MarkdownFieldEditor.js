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
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import MarkDown from 'react-markdown/with-html';
import ReactMde from 'react-mde';
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
  const taprops = { cols: 180, rows: 10, style: { fontFamily: 'roboto', fontSize: 'inherit' } };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Edit ${label}`} />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <ReactMde
              value={value}
              onChange={setValue}
              selectedTab="write"
              disablePreview={true}
              textAreaProps={taprops}
            />
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
        <MarkDown
          source={value}
          escapeHtml={false}
          className="bg-white border shadow-lg px-4 ml-2"
        />
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </Card>
  );
};
export default MarkDownFieldEditor;
