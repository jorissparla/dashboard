import React from 'react'

const DashBoardContext = React.createContext({
  name: 'Joris',

})

export default class DashBoardContextProvider extends React.Component {
  state = {
    email: localStorage.getItem("email"),
    picture: localStorage.getItem("picture"),
    role: localStorage.getItem("role"),
    fullname: localStorage.getItem("name")
  }
  render() {
    return <DashBoardContext.Provider value={this.state}>{this.props.children}</DashBoardContext.Provider>
  }
}

export { DashBoardContext }