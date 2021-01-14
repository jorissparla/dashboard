import { Button, Card, CardActions, CardContent, CardHeader, colors, Divider, Grid, TextField, Typography } from "@material-ui/core";
import MarkDown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_UPDATE_MAINTENANCE, ALL_MAINTENANCE_QUERY, MUTATION_UPDATE_MAINTENANCE_FAQ, MAINTENANCE_FAQ_QUERY } from "./Queries";

const useStyles = makeStyles((theme) => ({
  root: {
    left: "20%",
    top: "20%",
    position: "absolute",
    width: "60%",
    height: "70%",
    padding: 20,
  },
  saveButton: {
    color: "white",
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
}));

const EditWizardDetails = (props) => {
  const { data, value: defaultValue, className, onClose, onView, label, id, name, ...rest } = props;
  console.log(id);
  const isFAQ = rest && rest.faq;
  console.log("isFAQ", isFAQ, name);
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const mutation = isFAQ ? MUTATION_UPDATE_MAINTENANCE_FAQ : MUTATION_UPDATE_MAINTENANCE;
  const [updateField] = useMutation(mutation);
  const handleChange = (e) => {
    e.persist();

    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = { id };
    input[name] = value;
    console.log({ input });
    updateField({
      variables: { input },
      refetchQueries: [
        {
          query: ALL_MAINTENANCE_QUERY,
        },
        {
          query: MAINTENANCE_FAQ_QUERY,
        },
      ],
    });
    onClose();
  };
  console.log(id);
  const taprops = { cols: 150, rows: 8, style: { fontFamily: "roboto", fontSize: "inherit" } };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title={`Edit ${label}`} />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <ReactMde value={value} onChange={setValue} selectedTab="write" disablePreview={true} textAreaProps={taprops} />
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
        <MarkDown source={value} />
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </Card>
  );
};

export default EditWizardDetails;
