import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {createNews} from './actions/index'
const {DOM: {
    input
  }} = React

const handleDefaultImage = () => {
  console.log('clicked')
}

const doSubmit = values => createNews(values);

const inputField = field => {
  return (
  <div className="input-field col s4">
      <input {...field.input} placeholder={field.input.placeholder} />
  </div>
  )
}
const inputFieldDoubleWidth = field => {
  return (
  <div className="input-field col s8">
      <input {...field.input} placeholder={field.input.placeholder} />
  </div>
  )
}

const NewsItemAdd  =(props) => {
 const {handleSubmit, createNews, resetForm} = props;
  // const { handleSubmit, pristine, reset, submitting } = props
    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit(doSubmit)}>
          <div className="row">
              <Field name="title" component={inputField} placeholder="title" />
              <div className="col s4">
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>
              <div className="row">
              <Field name="body" component={inputFieldDoubleWidth} type="text-area" placeholder="Description"/>
          </div>
          <div className="row">
              <Field name="img" id="img" type="text" placeholder="Image" component={inputFieldDoubleWidth} />
            <div>
              <button className="btn grey" onClick={handleDefaultImage}>Default Image</button>
              <img src="" alt=""/>
            </div>
          </div>
          <div className="row">
             <Field name="link" component={inputFieldDoubleWidth} type="text" placeholder="Link"/>
            <Field name="link_text" component={inputField} type="text" placeholder="Description"/>
          </div>
          <div className="row">
             <Field name="expire_date" component={inputField} type="date" placeholder="expire_date"/>            
          </div>
        </form>
      </div>

    );
  }

const checkValid = (obj) => {

  return obj.touched && obj.invalid
    ? 'btn-danger'
    : '';
}

const validate = () => {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: 'newsitemadd',
  validate: validate,
  initialValues: {
    img: 'http://blogs.infor.com/bibliotheken/wp-content/uploads/sites/49/2016/11/DFP_Blog' +
        '_Header_1000x160.jpg',
    expire_date: '2016-12-12'
  }
}, (state) => {
  return {
    initialValues: {
      img: 'http://blogs.infor.com/bibliotheken/wp-content/uploads/sites/49/2016/11/DFP_Blog' +
          '_Header_1000x160.jpg', 
    expire_date: '12/12/2016'
    }
  }
}, {createNews})(NewsItemAdd);