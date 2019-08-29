import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router';
import { CardSection } from '../common';
import { useUser } from '../User';
//import { format } from 'date-fns';
import { format } from '../utils/format';

const owners = [
  { id: 'Ricardo Exposito', name: 'Ricardo Exposito' },
  { id: 'Massimo Favaro', name: 'Massimo Favaro' },
  { id: 'Maribel Aguilella', name: 'Maribel Aguilella' },
  { id: 'Joris Sparla', name: 'Joris Sparla' },
  { id: 'Luis Casanova', name: 'Luis Casanova' }
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
    margin: theme.spacing(1)
  },
  button2: {
    margin: theme.spacing(1),
    height: '40px',
    backgroundColor: 'palevioletred'
  },

  buttonDel: {
    margin: theme.spacing(1),
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: '100%'
  },
  titleField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: '40px',
    color: '#039BE5'
  },
  content: {
    display: 'flex'
  },
  contentField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#eeeeee99',
    fontSize: 40,
    minHeight: '50vh'
  },
  dense: {
    marginTop: 19
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  markdown: {
    width: '90vw',
    height: '60vh',
    overflow: 'scroll'
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
    onDelete,
    history,
    classes
  } = props;
  const readOnly = !authenticated;
  const [on, toggle] = React.useState(false);
  const updatedAt = supportcard ? supportcard.updatedAt : format(new Date(), 'YYYY-MM-DD');
  const currentUser = useUser();
  console.log('blba', { initialValues }, currentUser);
  let newInitialValues =
    currentUser && !initialValues.owner
      ? { ...initialValues, owner: currentUser.fullname }
      : initialValues;
  return (
    <Paper style={paperStyle}>
      <Formik
        initialValues={newInitialValues}
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
                {!readOnly && on && (
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
                    rows={25}
                  />
                )}
                {!on && (
                  <div className={classes.markdown}>
                    <ReactMarkdown source={values.description} />
                  </div>
                )}
                {!readOnly && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button2}
                    onClick={() => toggle(!on)}
                  >
                    {on ? 'Preview' : 'Edit '}
                  </Button>
                )}
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
                {!readOnly && supportcard && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonDel}
                    onClick={() => onDelete(supportcard)}
                  >
                    Delete
                  </Button>
                )}
                {readOnly && supportcard && (
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
                <Chip
                  style={{ margin: 4 }}
                  label={`Last updated at ${format(updatedAt, 'ddd, DD MMM YYYY')}`}
                />
              </CardSection>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default withRouter(withStyles(styles)(SupportCardForm));
