import { gql, graphql } from "react-apollo";
import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import { CardSection } from "../common";
import SupportCardForm from "./SupportCardForm";
import withAuth from "../utils/withAuth";

const paperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "22%",
  margin: "15px",
  padding: "10px",
  minWidth: "200px",
  backgroundColor: "lightblue"
};

const SupportCardAdd = ({ addSupportCard, authenticated }) => {
  const handleAdd = e => {
    console.log("handleAdd", JSON.stringify(e, null, -2));
    const { id, title, description, category, link } = e;

    addSupportCard({ id, title, description, category, link })
      .then(() => (window.location.href = "/test"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };
  return (
    <div>
      <SupportCardForm
        onSave={handleAdd}
        readOnly={false}
        authenticated={authenticated}
      />
    </div>
  );
};

const addSupportCard = gql`
  mutation addSupportCard($input:InputCardType) {
    addSupportCard(input: $input) {
      supportcard {
        id
        title
        description
        category
        link
      }
    }
  }
`;

export default graphql(addSupportCard, {
  props: ({ mutate }) => ({
    addSupportCard: input =>
      mutate({
        variables: { input }
      })
  })
})(withAuth(SupportCardAdd));
