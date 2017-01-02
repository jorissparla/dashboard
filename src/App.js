import React from 'react'

// import logo from './logo.svg';
import './App.css'
import Header  from './appnav'
// import DashBoardContainer from './dashboardcontainer'
const { arrayOf, object } = React.PropTypes
const App = React.createClass({
  propTypes: {
    children: arrayOf(object)
  },
  render () {
    return (
      <div className='App'>
        <Header />
        {this.props.children}
      </div>
    )
  }
})

export default App
