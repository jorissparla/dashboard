import React, { Component } from "react";
import { signoutUser } from "../actions";
import { withRouter } from "react-router-dom";

class Signout extends Component {
  componentWillMount() {
    signoutUser();
  }

  componentDidMount() {
    setTimeout(() => {
      window.location.reload();
      this.props.history.replace("/");
    }, 2000);
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

export default withRouter(Signout);
