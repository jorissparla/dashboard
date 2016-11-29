import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchGoLives} from '../actions/index'

class GoLiveList extends Component {

    componentDidMount () {
        this.props.fetchGoLives();
    }

    renderItems (items) {
        return items.map( (item, index) => {
            const cls0 = (index===1?"active":"")
            const cls1 = "collapsible-header "+(index===1?"active":"")
            let class3 ="collapsible-body hide"
            if (index === 1) { class3 = "collapsible-body show"; }
            const key = item.customerid+"-"+item.version;
            return ( 
                <li className="" key={key}>
                <div className="collapsible-header"><i className="mdi-av-web"></i>{item.customername}</div>
                <div className={class3}><p>{item.comments}.</p></div>
              </li>
              )
        })
    }   

    render () {
        const {golives} = this.props;

        if (!golives ) {
            return (<div>Loading...</div>)
        }
        const goLives1 = golives.slice(0,4)
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