import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class ErrorDialog extends React.Component {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} />
    ];
    const { message = 'Error' } = this.props;
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {message}
        </Dialog>
      </div>
    );
  }
}
