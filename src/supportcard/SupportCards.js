import React from "react";
import { gql, graphql } from "react-apollo";
import { SmallCard } from "../common/SmallCard";
import Dialog from "material-ui/Dialog";
import { Link } from "react-router";
import styled from "styled-components";
import { compose, withState, withHandlers } from "recompose";
import SearchBar from "../common/SearchBar";
import withAuth from "../utils/withAuth";
import AddCard from "../courses/AddCard";

const cardColors = [
  "#7fbadb",
  "papayawhip",
  "palevioletred",
  "#8E24AA",
  "#607D8B"
];

const enhance = withState("searchText", "setSearchText", "");

const Div = styled.div`
  display: flex;
    justify-content: flex-start;
  flex-wrap: wrap;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-top: 10px;

`;

const SupportCardQuery = gql`
  query SupportCardQuery {
      supportcards {
      id
      title
      description
      category
      link
    } 
  }
`;

const SupportCards = enhance(
  ({
    searchText,
    setSearchText,
    authenticated,
    data: { loading, error, supportcards },
    filter = ""
  }) => {
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const filteredCards = supportcards.filter(
      card =>
        card.category.toUpperCase().includes(searchText.toUpperCase()) ||
        card.title.toUpperCase().includes(searchText.toUpperCase())
    );
    console.log("filter", filteredCards);
    return (
      <Container>

        <SearchBar onChange={setSearchText} />
        <Div>
          {authenticated &&
            <AddCard
              link="/supportcard/add"
              title="Add a New Card"
              background="papayawhip"
            />}
          {filteredCards.map(
            ({ id, title, description, category, link }, i) => (
              <SmallCard
                color={cardColors[i % (cardColors.length - 1)]}
                key={id}
                title={title}
                text={description}
                category={category}
                buttonText="Open"
                link={link}
                canEdit={authenticated}
                editLink={`/supportcard/edit/${id}`}
              />
            )
          )}
        </Div>
      </Container>
    );
  }
);

export default graphql(SupportCardQuery)(withAuth(SupportCards));
