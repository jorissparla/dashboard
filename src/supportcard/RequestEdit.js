import React, { Component } from "react";
import gql from "graphql-tag";
import {  Query, Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { format } from "date-fns";
import RequestForm from "./RequestForm";
import { ALL_REQUESTS_QUERY } from "./RequestContainer";

class RequestEdit extends Component {
  state = {};

  handleSave = async (values, updateRequest) => {
    console.log("handleSave", values);
    const { id, assigned, text, complete } = values;
    const input = {
      id,
      assigned,
      text,
      complete,
      updatedAt: format(new Date(), "YYYY-MM-DD")
    };
    console.log(input);
    const result = await updateRequest({ variables: { input } });
    this.props.history.push("/requestlist");
    console.log("result", result);
  };

  render() {
    return (
      <Query query={CURRENT_REQUEST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return "Loading...";
          }
          const { request, accounts } = data;
          return (
            <Mutation mutation={UPDATE_REQUEST_MUTATION} refetchQueries={[{ query: ALL_REQUESTS_QUERY }]}>
              {updateRequest => {
                return (
                  <RequestForm
                    request={request}
                    accounts={accounts}
                    onSave={values => this.handleSave(values, updateRequest)}
                    onCancel={() => {
                      console.log("cancel");
                      this.props.history.push("/requestlist");
                    }}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

const CURRENT_REQUEST_QUERY = gql`
  query CURRENT_REQUEST_QUERY($id: ID!) {
    request(id: $id) {
      id
      name
      text
      assigned
      complete
      createdAt
      updatedAt
    }
    accounts(roles: ["PO", "Admin"]) {
      id
      fullname
      image
    }
  }
`;
const UPDATE_REQUEST_MUTATION = gql`
  mutation UPDATE_REQUEST_MUTATION($input: InputRequestType) {
    updateRequest(input: $input) {
      id
    }
  }
`;

export default withRouter(RequestEdit);
