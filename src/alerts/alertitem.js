import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {browserHistory, Link} from 'react-router';
import {fetchAlertItem, updateAlerts} from '../actions/index'
import DropdownList from 'react-widgets/lib/DropdownList'

const aTypes = [
    { type: 'Notification',value: 'Notification' },
    { type: 'Alert', value: 'Alert'},
    { type: 'Warning', value: 'Warning'}

]

const inputField = ({ input, ...rest }) => {
    const classw = "input-field col s" + (rest.width || "4");
    //console.log(field)
    return (
        <div className={classw}>
            <input {...input} {...rest} />
        </div>
    )
}


const inputIcon = field => {
    return (
        <div>
            <div className="btn-floating red">
                <i
                    className="material-icons"
                    onClick={() => {
                    field.input.value = 'Poep';
                    //field.touched = true;
                    console.log('field', field)
                }}>warning</i>
            </div>
            <div className="btn-floating yellow">
                <i className="material-icons">star</i>
            </div>
            <input {...field.input} placeholder={field.placeholder}/>
        </div>
    )
}



const doSubmit = values => {
    updateAlerts(values);
    browserHistory.push('/alerts')
}

class AlertItem extends Component {

    componentWillMount() {
        this
            .props
            .fetchAlertItem(this.props.params.id)
    }

    render() {
        const {handleSubmit, fetchAlertItem, submitting} = this.props
        if (!this.props.alerts[0]) {
            return <div>Loading</div>
        }
        const alert = this.props.alerts[0]
        console.log(this.props)
        return (

            <div className="row">
                <form className="col s4" onSubmit={handleSubmit(doSubmit)}>
                    <Field name="title" component={inputField} placeholder="title" id="title" width={8}/>
                    <Field name="body" component={inputField} placeholder="text" width={8} multiLine={true} rows={2}/>
                    <Field name="alerttype" component={inputField} data={aTypes} width={3} placeholder="type"/>
                    <Field name="username" component={inputField} placeholder="username"/>
                                            <div className="col s8">
                            <p>
                                <button type="submit" className="btn btn-primary blue">Save</button>
                                <Link to="/news" type="cancel" className="btn btn-primary black">Cancel</Link>
                            </p>
                        </div>
                </form>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {alerts: state.alerts.alerts, initialValues: state.alerts.alerts[0]}
}
AlertItem = reduxForm({form: 'alertitem'})(AlertItem)

export default connect(mapStateToProps, {fetchAlertItem})(AlertItem)