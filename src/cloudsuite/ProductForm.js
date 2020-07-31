import { Button, TextField } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import useInput from '../hooks/useInput';
import { H1, H2 } from './Styles';

const readOnly = false;

export default function ProductForm({ classes, product, onSave, isEditable }) {
  console.log(product.content);
  const [on, setOn] = React.useState(false);
  const name = useInput(product.name);
  const description = useInput(product.description);
  const content = useInput(product.content);
  return (
    <>
      <div className={classes.content2}>
        {isEditable ? (
          <TextField
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            className={classes.editField}
            id="name"
            {...name}
            placeholder="name"
          />
        ) : (
          <H1>{name.value}</H1>
        )}
        {isEditable ? (
          <TextField
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            className={classes.editField}
            id="description"
            {...description}
            placeholder="description"
          />
        ) : (
          <H2>{description.value}</H2>
        )}
      </div>
      <div className={classes.content}>
        {!readOnly && on && (
          <TextField
            id="content"
            label="content"
            {...content}
            margin="normal"
            fullWidth
            multiline
            rows={25}
          />
        )}
        {!on && (
          <div className={classes.markdown}>
            <ReactMarkdown source={content.value} />
          </div>
        )}
        {!readOnly && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button2}
            onClick={() => setOn(!on)}
          >
            {on ? 'Preview' : 'Markdown '}
          </Button>
        )}
      </div>
    </>
  );
}
