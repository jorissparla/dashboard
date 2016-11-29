import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchGoLives} from '../actions/index'

class GoLiveList extends Component {

    componentDidMount () {
        this.props.fetchGoLives();
    }

    renderItems (items) {
        console.log('GOLIVELIST',items)
        return items.map( (item) => {
            console.log('GOLIVE', item)
            const key = item.customerid+"-"+item.version;
            return ( 
                <li className="active" key={key}>
                <div className="collapsible-header active"><i className="mdi-av-web"></i>{item.customername}</div>
                <div className="collapsible-body active"><p>{item.comments}.</p></div>
              </li>
              )
        })
    }   

    render () {
        const {golives} = this.props;

        if (!golives ) {
            return (<div>Loading...</div>)
        }
        return (
        <div className="col s12 ">
            <h6>Upcoming Go Lives</h6>
            <ul className="collapsible">
                {this.renderItems(golives)}
            </ul>
          </div>
        )
    }
}



const mapStateToProps = state => {
         return {golives: state.summary.golives}
}
export default connect(mapStateToProps, {fetchGoLives})(GoLiveList);