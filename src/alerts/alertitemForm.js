import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {reduxForm, Field} from 'redux-form'
import TextField from 'material-ui/TextField'
import { CardSection } from '../common'
import myDatePicker from '../common/DatePicker'


const aTypes = [
    { type: 'Notification', value: 'Notification' },
    { type: 'Alert', value: 'Alert'},
    { type: 'Warning', value: 'Warning'}

]
const inputField = ({input, ...rest}) => {
  const classw = 'input-field col s' + (rest.width || '4')
  return (
    <div className={classw}>
      <input {...input} {...rest} />
    </div>
  )
}

const inputDateField = ({input, ...rest}) => {
  const classw = 'input-field col s' + (rest.width || '4')
  return (
    <div className={classw}>
      <input className='datepicker' {...input} {...rest} />
    </div>
  )
}

const selectField = field => {
  console.log('FIELD', field)
  return (
    <div className='input-field col s12'>
      <select defaultValue={field.input.value}>
        { renderOptions(aTypes) }
      </select>
      <label>
        { field.placeholder }
      </label>
    </div>
  )
}

const renderDateField = ({ input, label,  ...custom }) => {
  console.log('renderDateField', input, custom)
  return (
  <myDatePicker hintText={label} container='inline'
    {...input}
    {...custom}
  />)
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderOptions = (aTypes) => {
  return (
  aTypes.map(item => {
    return (
      <option value={item.type}>
        { item.value }
      </option>)
  })
  )
}
class AlertItemForm extends Component {
 
  render() {
     const { containerStyle, formStyle } = styles
     const { handleSubmit } = this.props
    return (
      <CardSection>
          <form style={formStyle} onSubmit={handleSubmit(this.props.onSave)}>
          <Field name='alertdate' component={myDatePicker} hintText='Date' id='alertdate' container="inline" mode="landscape" width={8}  />
          <CardSection>
          <Field name="title" component={renderTextField} label="Enter the Alert Title" width={6} />
          </CardSection>
          <Field name='body' component={inputField} placeholder='Enter the description' width={8} />
          <Field name='alerttype' component={selectField} data={aTypes} width={3} placeholder='Alert Type' />
          <Field name='username' component={inputField} placeholder='username' />
          {this.props.buttons}
        </form>
        
        
      </CardSection>
    );
  }
}

const styles = {
  containerStyle: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
  },
  formStyle: {
    backgroundColor: '#EDEDED'
  }
}
const defaultDate = () => new Date(Date.now() + 14 * 24 * 3600000)
  .toISOString()
  .substr(0, 10)

export default reduxForm({
  form: 'alertitemadd',
  initialValues: {
    alertdate: new Date()
}})(AlertItemForm);