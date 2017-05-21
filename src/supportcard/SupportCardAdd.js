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
  width: "15%",
  margin: "15px",
  padding: "10px",
  backgroundColor: "lightblue"
};

const SupportCardAdd = ({
  data: { loading, error, categories },
  addSupportCard,
  authenticated,
  user
}) => {
  const handleAdd = e => {
    console.log("handleAdd", JSON.stringify(e, null, -2));
    const { id, title, description, category, link } = e;
    const createdby = user.email || "system";
    addSupportCard({ id, title, description, category, link, createdby })
      .then(() => (window.location.href = "/supportcard"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <SupportCardForm
        onSave={handleAdd}
        readOnly={false}
        authenticated={authenticated}
        categories={categories}
        initialValues={{ category: "IXS" }}
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
        createdby
      }
    }
  }
`;
const CategoryQuery = gql`
  query CategoryQuery {
    categories {
      id
      name
    }
  }
`;

export default graphql(CategoryQuery)(
  graphql(addSupportCard, {
    props: ({ mutate }) => ({
      addSupportCard: input =>
        mutate({
          variables: { input }
        })
    })
  })(withAuth(SupportCardAdd))
);
