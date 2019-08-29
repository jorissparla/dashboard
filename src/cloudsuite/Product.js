import { Button, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import React from 'react';
import { useQuery } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router';
import Spinner from 'utils/spinner';
import { CardSection } from '../common';
import useInput from '../hooks/useInput';
import { useUser } from '../User';
//import { format } from 'date-fns';
import { format } from '../utils/format';
import { QUERY_SINGLE_PRODUCT } from './graphql/Queries';

const paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '15px',
  padding: '10px',
  minWidth: '200px'
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
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
}));

function Product({ match, history }) {
  const classes = useStyles();
  const id = match.params.id;
  const [isEditable, setEditable] = React.useState(false);

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, { variables: { id } });
  if (loading) return <Spinner />;
  console.log(data);
  const {
    cloudsuiteproduct: { name, description, content: contentVal }
  } = data;

  return (
    <ProductForm product={data.cloudsuiteproduct} history={history} classes={classes}></ProductForm>
  );
}

export default withRouter(Product);

const ProductForm = props => {
  const {
    product,
    onSave = () => console.log('dave'),
    authenticated = true,
    onDelete = () => console.log('delke'),
    history,
    classes
  } = props;
  const readOnly = !authenticated;
  const [on, toggle] = React.useState(false);
  //const updatedAt = supportcard ? supportcard.updatedAt : format(new Date(), 'YYYY-MM-DD');
  //const currentUser = useUser();
  return (
    <Paper style={paperStyle}>
      <Formik
        initialValues={{ ...product }}
        onSubmit={values => {
          console.log('Submitting value', values);
          onSave(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                id="title"
                label="Title"
                className={classes.titleField}
                value={values.name}
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
                {!readOnly && product && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonDel}
                    onClick={() => onDelete()}
                  >
                    Delete
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
              </CardSection>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};
