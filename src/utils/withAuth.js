import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    render() {
      console.log("this.props", this.props);
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
