import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import { ADD_SYMPTOM_REQUEST_MUTATION, ALL_SYMPTOMS } from './Queries';

const useStyles = makeStyles(theme => ({
  root: {
    left: '20%',
    top: '20%',
    position: 'absolute',
    width: '60%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  saveButton: {
    color: 'white'
    // backgroundColor: colors.green[600],
    // '&:hover': {
    //   backgroundColor: colors.green[900]
    // }
  }
}));

export default function FormDialog({
  onClose,
  className,
  defaultValues = null,
  categories = [],
  ...rest
}) {
  const [values, setValues] = useState({
    symptom_category: '',
    id: null,
    symptom: '',
    incident: ''
  });

  useEffect(() => {
    if (categories.length > 0) {
      setValues({ symptom_category: categories[0].symptom_category });
    }
  }, [categories]);
  console.log(categories);
  const classes = useStyles();
  const [addSymptomRequest] = useMutation(ADD_SYMPTOM_REQUEST_MUTATION);

  const handleSubmit = async event => {
    event.preventDefault();
    // console.log('Submitted values', values);
    const result = await addSymptomRequest({
      variables: { input: values },
      refetchQueries: [{ query: ALL_SYMPTOMS }]
    });
    console.log('The result is ', result);
    onClose();
    // setOpenSnackbar(true);
  };
  const handleChange = event => {
    event.persist();
    console.log(event.target);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      >
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Add Symptom`} />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Enter Symptom name"
                label="Symptom"
                name="symptom"
                onChange={handleChange}
                // required
                value={values.symptom}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  value={values.symptom_category}
                  onChange={handleChange}
                  name="symptom_category"
                >
                  {categories.map(({ id, symptom_category }) => {
                    console.log(symptom_category);
                    return (
                      <MenuItem key={id} value={symptom_category}>
                        {symptom_category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button className={classes.saveButton} type="submit" variant="contained" color="primary">
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
}
