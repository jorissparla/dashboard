import React from "react";
import { gql, graphql, compose } from "react-apollo";
import { SmallCard } from "../common/SmallCard";
import Dialog from "material-ui/Dialog";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import NewRequestForm from "./Request";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import moment from "moment";
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

class SupportCards extends React.Component {
  state = { searchText: "", selectedCategory: "", showRequest: false };

  setSearchText = value => this.setState({ searchText: value });
  setSelectedCategory = value => this.setState({ selectedCategory: value });

  handleClose = () => this.setState({ showRequest: false });

  createAudit = e => {
    const splitAr = e.split("/");
    const page = splitAr.slice(0, 3).join("/");
    const linkid = splitAr.slice(3, 4)[0];
    const input = { page, linkid, username: this.props.user.fullname };
    this.props.createAudit({ variables: { input } }).then(res => console.log("RES::", res));
  };

  render() {
    const { authenticated, isEditor, user, data: { loading, error, supportcards } } = this.props;
    //  console.log("me", this.props.me);
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
          {authenticated && isEditor ? (
            <AddCard link="/supportcard/add" title="Add a New Card" background="papayawhip" />
          ) : (
            <AddCard
              link="supportcard/request"
              title="Request a new Support Card"
              background="papayawhip"
            />
          )}
          {filteredCards.map(
            (
              {
                id,
                title,
                description,
                updatedAt,
                category: { name, color, backgroundcolor },
                link
              },
              i
            ) => {
              const vieweditLink =
                authenticated && isEditor ? `/supportcard/edit/${id}` : `/supportcard/view/${id}`;
              // const isNew = differenceInCalendarDays(Date.parse(updatedAt), Date.now()) < 7;
              const isNew = Date.parse(updatedAt) > moment().add(-7, "days");
              return (
                <SmallCard
                  color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                  textcolor={color || cardColors[i % (cardColors.length - 1)].front}
                  key={id}
                  title={title}
                  isNew={isNew}
                  text={description}
                  category={name}
                  buttonText="📂"
                  link={link}
                  canEdit={authenticated && isEditor}
                  editLink={`${vieweditLink}`}
                  onAudit={v => this.createAudit(v)}
                />
              );
            }
          )}
        </Div>
      </Container>
    );
  }
}

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

const createAudit = gql`
  mutation createAudit($input: InputAuditType) {
    createAudit(input: $input) {
      id
    }
  }
`;

export default compose(graphql(SupportCardQuery), graphql(createAudit, { name: "createAudit" }))(
  withAuth(SupportCards)
);
