import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { format } from "date-fns";
import RequestForm from "./RequestForm";

class RequestEdit extends Component {
  state = {};

  handleSave = async values => {
    console.log("handleSave", values);
    const { accounts, ...other } = values;
    const input = {
      id: other.id,
      assigned: other.assigned,
      text: other.text,
      complete: other.complete,
      updatedAt: format(new Date(), "YYYY-MM-DD")
    };
    console.log(input);
    const result = await this.props.updateRequest({ variables: { input } });
    this.props.history.push("/requestlist");
    console.log("result", result);
  };

  render() {
    if (this.props.request.loading) {
      return <div>Loading...</div>;
    }
    if (this.props.request.error) {
      return <div>Error...</div>;
    }

    const { request, accounts } = this.props.request;

    return (
      <RequestForm
        request={request}
        accounts={accounts}
        onSave={this.handleSave}
        onCancel={() => {
          console.log("cancel");
          this.props.history.push("/requestlist");
        }}
      />
    );
  }
}

const queryRequest = gql`
  query getRequest($id: ID!) {
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
const updateRequest = gql`
  mutation updateRequest($input: InputRequestType) {
    updateRequest(input: $input) {
      id
    }
  }
`;

export default compose(
  graphql(queryRequest, {
    name: "request",
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  }),
  graphql(updateRequest, { name: "updateRequest" })
)(withRouter(RequestEdit));
