import { gql, graphql } from "react-apollo";
import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import { CardSection } from "../common";

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

const SupportCardAdd = ({ addSupportCard }) => {
  const handleSubmit = e => {
    e.preventDefault();
    let title = e.target.elements.title.value;
    let description = e.target.elements.description.value;
    let category = e.target.elements.category.value;
    let link = e.target.elements.link.value;

    addSupportCard(title, description, category, link)
      .then(() => window.alert("success"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };
  return (
    <Paper zDepth={1} style={paperStyle}>
      <form onSubmit={handleSubmit}>
        <TextField placeholder="Title" name="title" />
        <TextField placeholder="Description" name="description" />
        <TextField placeholder="Category" name="category" />
        <TextField placeholder="Link" name="link" />
        <CardSection>
          <FlatButton type="submit" primary={true} label="Submit" />
        </CardSection>
      </form>
    </Paper>
  );
};

const addSupportCard = gql`
  mutation addSupportCard($title:String!, $description: String!, $category: String!,$link: String!) {
    addSupportCard(title: $title, 
      description: $description, 
      category: $category, link: $link) {
        id
        title
        description
        category
        link
    }
  }
`;

export default graphql(addSupportCard, {
  props: ({ mutate }) => ({
    addSupportCard: (title, description, category, link) =>
      mutate({
        variables: { title, description, category, link }
      })
  })
})(SupportCardAdd);
