import React from 'react'

const DashBoardContext = React.createContext({
  name: 'Joris',

})

export default class DashBoardContextProvider extends React.Component {
  state = {
    email: localStorage.getItem("email"),
    picture: localStorage.getItem("picture"),
    image: localStorage.getItem("picture"),
    role: localStorage.getItem("role"),
    fullname: localStorage.getItem("name"),
    setUser: (id, email, image, picture, fullname, role, token) => {
      this.setState({ id, email, image, picture, fullname, role })
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", fullname);
      localStorage.setItem("picture", image);
      localStorage.setItem("role", role);
    },
    authenticated: () => this.state.email ? true : false
  }
  render() {
    return <DashBoardContext.Provider value={this.state}>{this.props.children}</DashBoardContext.Provider>
  }
}

export { DashBoardContext }