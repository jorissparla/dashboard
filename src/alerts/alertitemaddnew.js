import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createAlert } from "../actions/index";
import AlertItemForm from "./alertitemForm";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardSection } from "../common";

const styles = {
  buttonStyle: {
    backgroundColor: "#ffc600",
    labelColor: "white",
    margin: "20px"
  },
  buttonStyle2: {
    backgroundColor: "black",
    labelColor: "white",
    margin: "20px"
  }
};

const AlertFormButtons = () => {
  const { buttonStyle, buttonStyle2 } = styles;
  return (
    <CardSection style={{ backgroundColor: "red", height: 500 }}>
      <RaisedButton
        primary={true}
        style={buttonStyle}
        label="Submit"
        type="submit"
      />
      <RaisedButton
        secondary={true}
        style={buttonStyle2}
        label="Cancel"
        type="submit"
      />
    </CardSection>
  );
};

class AlertItemAddNew extends Component {
  doSubmit = values => {
    alert("doSubmit");
    createAlert(values);
    setTimeout(() => this.props.history.push("/alerts"), 500);
  };

  render() {
    return (
      <Card>

        <CardSection>
          <AlertItemForm onSave={this.doSubmit} buttons={AlertFormButtons()} />
        </CardSection>

      </Card>
    );
  }
}

export default connect(null, { createAlert })(withRouter(AlertItemAddNew));
