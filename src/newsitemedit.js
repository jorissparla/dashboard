import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {createNews} from './actions/index'
import { Link, browserHistory } from 'react-router';
const {DOM: {
    input
  }} = React

const handleDefaultImage = () => {
  console.log('clicked')
}

const doSubmit = values => { 
  createNews(values);
  browserHistory.push('/news')
}

const inputField = field => {
  console.log(field)
  const classw = "input-field col s" + (field.width || "4");
  return (
  <div className={classw}>
      <input {...field.input} placeholder={field.placeholder} type={field.type}/>
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
              <p>
                <button type="submit" className="btn btn-primary blue">Save</button>
                <Link to ="/news" type="cancel" className="btn btn-primary black">Cancel</Link>
                </p>
              </div>
            </div>
              <div className="row">
              <Field name="body" component={inputField} type="text" placeholder="Description" width={12}/>
          </div>
          <div className="row">
              <Field name="img" id="img" type="text" placeholder="Image" component={inputField} width={8} />
            <div>
              <button className="btn grey" onClick={handleDefaultImage}>Default Image</button>
              <img src="" alt=""/>
            </div>
          </div>
          <div className="row">
             <Field name="link" component={inputField} type="text" placeholder="Link" width={8}/>
            <Field name="link_text" component={inputField} type="text" placeholder="Description"/>
          </div>
          <div className="row">
           <div className="left">
            Expires: 
            </div>
             <Field name="expire_date" component={inputField} type="date" placeholder="expire_date" width={2}/>            
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

const defaultDate = () => new Date(Date.now()+14*24*3600000).toISOString().substr(0,10);

export default reduxForm({
  form: 'newsitemadd',
  validate: validate,
  initialValues: {
    img: 'https://media.licdn.com/media/p/6/005/0b2/35e/09bf0b3.png',
    expire_date: defaultDate()
  }
}, null,{createNews})(NewsItemAdd);