import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {createNews} from './actions/index'
const {DOM: {
    input
  }} = React

const handleDefaultImage = () => {
  console.log('clicked')
}

class NewsItemAdd extends Component {

  onSubmit(props) {
    this
      .props
      .createNews(props)

  }

  // const { handleSubmit, pristine, reset, submitting } = props
  render() {
    const {handleSubmit, createNews, resetForm} = this.props;
    console.log('Render', this.props)

    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="row">
            <div className="input-field col s4">
              <Field
                name="title"
                placeholder="Title"
                id="title"
                className="validate"
                component={title => <div>
                <input type="text" {...title} placeholder="title"/> {title.touched && title.error && <span>{title.error}</span>}
              </div>}/>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
            <div className="input-field col s12">
              <Field
                name="body"
                component={body => <div>
                <input
                  type="text"
                  {...body}
                  placeholder="Description"
                  className="materialize-textarea"/>
              </div>}/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <Field
                name="img"
                id="img"
                type="text"
                placeholder="Image"
                className="validate"
                component={img => <div>
                <input
                  type="text"
                  {...img}
                  placeholder="Image"
                  />
              </div>}/>
            </div>
            <div>
              <button className="btn grey" onClick={handleDefaultImage}>Default Image</button>
              <img src="" alt=""/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s08">
              <Field
                name="link"
                id="password"
                type="text"
                placeholder="link"
                className="validate"
                component={link => <div>
                <input type="text" {...link} placeholder="link"/>
              </div>}/>
            </div>
            <div className="input-field col s04">
              <Field
                name="link_text"
                id="email"
                type="text"
                placeholder="text for link"
                className="validate"
                component=
                { link_text => <div> <input type="text" {...link_text} /> </div> }/>
            </div>
          </div>
          <div className="row">
            <div className="col s4">
              <Field
                name="expire_date"
                id="email"
                type="date"
                className="validate"
                component=
                {expire_date=> <div> <input type="text" {...expire_date}/> </div> }/>
            </div>
          </div>
        </form>
      </div>

    );
  }
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

export default reduxForm(
  { form: 'newsitemadd', validate: validate}, 
  (state)=> 
    { return {
      initialValues: {
        img: 'http://blogs.infor.com/bibliotheken/wp-content/uploads/sites/49/2016/11/DFP_Blog' +
        '_Header_1000x160.jpg'
      }
    }}, {createNews})(NewsItemAdd);