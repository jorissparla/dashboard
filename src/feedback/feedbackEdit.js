import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import UserAvatar from "react-user-avatar";
import { CardSection, Input } from "../common";

const styles = {
  TextFieldStyle: {
    flex: 1,
    width: 200,
    padding: 2,
    marginRight: 30
  }
};
const buttonStyle = {
  backgroundColor: "#ffc600",
  labelColor: "white",
  margin: "20px"
};
const buttonStyle2 = {
  backgroundColor: "black",
  labelColor: "white",
  margin: "20px"
};

class FeedbackForm extends Component {
  state = {
    createdAt: null,
    fullname: "",
    navid: "",
    text: "",
    customername: ""
  };
  handleChange = () => {};
  render() {
    return (
      <div>
        <CardSection style={{ fontSize: "36px", fontFamily: "Oswald" }}>
          Add Customer Feedback
        </CardSection>
        <form>
          <CardSection
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TextField
              inputStyle={styles.TextFieldStyle}
              style={styles.TextFieldStyle}
              name="fullname"
              floatingLabelText="Consultant"
              value={this.state.fullname}
              width={2}
              onChange={this.handleChange}
            />
            <TextField
              inputStyle={styles.TextFieldStyle}
              style={styles.TextFieldStyle}
              name="customer"
              floatingLabelText="Customer"
              value={this.state.customername}
              width={2}
              onChange={this.handleChange}
            />
          </CardSection>
          <CardSection>
            <TextField
              inputStyle={styles.TextFieldStyle}
              style={styles.TextFieldStyle}
              name="text"
              type="textarea"
              floatingLabelText="Comment"
              value={this.state.text}
              width={2}
              onChange={this.handleChange}
            />
          </CardSection>
          <CardSection>
            <RaisedButton primary={true} style={buttonStyle} label="Submit" />
            <RaisedButton secondary={true} style={buttonStyle2} label="Cancel" type="reset" />
          </CardSection>
        </form>
      </div>
    );
  }
}

export default FeedbackForm;
