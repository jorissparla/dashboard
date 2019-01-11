import React from 'react';
import { withRouter } from 'react-router';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns';
import { CardSection } from '../common';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ReactMarkdown from 'react-markdown';
import { read } from 'fs';

const owners = [
  { id: 'Ricardo Exposito', name: 'Ricardo Exposito' },
  { id: 'Massimo Favaro', name: 'Massimo Favaro' },
  { id: 'Maribel Aguilella', name: 'Maribel Aguilella' },
  { id: 'Joris Sparla', name: 'Joris Sparla' }
];

const paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '15px',
  padding: '10px',
  minWidth: '200px'
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit
  },

  buttonDel: {
    margin: theme.spacing.unit,
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    height: '100%'
  },
  titleField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: '40px',
    color: '#039BE5'
  },
  content: {
    display: 'flex'
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#eeeeee99',
    fontSize: 40
  },
  dense: {
    marginTop: 19
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  markdown: {
    width: '90vw',
    height: '50vh'
  },
  menu: {
    width: 200
  }
});

const SupportCardForm = props => {
  const {
    supportcard,
    categories = [{ id: 1, category: 'Cloud' }, { id: 2, category: 'IXS' }],
    initialValues,
    onSave,
    authenticated,
    handleSubmit,
    onDelete,
    history,
    classes
  } = props;
  const readOnly = !authenticated;
  const updatedAt = supportcard ? supportcard.updatedAt : format(new Date(), 'YYYY-MM-DD');
  console.log({ initialValues });
  return (
    <Paper style={paperStyle}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('Submitting value', values);
          onSave(values);
        }}
      >
        {({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                id="title"
                label="Title"
                className={classes.titleField}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                disabled={readOnly}
                fullWidth
              />
              <div className={classes.content}>
                {!readOnly && (
                  <TextField
                    id="description"
                    label="Description"
                    className={classes.contentField}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={12}
                    rowsMax={12}
                  />
                )}
                <div className={classes.markdown}>
                  {!readOnly && <h5>Preview</h5>}
                  <ReactMarkdown source={values.description} />
                </div>
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-simple">Category</InputLabel>
                <Select
                  value={values.categoryname}
                  onChange={handleChange}
                  disabled={readOnly}
                  inputProps={{
                    name: 'categoryname',
                    id: 'category-simple'
                  }}
                >
                  {categories.map(({ id, name }) => (
                    <MenuItem key={id} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="owner">Owner</InputLabel>
                <Select
                  value={values.owner}
                  onChange={handleChange}
                  disabled={readOnly}
                  inputProps={{
                    name: 'owner',
                    id: 'owner'
                  }}
                >
                  {owners.map(({ id, name }) => (
                    <MenuItem key={id} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="link"
                label="Link to Document"
                className={classes.linkField}
                value={values.link}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              {/*<Field
        hintText="Enter Card Title"
        floatingLabelText="Title"
        name="title"
        id="title"
        fullWidth={true}
        component={TextField}
        underlineShow={true}
        disabled={readOnly}
        style={{
          fontFamily: 'Didact Gothic',
          fontSize: '40px',
          color: '#039BE5',
          fontWeight: 800
        }}
        />
        <Field
          hintText="Enter a description"
          name="description"
          floatingLabelText="Description"
          textareaStyle={{
            background: 'lightyellow',
            border: '1px solid lightgray',
            color: '#0099e7'
          }}
          id="description"
          disabled={readOnly}
          fullWidth={true}
          multiLine={true}
          rows={10}
          component={TextField}
          />
        <Field
          name="categoryname"
          component={Select}
          disabled={readOnly}
          hintText="Status"
          floatingLabelText="Category"
          style={{ flex: 2, marginTop: '-5px' }}
          underlineShow={true}
          underlineStyle={{ borderColor: '#039BE5' }}
          >
          {categories.map(({ id, name }) => (
            <MenuItem key={id} value={name} primaryText={name} />
            ))}
        </Field>
        <Field
          name="owner"
          component={Select}
          disabled={readOnly}
          hintText="Owner"
          floatingLabelText="Owner"
          style={{ flex: 2, marginTop: '-5px', marginLeft: '10px' }}
          underlineShow={true}
          underlineStyle={{ borderColor: '#039BE5' }}
          >
          {owners.map(({ id, name }) => (
            <MenuItem key={id} value={name} primaryText={name} />
            ))}
        </Field>

        <Field
          name="link"
          hintText="Enter link to document"
          floatingLabelText="link"
          disabled={readOnly}
          id="link"
          fullWidth={true}
          component={TextField}
          underlineShow={true}
          style={{ fontSize: 14 }}
          onClick={() => (readOnly ? window.open(initialValues.link) : console.log('link'))}
          /> */}
              <CardSection>
                {!readOnly && (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      Save
                    </Button>
                  </React.Fragment>
                )}
                {!readOnly &&
                  supportcard && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonDel}
                      onClick={() => onDelete(supportcard)}
                    >
                      Delete
                    </Button>
                  )}
                {readOnly &&
                  supportcard && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonDel}
                      onClick={() => window.open(initialValues.link)}
                    >
                      View Link
                    </Button>
                  )}
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => setTimeout(history.push('/supportcard'), 500)}
                >
                  Cancel
                </Button>
                <Chip style={{ margin: 4 }} label={`Last updated at ${updatedAt}`} />
              </CardSection>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default withRouter(withStyles(styles)(SupportCardForm));
