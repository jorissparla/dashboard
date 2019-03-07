import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import _ from 'lodash';
import { Button, withStyles, FormControl, InputLabel, TextField, Paper } from '@material-ui/core';
import { CardSection } from '../common';
import { format } from '../utils/format';
import { CategoryBarMultipleSelect } from './CategoryList';

const styles: any = (theme: any) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  TextFieldStyle: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button2: {
    margin: theme.spacing.unit,
    maxWidth: 200
  },

  buttonStyle: {
    backgroundColor: '#ffc600',
    labelColor: 'white',
    margin: '20px'
  },
  buttonDelete: {
    backgroundColor: 'black',
    labelColor: 'white',
    color: 'white',
    margin: theme.spacing.unit
  }
});

export function useInput(defaultValue: string) {
  const [value, setValue] = React.useState(defaultValue);
  function onChange(e: any) {
    setValue(e.target.value);
  }
  return { value, onChange };
}

interface Props {
  classes: any;
  initialValues: VideoType;
  formTitle: string;
  onSave: Function;
  onDelete?: Function;
}

type VideoType = {
  id?: string;
  title: string;
  url: string;
  date: string;
  categories: string;
};

const defaultInitialValue = {
  id: '',
  title: '',
  url: '',
  date: format(Date.now(), 'YYYY-MM-DD'),
  categories: 'NEW'
};
const VideoForm: React.FC<Props> = ({
  classes,
  initialValues = defaultInitialValue,
  formTitle = 'Add Video',
  onSave = (values: any) => console.log('Values', values),
  onDelete = () => null
}) => {
  const title = useInput(initialValues.title);
  const url = useInput(initialValues.url);
  const date = useInput(initialValues.date);
  const [categories, setCategories] = React.useState(initialValues.categories);

  function handleSetCategories(name: string) {
    let categoriesArray: string[] = categories.split(';');
    if (_.includes(categories, name)) {
      setCategories(categoriesArray.filter(cat => cat !== name).join(';'));
    } else {
      setCategories([...categoriesArray, name].join(';'));
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const values = {
      title: title.value,
      url: url.value,
      date: date.value,
      categories
    };
    if (initialValues.id) {
      onSave({ id: initialValues.id, ...values });
    } else {
      onSave(values);
    }
  }
  return (
    <Paper>
      <CardSection style={{ fontSize: '24px', fontFamily: 'Poppins' }}>{formTitle}</CardSection>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.TextFieldStyle}
          name="title"
          required
          fullWidth={true}
          {...title}
          label="Title"
        />
        <TextField
          className={classes.TextFieldStyle}
          name="url"
          required
          fullWidth={true}
          {...url}
          label="URL"
        />
        <TextField
          className={classes.TextFieldStyle}
          name="date"
          type="date"
          {...date}
          label="date"
        />
        <CategoryBarMultipleSelect isSelected={categories} setSelected={handleSetCategories} />
        <CardSection>
          <Button className={classes.button} color="primary" variant="contained" type="submit">
            Save
          </Button>
          <Button
            className={classes.button}
            onClick={() => null}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          {onDelete && (
            <Button className={classes.buttonDelete} onClick={() => null} variant="contained">
              Delete
            </Button>
          )}
        </CardSection>
      </form>
    </Paper>
  );
};

export default withStyles(styles)(VideoForm);
