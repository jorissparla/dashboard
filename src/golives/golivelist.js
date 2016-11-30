import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchGoLives} from '../actions/index'
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';
import moment from 'moment';



const getDay =date => moment(date).format("MMM").toUpperCase().substr(0,1)+ moment(date).format("DD")
const rotate = (ar, index) => ar.slice(index, ar.length).concat(ar.slice(0, index))

class GoLiveList extends Component {

    componentWillMount() {
                this.setState({ index: 0 })
    }
    

    componentDidMount () {
        this.props.fetchGoLives();
        this.setState({ index: 0 })
        setInterval(this.myTimer.bind(this), 6000)
    }

    myTimer() {
        if (this.props.golives) {
            this.setState({ index: this.state.index+1 })
            if (this.state.index > this.props.alerts.length) {
                this.setState({index: 0})
            }
        }

    }

    renderItems (items) {
        return items.map( (item, index) => {
            let class1 = "collapsible-header " 
            let class2 =""
            let class3 ="collapsible-body hide"
            if (index ===0) { class1 = class1+ "active"; }
            if (index ===0) { class2 = class2+ "active"; }
            if (index ===0) { class3 = "collapsible-body show"; }

            const key = item.customerid+"-"+item.version;
            const comments = (item.comments.length >300)? item.comments.substr(0,299)+"...": item.comments;
            return ( 
                  <ReactCSSTransitionGroup  transitionName="fadeup"
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1300}>
                <li className={class2} key={key}>
                <div className={class1}><i className="mdi-av-web"></i>
                    <span className="lalign">{item.customername}</span>
                    <span className="ralign">{getDay(item.date)}</span>
                </div>
                <div className={class3}><p>{comments}.</p></div>
              </li>
              </ReactCSSTransitionGroup>
              )
        })
    }   

    render () {
        const {golives} = this.props;

        if (!golives ) {
            return (<div>Loading...</div>)
        }
         const index = (!this.state.index)? 0: this.state.index;
        const goLives1 = rotate(golives.reverse(), index).slice(0,4)
        return (
        <div className="col s12 ">
            <h6>Upcoming Go Lives</h6>
              <ul className="collapsible" data-collapsible="expandable">
                {this.renderItems(goLives1)}
            </ul>
          </div>
        )
    }
}



const mapStateToProps = state => {
         return {golives: state.summary.golives}
}
export default connect(mapStateToProps, {fetchGoLives})(GoLiveList);