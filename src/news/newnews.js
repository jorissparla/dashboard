import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
//import DatePicker from 'material-ui/DatePicker';
import {TextField} from 'redux-form-material-ui'

import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Card, CardSection, Input, MyDatePicker } from '../common'
import {createNews} from '../actions/index'

function doSubmit(values) {
  window.alert(`You submitted Parent:\n\n${JSON.stringify(values, null, 2)}`)
  //createNews(values)
}

const inputImageField = field => {
  console.log(field.input)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '600px'}}>
    <div>
        <Input {...field.input} placeholder={field.placeholder||field.label} style={{ width: '600px'}} />
    </div>
    <div>
        <img src={field.input.value} alt='' width='100px' height='100px' />
        </div>
    </div>
  )
}

class NewNews extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <Card>
        <form  onSubmit={handleSubmit(doSubmit)}>
        <CardSection style={{ fontFamily: 'Billabong', fontSize: '48px'}}>
          Add News
        </CardSection>
        <Divider />
        <CardSection>
          <Field
            name='body'
            component={Input}
            type='text'
            placeholder='Description'
            width={12} 
        />
        </CardSection>
        <Divider />
        <CardSection>
          <Field
            name='img'
            id='img'
            type='text'
            placeholder='Image'
            component={inputImageField}
            />
        </CardSection>
        <Divider />
        <CardSection>
          <Field
            name='link'
            component={Input}
            type='text'
            placeholder='Link (Optional)'
            width={8} />
        </CardSection>
        <Divider />  
        <CardSection>
          <Field
            name='link_text'
            component={Input}
            type='text'
            placeholder='Link Description' />
        </CardSection>
        <Divider />
        <CardSection> 
          <Field
            name='expire_date'
            component={MyDatePicker}
            placeholder='Expire Date'
            width={2} />
        </CardSection>
        <CardSection style={styles.buttonSectionStyle}>
          <RaisedButton primary={true} label="Save" backgroundColor='#ffc600'  style={styles.buttonStyle} type='submit'/>
          <RaisedButton secondary={true} label="Cancel" backgroundColor= 'black' style={styles.cancelButtonStyle} />
        </CardSection>
        </form>
      </Card>

    );
  }
}

const styles = {
  labelStyle: {
    padding: '10px',
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputStyle: {
    marginLeft: '10px',
    fontSize: 18
  },
  buttonSectionStyle: {
    padding: '10px',
    marginLeft: '10px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'initial',
    flex: '0.5'
  },
  buttonStyle: {
    margin: 12
  },
  cancelButtonStyle: {
    margin: 12
  }
}


export default reduxForm({ form: 'newnews'})(NewNews);