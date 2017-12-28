import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import CustomerList from "../CustomerList";
import SearchBar from "../../common/SearchBar";
import _ from "lodash";

const CustomerBoxWithSearchField = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 90%;
  background: white;
  border-radius: 2px;
  border: 1px solid lightgray;
  margin: 10px;
`;

const followersQuery = gql`
  query followers {
    accounts(roles: ["CSM", "Admin", "PO"], teams: ["CSM", "LNMT"]) {
      fullname
      image
    }
    customers {
      name
      id
      number
      followed {
        fullname
        image
      }
    }
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-items: center;
  transition: 0.5s ease;
  :hover {
    width: 80px;
    height: 80px;
  }
`;

const AccountPicture = ({ image }) => <Img src={image} />;

const AccountList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
  padding: 15px;
  background: white;
  border-radius: 2px;
  border: 1px solid lightgray;
`;

const AccountBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  display: flex;
  width: 5%;
  align-items: center;
  margin-right: 10px;
`;
const AccountTitle = styled.div`
  font-size: 14px;
  display: flex;
  padding: 2px;
`;

const AccountComponent = ({ image, fullname }) => (
  <AccountBox>
    <AccountPicture image={image} />
    <AccountTitle>{fullname}</AccountTitle>
  </AccountBox>
);

class MainPage extends React.Component {
  state = { searchText: "" };
  handleClick = name => {};
  handlesetSearchText = val => {
    this.setState({ searchText: val });
  };
  render() {
    const { data: { loading, accounts, customers } } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }
    const filteredCustomers = customers.filter(
      customer =>
        _.includes(customer.name, this.state.searchText) ||
        _.includes(customer.followed.fullname, this.state.searchText)
    );
    //console.log(accounts);
    return (
      <div>
        <AccountList>
          {accounts.map(({ image, fullname }) => (
            <AccountComponent image={image} fullname={fullname.split(" ")[0]} />
          ))}
        </AccountList>
        <CustomerBoxWithSearchField>
          <SearchBar
            onChange={this.handlesetSearchText}
            shade={false}
            hintText="Search on customer name or contact"
          />
          <CustomerList customers={filteredCustomers} />
        </CustomerBoxWithSearchField>
      </div>
    );
  }
}

export default graphql(followersQuery)(MainPage);
