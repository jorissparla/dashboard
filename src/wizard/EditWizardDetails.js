import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';

const useStyles = makeStyles(theme => ({
  root: {
    left: '25%',
    top: '25%',
    position: 'absolute',
    width: '50%'
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
  const { data, value: defaultValue, className, onClose, onView, label, name, ...rest } = props;

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const handleChange = e => {
    e.persist();

    setValue(e.target.value);
  };
  const handleSubmit = v => {};

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Edit ${label}`} />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label={label}
              name={name}
              onChange={handleChange}
              // required
              value={value}
              variant="outlined"
            />
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
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </Card>
  );
};

export default EditWizardDetails;
