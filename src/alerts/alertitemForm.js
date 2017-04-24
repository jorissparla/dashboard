import React, {Component} from 'react';
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


const selectField = field => {
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
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

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



export default reduxForm({
  form: 'alertitemadd',
  initialValues: {
    alertdate: new Date()
}})(AlertItemForm);