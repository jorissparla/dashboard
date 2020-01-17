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

import { MUTATION_UPDATE_DETAIL } from './../../TenantQueries';
import { format } from 'utils/format';
import TemperatureSlider from './TemperatureSlider';

const useStyles = makeStyles(theme => ({
  root: {
    left: '20%',
    top: '20%',
    position: 'absolute',
    width: '60%'
  },
  saveButton: {
    color: 'white',
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const EditTenantDetails = props => {
  const { profile, className, onClose, onView, ...rest } = props;

  const classes = useStyles();
  const [values, setValues] = useState({
    csm: profile.csm || '',
    pm: profile.pm || '',
    customerid: profile.customerid,
    golivedate: format(profile.golivedate, 'yyyy-MM-dd'),
    golivecomments: profile.golivecomments,
    info: profile.info,
    temperature: profile.temperature,
    comments: profile.comments
  });
  console.log(profile);
  const [updateTenantDetailsMutation] = useMutation(MUTATION_UPDATE_DETAIL);
  const handleChange = event => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(values);
    const result = await updateTenantDetailsMutation({ variables: { input: values } });
    console.log(result);
    onClose();
    // setOpenSnackbar(true);
  };

  const handleTemperatureChange = value => {
    setValues({ ...values, temperature: value });
  };

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Details for ${profile.customer.name}"`} />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify name of Project Manager"
                label="Project Manager"
                name="pm"
                onChange={handleChange}
                // required
                value={values.pm}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify name of Customer Success Manager"
                label="Customer Success Manager"
                name="csm"
                onChange={handleChange}
                // required
                value={values.csm}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="date"
                defaultValue="2019-12-12"
                label="Go live date"
                name="golivedate"
                onChange={handleChange}
                value={values.golivedate}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Go Live Comments"
                name="golivecomments"
                onChange={handleChange}
                value={values.golivecomments}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                onChange={handleChange}
                multiline
                rows="6"
                value={values.comments}
                variant="outlined"
              />
            </Grid>

            {/* <Grid item md={9} xs={12}>
              <TextField
                fullWidth
                label="Info"
                name="info"
                onChange={handleChange}
                multiline
                rows="4"
                rowsMax="4"
                value={values.info}
                variant="outlined"
              />
            </Grid> */}
            <Grid item md={9} xs={12}>
              <TemperatureSlider
                initialValue={profile.temperature}
                onChange={handleTemperatureChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button className={classes.saveButton} type="submit" variant="contained">
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

EditTenantDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default EditTenantDetails;
