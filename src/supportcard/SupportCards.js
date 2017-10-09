import React from "react";
import { gql, graphql } from "react-apollo";
import { SmallCard } from "../common/SmallCard";
import Dialog from "material-ui/Dialog";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import NewRequestForm from "./Request";

import SearchBar from "../common/SearchBar";
import withAuth from "../utils/withAuth";
import AddCard from "./AddCard";
import CategoryTabs from "./CategoryTabs";

String.prototype.includes2 = function(search, start) {
  if (typeof start !== "number") {
    start = 0;
  }

  if (start + search.length > this.length) {
    return false;
  } else {
    return this.indexOf(search, start) !== -1;
  }
};

const customContentStyle = {
  height: "100%"
};

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
      link
      created
      updatedAt
      category {
        name
        color
        backgroundcolor
      }
    }
  }
`;

class SupportCards extends React.Component {
  state = { searchText: "", selectedCategory: "", showRequest: false };

  setSearchText = value => this.setState({ searchText: value });
  setSelectedCategory = value => this.setState({ selectedCategory: value });

  handleClose = () => this.setState({ showRequest: false });

  render() {
    const { authenticated, data: { loading, error, supportcards } } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Submit" primary={true} onClick={this.handleClose} />
    ];
    const { searchText, selectedCategory } = this.state;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const filteredCards = supportcards
      .filter(card => {
        const { category: { name }, title } = card;
        return (
          name.toUpperCase().includes2(searchText.toUpperCase()) ||
          title.toUpperCase().includes2(searchText.toUpperCase())
        );
      })
      .filter(card => {
        const { category: { name } } = card;
        return name.toUpperCase().includes2(selectedCategory.toUpperCase());
      });
    return (
      <Container onDoubleClick={() => this.setState({ showRequest: true })}>
        <Dialog
          title="Add Request"
          actions={actions}
          modal={true}
          open={this.state.showRequest}
          contentStyle={customContentStyle}
          onRequestClose={() => this.setState({ showRequest: false })}
          autoScrollBodyContent={false}
        >
          <NewRequestForm
            user={this.props.user}
            onSubmit={() => this.setState({ showRequest: false })}
          />
        </Dialog>
        <CategoryTabs onChange={this.setSelectedCategory} onSave={v => console.log(v)} />
        <SearchBar onChange={this.setSearchText} />

        <Div>
          {authenticated && (
            <AddCard link="/supportcard/add" title="Add a New Card" background="papayawhip" />
          )}
          {filteredCards.map(
            ({ id, title, description, category: { name, color, backgroundcolor }, link }, i) => {
              const vieweditLink = authenticated
                ? `/supportcard/edit/${id}`
                : `/supportcard/view/${id}`;
              return (
                <SmallCard
                  color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                  textcolor={color || cardColors[i % (cardColors.length - 1)].front}
                  key={id}
                  title={title}
                  text={description}
                  category={name}
                  buttonText="🔎"
                  link={link}
                  canEdit={authenticated}
                  editLink={`${vieweditLink}`}
                />
              );
            }
          )}
        </Div>
      </Container>
    );
  }
}

export default graphql(SupportCardQuery)(withAuth(SupportCards));
