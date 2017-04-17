import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {browserHistory, Link} from 'react-router'
import { CardSection, Card, Input, MyDatePicker } from '../common'
import {  SelectField } from 'redux-form-material-ui'
import {blue500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {fetchAlertItem, updateAlerts, deleteAlert} from '../actions/index'

const aTypes = [
  { type: 'Notification', value: 'Notification' },
  { type: 'Alert', value: 'Alert'},
  { type: 'Warning', value: 'Warning'}

]

const inputField = ({ input, ...rest }) => {
  const classw = 'input-field col s' + (rest.width || '4')
  return (
    <div className={classw}>
      <input {...input} {...rest} />
    </div>
  )
}

const { string, func, object, arrayOf, shape } = React.PropTypes

let AlertItem = React.createClass({
  propTypes: {
    fetchAlertItem: func,
    deleteAlert: func,
    handleSubmit: func,
    params: object,
    alerts: arrayOf(shape({
      title: string,
      body: string,
      alerttype: string,
      username: string
    }))
  },
  componentWillMount () {
    this.props.fetchAlertItem(this.props.params.id)
  },
  onDeleteClick (e) {
    console.log('onDeleteClick')
    e.preventDefault()
    this.props.deleteAlert(this.props.params.id).then(() => {
      browserHistory.push('/alerts')
    })
  },
  async submitIt (values) {
    console.log('Submitting')
    await updateAlerts(values)
    window.location.href = '/alerts'
  },
  render () {
    if (!this.props.alerts[0]) {
      return <div>Loading</div>
    }
    const { handleSubmit} = this.props;
    return (

        <form  onSubmit={handleSubmit(this.submitIt)}>
          <Card>
          <CardSection>
            <Field name='title' component={Input} placeholder='title' id='title' width={8} />
            <Field name='body' component={Input} placeholder='text' width={8}  />
            </CardSection>
            <CardSection>
            <Field name='alerttype' component={Input} data={aTypes} width={3} placeholder='type' />
            <Field name='username' component={Input} placeholder='username' />
            </CardSection>
            <Divider/>
            <CardSection>
              <p>
                <RaisedButton type='submit' backgroundColor={blue500} primary={true}>Save</RaisedButton>
                <Link to='/news' type='cancel' className='btn btn-primary black'>Cancel</Link>
                <RaisedButton  onClick={this.onDeleteClick}>Delete</RaisedButton>
              </p>
            </CardSection>
          </Card>
        </form>
    )
  }
})

const mapStateToProps = state => {
  return {alerts: state.alerts.alerts, initialValues: state.alerts.alerts[0]}
}
AlertItem = reduxForm({form: 'alertitem'})(AlertItem)

export default connect(mapStateToProps, {fetchAlertItem, deleteAlert})(AlertItem)
