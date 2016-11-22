import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {browserHistory, Link} from 'react-router';
import {fetchAlertItem, updateAlerts, deleteAlert} from '../actions/index'
import DropdownList from 'react-widgets/lib/DropdownList'

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


const doSubmit = values => {
    console.log('DOSUBMIT',values)
    updateAlerts(values);
    browserHistory.push('/alerts');
}

class AlertItem extends Component {

    componentWillMount() {
        this
            .props
            .fetchAlertItem(this.props.params.id)
    }

    onDeleteClick(e) {
        console.log('onDeleteClick')
        e.preventDefault();
        this.props.deleteAlert(this.props.params.id).
        then(()=> {
        browserHistory.push('/alerts')
    });
  }

    render() {
        const {handleSubmit, fetchAlertItem, submitting} = this.props
        if (!this.props.alerts[0]) {
            return <div>Loading</div>
        }
        const alert = this.props.alerts[0]
        console.log(this.props);
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
                                <button className="btn btn-primary red" onClick={this.onDeleteClick.bind(this)}>Delete</button>
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

export default connect(mapStateToProps, {fetchAlertItem, deleteAlert})(AlertItem)