import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import TextField from "material-ui/TextField";
export const niceblue = "#40a5ed";
export const babyblue = "#ecf6fd";
export const twitterblue = "#1da1f2";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  display: flex;
  align-items: flex-start;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid red;
  text-decoration: none;
  background-color: red;
  opacity: 0.7;
  color: white;
  font-family: Roboto;
  font-size: 15px;
  
  transition: all 0.45s;
  text-align: center;
  line-height: 36px;
  margin-left: 8px;
`;

export const Button = styled.button`
  display: inline-block;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  max-width: 200px;
  border-radius: 4px;
  border: 1px solid ${niceblue};
  text-decoration: none;
  color: #0ae;
  font-family: Roboto;
  font-size: 15px;
  background: transparent;
  transition: all 0.45s;
  text-align: center;
  line-height: 36px;
  margin-left: 8px;
  &:hover{
    background: #40a5ed;
    color: white;
}
`;

const StyledTextField = styled(TextField)`
  margin: 20px;
`;
class Request extends Component {
  state = { name: "", email: "", text: "", page: "SupportCard", error: "" };

  isNotEmpty = value => (value ? true : false);
  isValidEmail = email => /\S+@\S+\.\S+/.test(email);

  checkErrors = ({ email, name, text }) => {
    let error = "";
    if (!this.isValidEmail(email)) {
      error += " Invalid email address ";
    }
    if (!this.isNotEmpty(name)) {
      error += " - Name cannot be empty ";
    }
    if (!this.isNotEmpty(text)) {
      error += " - Text  cannot be empty ";
    }
    this.setState({ error });
    return error === "";
  };

  onChangeName = ({ target: { value } }) => {
    this.setState({ name: value });
  };
  onChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value });
  };
  onChangeText = ({ target: { value } }) => {
    this.setState({ text: value });
  };
  render() {
    console.log(this.props);
    return (
      <form action="">
        <FlexCol>
          {/*<H1>{this.state.page} Request</H1> */}
          <FlexRow>
            <StyledTextField
              placeholder="Enter Name"
              name="name"
              onChange={this.onChangeName}
            />
            <StyledTextField
              placeholder="Enter email"
              onChange={this.onChangeEmail}
            />

          </FlexRow>
          <StyledTextField
            placeholder="Enter Text"
            multiLine={true}
            rows={2}
            fullWidth={true}
            onChange={this.onChangeText}
          />
          <Button type="submit" onClick={this._onSubmit}>Enter Request</Button>
          {this.state.error && <Error>{this.state.error}</Error>}
        </FlexCol>
      </form>
    );
  }

  _onSubmit = async e => {
    e.preventDefault();
    if (!this.checkErrors(this.state)) {
      return;
    } else {
      console.log("Submit", this.state);
      await this.props.createRequest({ variables: this.state });
      setTimeout(() => this.props.onSubmit(), 2000);
    }
  };
}

const createRequestMutation = gql`
mutation createRequest($name: String, $email: String, $text:String) {
  createRequest(input: {name: $name, email: $email, text: $text}) {
    id
  }
}
`;

export default graphql(createRequestMutation, { name: "createRequest" })(
  withRouter(Request)
);
