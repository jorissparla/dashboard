import React from "react";
import { gql, graphql } from "react-apollo";
import { SmallCard } from "../common/SmallCard";
import Dialog from "material-ui/Dialog";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { compose, withState, withHandlers } from "recompose";
import SearchBar from "../common/SearchBar";
import withAuth from "../utils/withAuth";
import AddCard from "../courses/AddCard";
import CategoryTabs from "./CategoryTabs";

const cardColors = [
  { back: "#FFCCBC", front: "#000" },
  { back: "#7fbadb", front: "#000" },
  { back: "papayawhip", front: "#000" },
  { back: "palevioletred", front: "#000" },
  { back: "#B9F6CA", front: "#000" },
  { back: "#EDE7F6", front: "#000" },
  { back: "#80D8FF", front: "#000" },
  { back: "#FFEB3B", front: "#000" },
  { back: "#FFCC80", front: "#000" },
  { back: "#E1F5FE", front: "#000" },
  { back: "#607D8B", front: "#000" }
];

const enhanceSearchBar = withState("searchText", "setSearchText", "");

const enhanceCategories = withState(
  "selectedCategory",
  "setSelectedCategory",
  ""
);

const enhance = compose(enhanceSearchBar, enhanceCategories);

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
      created
    } 
  }
`;

const SupportCards = enhance(
  ({
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    authenticated,
    user,
    data: { loading, error, supportcards },
    filter = ""
  }) => {
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const filteredCards = supportcards
      .filter(
        card =>
          card.category.toUpperCase().includes(searchText.toUpperCase()) ||
          card.title.toUpperCase().includes(searchText.toUpperCase())
      )
      .filter(card =>
        card.category.toUpperCase().includes(selectedCategory.toUpperCase())
      );
    console.log("filter", filteredCards);
    return (
      <Container>
        <CategoryTabs
          onChange={setSelectedCategory}
          onSave={v => console.log(v)}
        />
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
                color={cardColors[i % (cardColors.length - 1)].back}
                textcolor={cardColors[i % (cardColors.length - 1)].front}
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
