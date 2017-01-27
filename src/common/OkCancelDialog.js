import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class OkCancelDialog extends Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
    this.props.handleSubmit()
  };

  handleClose = () => {
    this.setState({open: false});
    this.props.handleCancel()
  };
  render () {
    console.log('renderOKCancelDialog', this.state, this.props)
    const { title, body, open } = this.props
 const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title={title || "Dialog With Actions"}
          actions={actions}
          modal={false}
          open={this.state.open || this.props.open}
          onRequestClose={this.handleClose}
        >
          {body || 'Proceed?'}
        </Dialog>
      </div>
    );
  }
}

export { OkCancelDialog }