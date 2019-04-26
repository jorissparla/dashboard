import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { CardSection } from '../common';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Formik } from 'formik';
import { TextField, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FileUploaderNew from '../common/FileUploaderNew';
import SafeDeleteButton from '../videos/SafeDeleteButton';

const Left = styled.div`
  width: 10%;
  margin: 10px;
`;
const Right = styled.div`
  width: 80%;
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    minWidth: '200px'
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
    marginBottom: 20
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20,
    width: '60vw'
  }
});

const NewsItem = ({
  initialValues: newsitem,
  onSave,
  onDelete,
  onCancel,
  handleSubmit,
  title,
  history,
  classes
}) => {
  const handleDelete = e => {
    console.log('Deleting item', e);
    onDelete(newsitem.id);
  };
  const [imageFile, setImageFile] = useState(newsitem.img || '');
  console.log('In newsitem', newsitem);
  return (
    <Formik
      className={classes.root}
      initialValues={newsitem}
      onSubmit={values => {
        const res = { ...values, img: imageFile };
        console.log('onSubmit', { ...values, img: imageFile });
        onSave(res);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Paper className={classes.root}>
            <CardSection>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </CardSection>

            <TextField
              name="title"
              className={classes.textField}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Enter the title of the newsitem"
              fullWidth
            />

            <TextField
              name="body"
              className={classes.textField}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.body}
              label="Provide a detailed description"
              multiline
              rows={8}
              rowsMax={8}
              fullWidth
            />
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Left>
                <Avatar src={imageFile} />
              </Left>
              <Right>
                <TextField
                  name="img"
                  className={classes.textField2}
                  // onChange={e => setImageFile(e.target.value)}
                  value={imageFile}
                  // value={values.img}
                  label="Copy the Image URL into the field"
                />
                <FileUploaderNew
                  link={`\\\\nlbavwixs.infor.com\\images\\news`}
                  httpLinkPrefix={`http://nlbavwixs.infor.com/images/news/`}
                  setFile={async value => {
                    console.log('NewsItem:::', value);
                    setImageFile(value);
                  }}
                />
              </Right>
            </div>
            <CardSection>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                label="Save"
                type="submit"
              >
                Save
              </Button>
              {onDelete && <SafeDeleteButton onDelete={handleDelete} />}

              <Button
                className={classes.button}
                variant="contained"
                label="Cancel"
                color="secondary"
                onClick={() => history.push('/news')}
              >
                Cancel
              </Button>
            </CardSection>
          </Paper>
        </form>
      )}
    </Formik>
  );
};

export default withRouter(withStyles(styles)(NewsItem));
