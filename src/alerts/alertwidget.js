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
        return alerts.map((item, index) => {
            let class1 = "collapsible-header " 
            let class2 =""
            let class3 ="collapsible-body hide"
            if (index ===0) { class1 = class1+ "active"; }
            if (index ===0) { class2 = class2+ "active"; }
            if (index ===0) { class3 = "collapsible-body show"; }
            return (

/*                <li className="collection-item App-align " key={item.id}>
                    <span className=" new badge black" data-badge-caption=" ">{formatDate(item.createdate)
}</span>
                    <h5 className="left-align ">{item.title}</h5>
                    <div className="divider"></div>
                    <div className="left-align ">
                        {item.body}
                    </div>

                </li>*/
                <li className={class2} key={item.id}>
                <div className={class1}><i className="material-icons">add_alert</i>{item.title}</div>
                <div className={class3}><p>{item.body}.</p></div>
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
                 <ul className="collapsible " data-collapsible="expandable">
                    <li className="collection-header App-align blue white-text row ">
                        <div className="col s8">
                            <h5>Alerts</h5>
                        </div>
                        <div className="col s4">
                            <Link
                                to={"/alerts/new"}
                                className="btn-floating btn-small orange waves-effect waves-light align-right ">
                                <i className="material-icons">add</i>
                            </Link>
                        </div>
                    </li>

                    {this.renderAlertsItems(alerts)}
                </ul>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {alerts: state.alerts.alerts}
}

export default connect(mapStateToProps, {fetchAlerts})(AlertWidget)