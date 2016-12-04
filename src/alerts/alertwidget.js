import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAlerts} from '../actions/index'
import {Link} from 'react-router';
import moment from 'moment'
//import Spinner from '../utils/spinner'

const formatDate = date => moment(date).format("MMM, D")


const rotate = (ar, index) => ar.slice(index, ar.length).concat(ar.slice(0, index))

class AlertWidget extends Component {

    
    componentWillMount() {
                this.setState({ index: 0 })
    }
    

    componentDidMount() {
        this.props.fetchAlerts()
        this.setState({ index: 0 })
        this.timerhandle=setInterval(this.myTimer.bind(this), 5000)

    }
    componentWillUnmount() {
        clearInterval(this.timerhandle)
    }

    myTimer() {
        if (this.props.alerts) {
            this.setState({ index: this.state.index+1 })
            if (this.state.index > this.props.alerts.length) {
                this.setState({index: 0})
            }
        }

    }

    renderAlertsItems(alerts) {
        return alerts.map((item, index) => {
            let class1 = "collapsible-header " 
            let class2 =""
            let class3 ="collapsible-body hide"
            if (index ===0) { 
                class1 += "active"; 
                class2 += "active";
                class3 = "collapsible-body show";
            }
            return (
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
            return <div>Loading</div>
        }
        const index = (!this.state.index)? 0: this.state.index;
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

                    {this.renderAlertsItems(rotate(alerts, index))}
                </ul>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {alerts: state.alerts.alerts}
}

export default connect(mapStateToProps, {fetchAlerts})(AlertWidget)