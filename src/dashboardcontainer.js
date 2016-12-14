import React, {Component} from 'react'
import DashBoard from './dashboard'
import DashBoardStats from './dashboardstats'
import Award from './awards/award'

class DashBoardContainer extends Component {

  componentDidMount () {
    this.setState({
      index: 2
    })
    setInterval(this.myTimer.bind(this), this.props.refreshInterval || 90000)
  }

  myTimer () {
    const newIndex = (this.state.index === 2 ? 0 : this.state.index + 1)
    this.setState({
      index: newIndex
    })
  }

  render () {
    if (!this.state) {
      return <div>Loading...</div>
    }
    return (
      <div>
        { this.renderDashBoard(this.state.index) }
      </div>
    )
  }

  renderDashBoard (index) {
    switch (index) {
      case 1:
        return <DashBoard />
      case 2:
        return <DashBoardStats />
      case 0:
        return <Award />
      default:
        return <div>Invalid Dashboard</div>
    }
  }
}

const { number } = React.PropTypes

DashBoardContainer.propTypes = {
  refreshInterval: number
}

export default DashBoardContainer
