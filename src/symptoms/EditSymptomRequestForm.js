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
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_SYMPTOMS, UPDATE_SYMPTOM_REQUEST_MUTATION } from "./Queries";

const useStyles = makeStyles((theme) => ({
  root: {
    left: "20%",
    top: "20%",
    position: "absolute",
    width: "60%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  saveButton: {
    color: "white",
    // backgroundColor: colors.green[600],
    // '&:hover': {
    //   backgroundColor: colors.green[900]
    // }
  },
}));

export default function FormDialog({ onClose, className, defaultValues = null, categories = [], ...rest }) {
  const [values, setValues] = useState({
    symptom_category: "",
    id: null,
    symptom: "",
    incident: "",
  });

  console.log("Rendering defaultsEdit", values, defaultValues);
  useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues);
      console.log("defaultValues", defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (categories.length > 0 && !defaultValues) {
      setValues({ symptom_category: categories[0].symptom_category });
    }
  }, [categories, defaultValues]);
  const classes = useStyles();
  const [updateSymptomRequest] = useMutation(UPDATE_SYMPTOM_REQUEST_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Submitted values', values);
    const { symptom, incident, symptom_category, status } = values;
    const input = { symptom, incident, symptom_category, status };

    console.log(input);
    const result = await updateSymptomRequest({
      variables: { where: { id: values.id }, input },
      refetchQueries: [{ query: ALL_SYMPTOMS }],
    });
    console.log("The result is ", result);
    onClose();
    // setOpenSnackbar(true);
  };
  const handleChange = (event) => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log("Editing values", event.target.name, event.target.value);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Edit Symptom ${values.id}`} />
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
                <Select value={values.symptom_category} onChange={handleChange} name="symptom_category">
                  {categories.map(({ id, symptom_category }) => {
                    return (
                      <MenuItem key={id} value={symptom_category}>
                        {symptom_category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  fullWidth
                  helperText="Enter Incident Number"
                  label="incident"
                  name="incident"
                  onChange={handleChange}
                  // required
                  value={values.incident}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className={classes.saveButton} type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button className={classes.saveButton} variant="contained" color="#000">
              Delete
            </Button>
            <Button onClick={onClose} size="small">
              <CloseIcon className={classes.buttonIcon} />
              Close
            </Button>
          </div>
        </CardActions>
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </Card>
  );
}
