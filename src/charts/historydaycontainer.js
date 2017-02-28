import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHistoryDay} from '../actions/index'
import HistoryChart from './historychart'

class HistoryChartDayContainer extends Component {
  myTimer () {
    const data = (!this.props.data) ? ['LN', 'Tools', 'Logistics', 'Finance'] : this.props.data
    this.setState({
      index: this.state.index + 1,
      nrCols: data.length
    })

    const {nrCols, index} = this.state
    if (index > nrCols - 1) {
      this.setState({
        index: 0
      })
    }
  }

  componentWillMount () {
    this.setState({ index: 0 })
  }

  componentDidMount () {
    this.props.fetchHistoryDay()
    this.timerhandle = setInterval(this.myTimer.bind(this), this.props.refreshRate || 10000)
  }

  componentWillUnmount () {
    clearInterval(this.timerhandle)
  }

  render () {
    const data = (!this.props.data) ? [ 'LN', 'Logistics',  'Finance', 'Tools','LN','LN'] : this.props.data

    const column = data[this.state.index || 0]
    const history = this.props.history // .reverse();
    console.log(`history ${history}`);
    
    const color = this.props.color || '#ffb74d'
    const title = 'Backlog '.concat(column)
    if (!history) return <div> Loading....</div>
    return (
      <div>
        <HistoryChart data={history}
          title={title}
          type='area'
          color={color}
          xvalue='day'
          value={column}
            />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {history: state.summary.history_day}
}

export default connect(mapStateToProps, {fetchHistoryDay})(HistoryChartDayContainer)
