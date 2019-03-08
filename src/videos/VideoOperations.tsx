import { Button, Paper, TextField, withStyles } from '@material-ui/core';
import _ from 'lodash';
import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { CardSection } from '../common';
import { withRouter } from 'react-router';
import { format } from '../utils/format';
import { CategoryBarMultipleSelect } from './CategoryList';
import {
  MUTATION_UPDATE_VIDEO,
  QUERY_SINGLE_VIDEO,
  MUTATION_ADD_VIDEO,
  MUTATION_DELETE_VIDEO
} from './Queries';

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

// Type declarations and defaultvalues
type VideoType = {
  id?: string;
  title: string;
  url: string;
  date: string;
  category: string;
};

const defaultInitialValue = {
  id: '',
  title: '',
  url: '',
  date: Date.now().toString(),
  category: 'NEW'
};

interface AddProps {
  match: any;
  history: any;
  location: any;
}

const AddVideoPlain: React.FC<AddProps> = () => {
  const addVideo = useMutation(MUTATION_ADD_VIDEO);
  async function handleSave(video: VideoType) {
    const result = await addVideo({ variables: { video } });
    console.log(result);
  }
  return (
    <div>
      <StyledVideoForm
        formTitle="Add Video"
        initialValues={defaultInitialValue}
        onSave={(v: VideoType) => handleSave(v)}
      />
    </div>
  );
};

export const AddVideo = withRouter(AddVideoPlain);

interface EditProps {
  match: any;
  history: any;
  location: any;
}

const EditVideoPlain: React.FC<EditProps> = ({ match, history }) => {
  let id;
  if (match && match.params) {
    console.log(match.params);
    id = match.params.id;
  }
  if (!id) {
    return <div>Invalid video</div>;
  }

  const { data, loading } = useQuery(QUERY_SINGLE_VIDEO, {
    suspend: false,
    variables: { id }
  });
  const updateVideo = useMutation(MUTATION_UPDATE_VIDEO);
  const deleteVideo = useMutation(MUTATION_DELETE_VIDEO);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Invalid video</div>;
  }
  const { video } = data;
  async function handleSave(video: VideoType) {
    const result = await updateVideo({ variables: { video } });
    console.log(result);
  }
  async function handleDelete(video: VideoType) {
    const result = await deleteVideo({ variables: { video } });
    console.log(result);
    history.push('/about');
  }
  return (
    <div>
      <StyledVideoForm
        formTitle="Edit Video"
        initialValues={video}
        onSave={(v: VideoType) => handleSave(v)}
        onDelete={(v: VideoType) => handleDelete(v)}
      />
    </div>
  );
};
export const EditVideo = withRouter(EditVideoPlain);

export function useInput(defaultValue: string) {
  const [value, setValue] = React.useState(defaultValue);
  function onChange(e: any) {
    setValue(e.target.value);
  }
  return { value, onChange };
}

interface VideoFormProps {
  classes: any;
  initialValues: VideoType;
  formTitle: string;
  onSave: Function;
  onDelete?: Function;
}

const VideoForm: React.FC<VideoFormProps> = ({
  classes,
  initialValues = defaultInitialValue,
  formTitle = 'Add Video',
  onSave = (values: any) => console.log('Values', values),
  onDelete = () => null
}) => {
  const title = useInput(initialValues.title);
  const url = useInput(initialValues.url);
  const date = useInput(format(initialValues.date, 'YYYY-MM-DD'));
  const [categories, setCategories] = React.useState(initialValues.category);
  const id = initialValues.id;
  console.log(date);
  function handleSetCategories(name: string) {
    let categoriesArray: string[] = categories.split(';');
    if (_.includes(categories, name)) {
      setCategories(categoriesArray.filter(cat => cat !== name).join(';'));
    } else {
      setCategories([...categoriesArray, name].join(';'));
    }
  }
  React.useEffect(() => {
    //  handleSetCategories(categories);
  }, []);
  function handleSubmit(e: any) {
    e.preventDefault();
    const values = {
      title: title.value,
      url: url.value,
      date: date.value,
      category: categories
    };
    if (initialValues.id) {
      onSave({ id: initialValues.id, ...values });
    } else {
      onSave(values);
    }
  }

  function handleDelete() {
    const values = { id: initialValues.id };
    onDelete(values);
  }
  console.log('categories', categories);
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
          {id && (
            <Button className={classes.buttonDelete} onClick={handleDelete} variant="contained">
              Delete
            </Button>
          )}
        </CardSection>
      </form>
    </Paper>
  );
};

const StyledVideoForm = withStyles(styles)(VideoForm);
//export default StyledVideoForm;
