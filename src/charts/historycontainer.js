import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHistory} from '../actions/index'
import HistoryChart from './historychart'

class HistoryChartContainer extends Component {
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
    this.props.fetchHistory()
    this.timerhandle = setInterval(this.myTimer.bind(this), this.props.refreshRate || 20000)
  }

  componentWillUnmount () {
    clearInterval(this.timerhandle)
  }

  render () {
    const data = (!this.props.data) ? [ 'Tools', 'Logistics', 'Finance', 'LN','LN','LN',] : this.props.data

    const column = data[this.state.index || 0]
    const history = this.props.history // .reverse();
    const color = this.props.color || '#ffb74d'
    const title = 'Backlog '.concat(column)
    return (
      <div>
        <HistoryChart data={history}
          title={title}
          type='area'
          color={color}
          xvalue='hour'
          value={column}
            />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {history: state.summary.history}
}

export default connect(mapStateToProps, {fetchHistory})(HistoryChartContainer)
