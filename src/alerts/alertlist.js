import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAlerts} from '../actions/index'
import {Link} from 'react-router';

class AlertList extends Component {

    componentDidMount() {
        this
            .props
            .fetchAlerts()
    }

    renderAlertsItems(alerts) {
        return alerts.map(item => {
            return (

                <li className="collection-item App-align" key={item.id}>
                    <div className="row">
                        <h5>{item.title}</h5>
                        <div className="col s7 ">
                            {item.body}
                        </div>
                        <div className="right">
                            <Link
                                to={"/alerts/" + item.id}
                                className="btn-floating btn-small right waves-effect waves-light blue">
                                <i className="material-icons">mode_edit</i>
                            </Link>

                        </div>

                    </div>
                </li>

            )
        })
    }

    render() {
        const alerts = this.props.alerts;
        if (!alerts) {
            return <div>Loading</div>
        }
        return (
            <div>
                <ul className="collection with-header">
                    <div className="row">
                        <li className="collection-header App-align ">
                            <h4>Alerts</h4>

                        </li>
                    </div>
                    {this.renderAlertsItems(alerts)}
                </ul>
                <div className="fixed-action-button">
                    <Link
                        to={"/alerts/new"}
                        className="btn-floating btn-large waves-effect waves-light orange ">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log('state', state)
    return {alerts: state.alerts.alerts}
}

export default connect(mapStateToProps, {fetchAlerts})(AlertList)