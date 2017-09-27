import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { Route } from "react-router-dom";

export const AuthRoute = ({ component: Component, allowed, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          return <Redirect to={{ pathname: "/" }} />;
        }

        if (allowed.indexOf(user.role) >= 0) {
          console.log("user ", user.role);
          return <Component {...props} />;
        } else {
          console.log("not allowed user ", user.role);
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/");
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
