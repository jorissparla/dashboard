import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import AccountFilter from "./AccountFilter";
import EmployeeList from "./EmployeeList";
export default class AccountList extends Component {
  state = {
    filtervariables: { firstname: "Guest" },
    defaults: {}
  };
  handleApply = v => {
    console.log(v);
    this.setState({ filtervariables: v });
  };

  handleRemove = v => {};
  static AccountFilter;
  render() {
    return (
      <Query query={ACCOUNT_QUERY} variables={this.state.filtervariables}>
        {({ data, loading }) => {
          if (loading) return "loading...";
          const { employees } = data;
          const { filtervariables } = this.state;
          return (
            <div>
              <AccountFilter onApply={this.handleApply} values={this.state.filtervariables} />
              <Mutation mutation={ACCOUNT_REMOVE_MUTATION}>
                {(removeEmployee, data) => {
                  return (
                    <EmployeeList
                      employees={employees}
                      onRemove={v => {
                        console.log(v);
                        removeEmployee({
                          variables: { id: v },

                          refetchQueries: [{ query: ACCOUNT_QUERY, variables: filtervariables }]
                        })
                          .then(data => console.log("DAata", data))
                          .catch(err => console.error);
                      }}
                    />
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

const ACCOUNT_REMOVE_MUTATION = gql`
  mutation removeEmployee($id: ID!) {
    removeEmployee(input: { id: $id })
  }
`;

const ACCOUNT_QUERY = gql`
  query employees($firstname: String, $region: String, $team: String, $location: String) {
    employees(firstname: $firstname, region: $region, team: $team, location: $location) {
      id
      firstname
      lastname
      fullname
      team
      login
      image
      navid
      location
      locationdetail {
        name
      }
    }
  }
`;
