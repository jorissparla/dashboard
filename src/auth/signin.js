import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui'
import Paper from 'material-ui/Paper'


const style = {
  paper: {
  width: '30%',
  paddingLeft: '20px',
  
  marginTop: '40px',
  textAlign: 'left',
  display: 'flex',
  },
  button: {
    margin: '10px',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start'

  }
};
const required = value => value == null ? 'Required' : undefined
const email = value => value &&
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email' : undefined

const Signin = React.createClass({
  render() {
    return (
      <Paper style={style.paper}  zDepth={2} >
      <form action="">
          <div>
            <Field name="email"
              component={TextField}
              floatingLabelText="Email"
              validate={[ required, email ]}
              ref="email" withRef/>
          </div>
          <div>
            <Field name="password"
              component={TextField}
              type='password'
              floatingLabelText="Password"
              validate={required}
              ref="password" withRef/>
          </div>
          <div>
          <RaisedButton label="Sign In" primary={true} style={style.button}/>
          </div>
          
      </form>
      </Paper>
    )
  }
})

export default reduxForm({
  form: 'sigin',
  defaultValues: {

  }
})(Signin)