import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGoLives } from '../actions/index'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from 'moment'
import Spinner from '../utils/spinner'

const getDay = date => moment(date).format('MMM').toUpperCase().substr(0, 3) + moment(date).format('DD')
const rotate = (ar, index) => ar.slice(index, ar.length).concat(ar.slice(0, index))

class GoLiveList extends Component {

  componentWillMount () {
    this.setState({
      index: 0
    })
  }

  componentDidMount () {
    this.props.fetchGoLives()
    this.setState({
      index: 0
    })
    this.timerhandle = setInterval(this.myTimer.bind(this), 16000)
  }

  componentWillUnmount () {
    clearInterval(this.timerhandle)
  }

  myTimer () {
    if (this.props.golives) {
      this.setState({
        index: this.state.index + 1
      })
      if (this.state.index > this.props.golives.length) {
        this.setState({
          index: 0
        })
      }
    }
  }

  renderItems (items) {
    return items.map((item, index) => {
      let class1 = 'collapsible-header '
      let class2 = ''
      let class3 = 'collapsible-body hide golive-noshow'
      if (index === 0) {
        class1 += 'active'
        class2 += 'active golive-header'
        class3 = 'collapsible-body show'
      }
      const key = item.customerid + '-' + item.version
      const comments = (item.comments.length > 300) ? item.comments.substr(0, 299) + '...' : item.comments
      return (

        <li className={class2} key={key}>
          <div className={class1}><i className='mdi-av-web' />
            <span className='lalign'>{ item.customername }</span>
            <span className='ralign'>{ getDay(item.date) }</span>
          </div>
          <div className={class3}>
            <p className='golive'>
              { comments }.</p>
          </div>
        </li>

      )
    })
  }

  render () {
    const { golives, nrItems = 4 } = this.props
    if (!golives) {
      return (<div>
        <Spinner />
      </div>)
    }
    const displayNr = Math.min(nrItems, golives.length)
    const index = (!this.state.index) ? 0 : this.state.index
    const goLives1 = rotate(golives, index).slice(0, displayNr)
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
})(GoLiveList)
