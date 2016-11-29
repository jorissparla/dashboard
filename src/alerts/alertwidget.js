import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAlerts} from '../actions/index'
import {Link} from 'react-router';
import moment from 'moment'

const formatDate = date => moment(date).format("MMM, D")

class AlertWidget extends Component {

    componentDidMount() {
        this
            .props
            .fetchAlerts()
    }

    renderAlertsItems(alerts) {
        return alerts.map(item => {
            return (

                <li className="collection-item App-align " key={item.id}>
                        <span className=" new badge black" data-badge-caption=" ">{formatDate(item
                                .createdate)
                                }</span>
<h5 className="left-align ">{item.title}</h5>
                    <div className="divider"></div>
                    <div className="left-align ">
                        {item.body} 
                    </div>

             </li>

            )
        })
    }

    render() {
        const alerts = this.props.alerts;
        if (!alerts) {
            return <div>Loading</div >
        }
        return (
            <div className="col s12">
            <ul className="collection with-header ">
                <li className="collection-header App-align blue white-text row ">
                <div className="col s8">
                    <h5>Alerts</h5>
                    </div><div className="col s4"><Link to={"/alerts/new"} className="btn-floating btn-small orange waves-effect waves-light align-right ">
                        <i className="material-icons">add</i>
                    </Link>
                    </div>
                </li>
                <div className="row">
                <form className="col s12">
                <div className="row">
                <div className="col s6">
                <div className="input-field  align-center">
                    <input type="text" placeholder="text" />
                    </div>
                    </div>
                <div className="input-field col s6">
                  <input type="date" placholder="date" className="datepicker" />
                    </div>
                    </div>
                    </form>
                    </div>
                {this.renderAlertsItems(alerts)}
            </ul>
            </div>

        );
    }}
const mapStateToProps = (state) => {
    return {alerts: state.alerts.alerts}
}

export default connect(mapStateToProps, {fetchAlerts})(AlertWidget)