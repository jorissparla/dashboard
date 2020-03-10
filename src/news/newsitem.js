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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    minWidth: '200px'
  },
  button: {
    margin: theme.spacing(1)
  },

  buttonDel: {
    margin: theme.spacing(1),
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 20
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 20,
    width: '60vw'
  }
});

const NewsItem = ({
  initialValues: newsitem,
  onSave,
  onDelete,
  onCancel,
  title,
  history,
  classes
}) => {
  const handleDelete = e => {
    onDelete(newsitem.id);
  };
  const [imageFile, setImageFile] = useState(newsitem.img || '');
  const [values, setValues] = useState(newsitem);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res = { ...values, img: imageFile };
    console.log('onSubmit', { ...values, img: imageFile });
    onSave(res);
  }
  return (
    <div className="flex items-center flex-col h-screen bg-gray-100 mt-4">
      <div className="bg-white shadow rounded-xl p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="font-pop text-4xl">{title}</h1>
          </div>
          <div className="flex flex-col">
            <FileUploaderNew
              link={`\\\\nlbavwixs.infor.com\\images\\news\\`}
              httpLinkPrefix={`https://nlbavwixs.infor.com/images/news/`}
              setFile={async value => {
                console.log('NewsItem:::', value);
                setImageFile(value);
              }}
            />
            <div
              style={{ width: '70vw' }}
              name="img"
              className="text-gray-600  border-b border-cool-gray-100 mt-2 mb-2"
              // onChange={e => setImageFile(e.target.value)}
              value={imageFile}
              // value={values.img}
              label="Link to Image File"
            >
              {imageFile || 'Link to image file will be found here'}
            </div>
            <img
              src={imageFile || 'https://nlbavwixs.infor.com/images/news/Imagewillbehere.png'}
              alt=""
              className=" max-h-96 w-full object-cover mb-2"
            />
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="w-32 appearance-none border rounded shadow-xs py-2 px-3 text-gray-700 w-full mb-3 leading-tight focus:outline-none focus:shadow-outline"
                // <TextField
                name="title"
                // className={classes.textField}
                value={values.title}
                onChange={handleChange}
                placeholder="Enter the title of the newsitem"
                // fullWidth
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Description
              </label>
              <textarea
                className="w-32 resize-none  appearance-none border rounded shadow-xs py-2 px-3 text-gray-700 w-full mb-3 leading-tight focus:outline-none focus:shadow-outline"
                // <TextField
                name="body"
                // className={classes.textField}
                value={values.body}
                onChange={handleChange}
                placeholder="Provide a detailed description"
                rows={8}
                // fullWidth
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            {onDelete && <SafeDeleteButton onDelete={handleDelete} />}
            <button
              className=" bg-blue-500 text-white  py-2 px-6 shadow-md rounded-lg hover:bg-blue-700"
              type="submit"
            >
              Save News
            </button>
            <button
              className="ml-4 rounded-lg px-6 py-2  bg-gray-300 hover:bg-gray-200  text-gray-800 font-semibold leading-tight shadow-md"
              onClick={() => history.push('/news')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(NewsItem));
