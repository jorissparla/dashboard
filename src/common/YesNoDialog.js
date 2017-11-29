import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";

const styles = {
  buttonStyle: {
    margin: 5
  }
};
class YesNoDialog extends React.Component {
  render() {
    const { open, handleYes, handleNo, question } = this.props;
    const actions = [
      <RaisedButton label="No" secondary={true} style={styles.buttonStyle} onClick={handleNo} />,
      <RaisedButton label="Yes" primary={true} style={styles.buttonStyle} onClick={handleYes} />
    ];
    return (
      <Dialog open={this.props.open} actions={actions}>
        {question}
      </Dialog>
    );
  }
}

export default YesNoDialog;
