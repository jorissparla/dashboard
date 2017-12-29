import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import _ from "lodash";
import CustomerList from "../CustomerList";
import SearchBar from "../../common/SearchBar";
import DetailswithNotes from "../CustomerDetailsWithNotes";
import AddNote from "../AddNote";

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
      notes {
        id
        date
        note
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

const Widget = styled.div`
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
    <AccountPicture image={image} onClick={() => alert("clicked")} />
    <AccountTitle>{fullname}</AccountTitle>
  </AccountBox>
);

const Container = styled.div`
  display: flex;
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 10px;
  background: white;
  border-radius: 2px;
  width: 100%;
  border: 1px solid lightgray;
`;
class MainPage extends React.Component {
  state = { searchText: "", id: "0" };
  handleSelect = id => {
    console.log("handleSelect,", id);
    this.setState({ id: id });
  };
  handlesetSearchText = val => {
    this.setState({ searchText: val });
  };
  handleAdd = (v) => {
    console.log('ADD',v)
  }
  getCustomerDetails = id => {
    return this.props.data.customers.filter(customer => customer.id === id)[0];
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
    return (
      <div>
        <Widget>
          {accounts.map(({ image, fullname }) => (
            <AccountComponent image={image} fullname={fullname.split(" ")[0]} />
          ))}
        </Widget>
        <Container>
          <CustomerBoxWithSearchField>
            <SearchBar
              onChange={this.handlesetSearchText}
              shade={false}
              hintText="Search on customer name or contact"
            />
            <CustomerList customers={filteredCustomers} onSelect={this.handleSelect} />
          </CustomerBoxWithSearchField>
          <StyledDetails>
            <AddNote 
              enabled={this.state.id !== "0"} 
              details = {this.getCustomerDetails(this.state.id)}
              onAdd = { this.handleAdd}
            />
            <DetailswithNotes id={this.state.id} details={this.getCustomerDetails(this.state.id)} />
          </StyledDetails>
        </Container>
      </div>
    );
  }
}

export default graphql(followersQuery)(MainPage);
