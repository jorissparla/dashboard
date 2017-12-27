import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";

const followersQuery = gql`
  query followers {
    accounts(roles: ["CSM", "Admin", "PO"], teams: ["CSM", "LNMT"]) {
      fullname
      image
    }
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const AccountPicture = ({ image }) => <Img src={image} />;

const AccountBox = styled.div`
  display: flex;
  box-shadow: 1px 1px 1px 1px;
  background: white;
`;

const AccountComponent = ({ image, fullname }) => (
  <AccountBox>
    <AccountPicture image={image} />
    <h2>{fullname}</h2>
  </AccountBox>
);

const MainPage = ({ data: { loading, accounts } }) => {
  console.log(loading, accounts);
  if (loading) {
    return <div>Loading</div>;
  }
  //console.log(accounts);
  return (
    <div>
      <h1>Main Customer Comments Page</h1>
      {accounts.map(({ image, fullname }) => (
        <AccountComponent image={image} fullname={fullname} />
      ))}
    </div>
  );
};

export default graphql(followersQuery)(MainPage);
