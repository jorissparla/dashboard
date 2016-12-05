import React from 'react'

//import logo from './logo.svg';
import './App.css';
import AppNavBar from './appnav'
const { arrayOf, object } = React.PropTypes
const App = React.createClass({
  propTypes: {
    children: arrayOf(object)
  },
  render () {
    return (
      <div className='App'>
        <AppNavBar />
        {this.props.children}
      </div>
    )
  }
})

export default App
