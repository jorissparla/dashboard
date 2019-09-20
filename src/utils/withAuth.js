import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserContext } from 'globalState/UserProvider';

export default function(ComposedComponent) {
  const Authentication = props => {
    const { user, isAuthenticated } = React.useContext(UserContext);
    return <ComposedComponent {...props} authenticated={isAuthenticated || false} user={user} />;
  };

  return Authentication;
}

function a(ComposedComponent) {
  class Authentication extends Component {
    render() {
      return (
        <ComposedComponent
          {...this.props}
          authenticated={this.props.authenticated || false}
          user={this.props.user || {}}
        />
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect(mapStateToProps)(Authentication);
}
