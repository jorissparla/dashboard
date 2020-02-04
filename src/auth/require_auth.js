import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../globalState/UserProvider';

export const AuthRoute = ({ component: Component, allowed, xuser, ...rest }) => {
  const { user } = useContext(UserContext);
  // console.log('the user is ', user);

  // const { authenticated } = user;

  return (
    <Route
      {...rest}
      render={props => {
        // console.log('🙈🙈🙈🙈', props, { user }, { xuser });
        if (!user) {
          return <Redirect to={{ pathname: '/' }} />;
        }
        // console.log('allowed', allowed, user);
        // console.dir(user);
        if (!allowed || allowed.indexOf(user.role || []) >= 0) {
          return <Component {...props} user={user} />;
        } else {
          console.log('not allowed user ', user.role);
          return <Redirect to={{ pathname: '/' }} />;
        }
      }}
    />
  );
};

export const EnhancedRoute = ({ component: Component, editors = [], user, ...rest }) => {
  let isEditor = false;
  if (user) {
    isEditor = editors.indexOf(user.role) !== -1;
  }
  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...props} user={user} isEditor={isEditor} {...rest} />;
      }}
    />
  );
};

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect(mapStateToProps)(withRouter(Authentication));
}
