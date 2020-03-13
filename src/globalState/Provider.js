import React from 'react';
import { client } from '../index';
import { MUTATION_SIGNIN } from './../auth/signin';
import { MUTATION_SIGNOUT } from './../auth/signout';
import { CURRENT_USER_QUERY } from './../graphql/CURRENT_USER_QUERY';

export const DashBoardContext = React.createContext({
  name: 'Joris'
});

export default class DashBoardContextProvider extends React.Component {
  state = {
    user: {},
    email: localStorage.getItem('email'),
    picture: localStorage.getItem('picture'),
    image: localStorage.getItem('picture'),
    role: localStorage.getItem('role'),
    fullname: localStorage.getItem('name'),
    getUser: () => {
      const { email, picture, role, fullname, image } = this.state;
      return {
        user: {
          email,
          picture,
          role,
          fullname,
          image
        }
      };
    },
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
  async login(email, password) {
    client
      .mutate({ mutation: MUTATION_SIGNIN, variables: { input: { email, password } } })
      .then(result => {
        if (result.signinUser.user) {
          const { id, email, image, fullname, role } = result.data.signinUser.user;
          this.setUser(id, email, image, image, fullname, role);
        }
        return result;
      });
  }
  async logout() {
    client.mutate({ mutation: MUTATION_SIGNOUT }).then(result => {
      if (result) {
        this.clearUser();
      }
    });
  }
  componentDidMount() {
    client.query({ query: CURRENT_USER_QUERY }).then(result => {
      // console.log('current_user_query');
      if (!result.data.me) {
        this.state.clearUser();
      } else {
        const { id, email, image, fullname, role } = result.data.me;
        this.state.setUser(id, email, image, image, fullname, role);
      }
    });
  }
  render() {
    // console.log('Sahsboard', this.state);
    return (
      <DashBoardContext.Provider value={this.state}>
        {this.props.children}
      </DashBoardContext.Provider>
    );
  }
}

export function withDashBoardContext(Component) {
  return function dashBoardedComponent(props) {
    console.log('Dashboard props', props);
    return (
      <DashBoardContext.Consumer>
        {context => <Component {...props} context={context} />}
      </DashBoardContext.Consumer>
    );
  };
}
