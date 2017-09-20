import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import styled, { keyframes } from "styled-components";
export const niceblue = "#40a5ed";
export const babyblue = "#ecf6fd";
export const twitterblue = "#1da1f2";

const H1 = styled.h1`
  font-weight: 200;
  font-family: Roboto;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 4px;
  width: 200px;
  height: 28px;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
`;

const TextArea = styled.textarea`
  font-family: Roboto;
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 4px;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-decoration: none;
  resize: none;
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

class Request extends Component {
  state = { name: "", email: "", text: "", page: "SupportCard" };
  _onSubmit = async e => {
    e.preventDefault();
    console.log("Submit", this.state);
    await this.props.createRequest({ variables: this.state });
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
          <H1>{this.state.page} Request</H1>
          <FlexRow>
            <Input
              placeholder="Enter Name"
              name="name"
              onChange={this.onChangeName}
            />
            <Input placeholder="Enter email" onChange={this.onChangeEmail} />

          </FlexRow>
          <TextArea
            placeholder="Enter Text"
            rows={10}
            cols={50}
            onChange={this.onChangeText}
          />
          <Button type="submit" onClick={this._onSubmit}>Enter Request</Button>
        </FlexCol>
      </form>
    );
  }
}

const createRequestMutation = gql`
mutation createRequest($name: String, $email: String, $text:String) {
  createRequest(input: {name: $name, email: $email, text: $text}) {
    id
  }
}
`;

export default graphql(createRequestMutation, { name: "createRequest" })(
  Request
);
