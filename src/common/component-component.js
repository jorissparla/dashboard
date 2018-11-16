import React from 'react';

export default class Component extends React.Component {
  state = this.props.initialValue || {};

  _setState = state => {
    this.setState(state);
  };
  render() {
    const { children } = this.props;
    const { state } = this;
    if (typeof children === 'function') {
      return children({ state, setState: this._setState });
    } else {
      return children || null;
    }
  }
}
