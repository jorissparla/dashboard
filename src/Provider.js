import React from 'react';

export const DashBoardContext = React.createContext({
  name: 'Joris'
});

export default class DashBoardContextProvider extends React.Component {
  state = {
    email: localStorage.getItem('email'),
    picture: localStorage.getItem('picture'),
    image: localStorage.getItem('picture'),
    role: localStorage.getItem('role'),
    fullname: localStorage.getItem('name'),
    setUser: (id, email, image, picture, fullname, role, token) => {
      this.setState({ id, email, image, picture, fullname, role });
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('name', fullname);
      localStorage.setItem('picture', image);
      localStorage.setItem('role', role);
    },
    clearUser: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      localStorage.setItem('email', '');
      localStorage.setItem('picture', '');
      localStorage.setItem('role', '');
    },
    setProfilePic: image => {
      this.setState(prevState => ({ ...prevState, image }));
      console.log('setProfilePic', image, this.state);
      localStorage.setItem('picture', image);
    },
    authenticated: () => (this.state.email ? true : false)
  };
  render() {
    return (
      <DashBoardContext.Provider value={this.state}>
        {this.props.children}
      </DashBoardContext.Provider>
    );
  }
}

export function withDashBoardContext(Component) {
  return function dashBoardedComponent(props) {
    return (
      <DashBoardContext.Consumer>
        {context => <Component {...props} context={context} />}
      </DashBoardContext.Consumer>
    );
  };
}
