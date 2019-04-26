import React, { Component, useState } from 'react';
import SharedSnackbar from './SharedSnackbar';

export const SharedSnackbarContext = React.createContext();

export const SharedSnackbarProvider = props => {
  const [isOpen, setisOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <SharedSnackbarContext.Provider
      value={{
        openSnackbar: () => setisOpen(true),
        closeSnackbar: () => setisOpen(false),
        snackbarIsOpen: isOpen,
        message: message,
        setMessage: msg => setMessage(msg)
      }}
    >
      <SharedSnackbar />
      {props.children}
    </SharedSnackbarContext.Provider>
  );
};

export class SharedSnackbarProvider1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: ''
    };
  }

  openSnackbar = message => {
    this.setState({
      message,
      isOpen: true
    });
  };

  closeSnackbar = () => {
    this.setState({
      message: '',
      isOpen: false
    });
  };

  render() {
    const { children } = this.props;

    return (
      <SharedSnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: this.state.isOpen,
          message: this.state.message
        }}
      >
        <SharedSnackbar />
        {children}
      </SharedSnackbarContext.Provider>
    );
  }
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;
