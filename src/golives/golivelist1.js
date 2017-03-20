import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGoLives } from '../actions/index'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from 'moment'
import Spinner from '../utils/spinner';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import styled from 'styled-components';

const getDay = date => moment(date).format('MMM').toUpperCase().substr(0, 3) + moment(date).format('DD')
const rotate = (ar, index) => ar.slice(index, ar.length).concat(ar.slice(0, index))

const GoLiveItem = styled(ListItem) `


`
const GoLiveCustomer = styled.span`
  color: darkBlack
`

class GoLiveList1 extends Component {

  componentDidMount () {
    this.props.fetchGoLives()
  
  }

  componentWillUnmount () {
    clearInterval(this.timerhandle)
  }


  renderItems (items) {
    if (!items) return <div>loading</div>
    return items.map((item) => {
      const key = item.customerid + '-' + item.version
      let comments = '';
      if (!item.comments) {
        comments =''
      } else {
        comments = (item.comments.length > 300) ? item.comments.substr(0, 299) + '...' : item.comments
      }
      return (
        <GoLiveItem key={key}
          primaryText={getDay(item.date) }
          secondaryText={
            <p>
              <GoLiveCustomer>>{ item.customername }</GoLiveCustomer><br/>
              { comments}
            </p>
          }
          secondaryTextLines={2}
        />

      )
    })
  }

  render () {
    const { golives, nrItems = 4 } = this.props
    if (!golives || golives ===null ) {
      return (<div>
        <Spinner />
      </div>)
    }
    return (
      <div className='col s12 '>
        <h6>Upcoming Go Lives</h6>
        <ul className='collapsible animating' data-collapsible='expandable'>
          { this.renderItems(goLives1) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    golives: state.summary.golives
  }
}
export default connect(mapStateToProps, {
  fetchGoLives
})(GoLiveList1)
