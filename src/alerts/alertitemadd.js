import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {browserHistory, Link} from 'react-router';
import {createAlert} from '../actions/index'
import moment from 'moment';

const aTypes = [
    { type: 'Notification',value: 'Notification' },
    { type: 'Alert', value: 'Alert'},
    { type: 'Warning', value: 'Warning'}

]

const inputField = ({ input, ...rest }) => {
    const classw = "input-field col s" + (rest.width || "4");
    return (
        <div className={classw}>
            <input {...input} {...rest} />
        </div>
    )
}

const renderOptions = (aTypes) => {
    return (
        aTypes.map(item=> {
            return <option value={item.type}>{item.value}</option>
        })
    )
    
}

const selectField = field => {
    console.log('FIELD', field)
    return (
 <div className="input-field col s12">
    <select defaultValue={field.input.value}>
        {renderOptions(aTypes)}
     
    </select>
    <label>{field.placeholder}</label>
  </div>
    )
}


const doSubmit = values => {
    createAlert(values);
    browserHistory.push('/alerts')
}

class AlertItemAdd extends Component {

    render() {
        const {handleSubmit, createAlert, submitting} = this.props
        return (

            <div className="row">
                <form className="col s4" onSubmit={handleSubmit(doSubmit)}>
                  <Field name="alertdate" component={inputField} placeholder="Date" id="alertdate" width={8} type='date'/>
                    <Field name="title" component={inputField} placeholder="title" id="title" width={6}/>
                    <Field name="body" component={inputField} placeholder="text" width={8}/>
                    <Field name="alerttype" component={selectField} data={aTypes} width={3} placeholder="type"/>
                    <Field name="username" component={inputField} placeholder="username"/>
                                            <div className="col s8">
                            <p>
                                <button type="submit" className="btn btn-primary blue">Save</button>
                                <Link to="/alerts" type="cancel" className="btn btn-primary black">Cancel</Link>
                            </p>
                        </div>
                          
                </form>

            </div>

        )
    }
}


const defaultDate = () => new Date(Date.now() + 14 * 24 * 3600000)
  .toISOString()
  .substr(0, 10);

export default reduxForm({
  form: 'alertitemadd',initialValues: {
      alertdate: defaultDate()
  }
 
}, null, {createAlert})(AlertItemAdd);