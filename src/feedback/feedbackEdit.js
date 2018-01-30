import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { CardSection, Input } from "../common";
import { Image } from "../styles";

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

const querySupportFolks = gql`
  query supportFolks {
    supportfolks {
      id
      navid
      fullname
      image
    }
  }
`;

class FeedbackForm extends Component {
  state = {
    createdAt: null,
    fullname: "",
    navid: "",
    image: null,
    text: "",
    customername: ""
  };
  handleChange = () => {};
  handleChangePerson = (e, i, v) => {
    console.log(i, v, this.props.data.supportfolks[i].fullname);
    this.setState({
      navid: v,
      fullname: this.props.data.supportfolks[i].fullname,
      image: this.props.data.supportfolks[i].image
    });
  };
  render() {
    console.log(this.props);
    const { data: { loading, supportfolks } } = this.props;
    if (loading) return <div>Loading</div>;
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
            <Image image={this.state.image} fullname={this.state.fullname} />
            <SelectField
              id="person"
              name="person"
              hintText="Select a person"
              multiple={false}
              onChange={this.handleChangePerson}
              style={{ flex: 2 }}
              value={this.state.navid}
            >
              {supportfolks.map(person => (
                <MenuItem key={person.id} value={person.navid} primaryText={person.fullname} />
              ))}
            </SelectField>
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

export default graphql(querySupportFolks)(FeedbackForm);
