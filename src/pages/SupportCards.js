import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CategoryTabs from "../supportcard/CategoryTabs";
import Dialog from "@material-ui/core/Dialog";
import Modal from "../ModalWrapper";
import NewRequestForm from "../supportcard/Request";
import { QUERY_ALL_SUPPORTCARDS } from "supportcard/queries/AllCards";
import SearchBar from "../common/SearchBar";
import { SmallCard } from "../common/SmallCard";
import Spinner from "../utils/spinner";
import TWButton from "../elements/TWButton";
import _ from "lodash";
import gql from "graphql-tag";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { usePersistentState } from "hooks";
import useSWR from "swr";
import { useUserContext } from "globalState/UserProvider";

// import ReactMarkdown from "react-markdown/with-html";

//import { SmallCard } from "./SupportCard";

// import Typography from '@material-ui/core/Typography';

const cardColors = [
  { back: "#7fbadb", front: "#000" },
  { back: "#FFCC80", front: "#000" },
  { back: "papayawhip", front: "#000" },
  { back: "#B9F6CA", front: "#000" },
  { back: "#EDE7F6", front: "#000" },
  { back: "#80D8FF", front: "#000" },
  { back: "#b39ddb", front: "#000" },
  { back: "#FFCCBC", front: "#000" },
  { back: "palevioletred", front: "#000" },
  { back: "#E1F5FE", front: "#000" },
  { back: "#607D8B", front: "#000" },
];

const suppCardFragment = gql`
  fragment SupportCardDetails on SupportCard {
    id
    title
    description
    link
    created
    createdby
    updatedAt
    updatedBy
    isfavorite
    accessed
    product
    category {
      name
      color
      backgroundcolor
    }
    keywords
  }
`;

export const MUTATION_UPDATE_CARD_KEYWORDS = gql`
  ${suppCardFragment}
  mutation MUTATION_UPDATE_CARD_KEYWORDS($input: inputSupportCardKeywords) {
    updateSupportCardKeywords(input: $input) {
      ...SupportCardDetails
    }
  }
`;

const MUTATION_CREATE_AUDIT = gql`
  mutation MUTATION_CREATE_AUDIT($input: InputAuditType) {
    createAudit(input: $input) {
      id
    }
  }
`;

const MUTATION_FAVORITE_CARD = gql`
  ${suppCardFragment}
  mutation FAVORITESUPPORTCARD($input: inputWhereSupportCardFavorite) {
    favoriteSupportCard(input: $input) {
      ...SupportCardDetails
    }
  }
`;

const MUTATION_UNFAVORITE_CARD = gql`
  ${suppCardFragment}
  mutation UNFAVORITESUPPORTCARD($input: inputWhereSupportCardFavorite) {
    unfavoriteSupportCard(input: $input) {
      ...SupportCardDetails
    }
  }
`;

const customContentStyle = {
  height: "100%",
};

export default function SupportCardContainer(props) {
  const { text = "" } = props;
  const { user, isAuthenticated } = useUserContext();

  const { data, loading, isValidating } = useSWR(QUERY_ALL_SUPPORTCARDS);

  const [favoriteCard] = useMutation(MUTATION_FAVORITE_CARD);
  const [unfavoriteCard] = useMutation(MUTATION_UNFAVORITE_CARD);

  if (!data) return <Spinner />;
  const authenticated = isAuthenticated;
  let isEditor = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
  let hasperm;
  if (user?.permissions) {
    hasperm = user.permissions.some(({ permission }) => ["SUPPCARDEDIT", "ADMIN"].includes(permission));
  }
  isEditor = isEditor || hasperm;
  return (
    <div>
      {/* {isValidating && <span>fetching...</span>} */}
      <SupportCards
        supportcards={data.supportcards}
        // createAudit={createAudit}
        favoriteCard={favoriteCard}
        unfavoriteCard={unfavoriteCard}
        currentUser={user}
        authenticated={authenticated}
        isEditor={isEditor}
        filter={text}
      />
    </div>
  );
}

const SupportCards = ({ authenticated = false, isEditor = false, supportcards, currentUser, favoriteCard, unfavoriteCard, filter = "" }) => {
  const [createAuditMutation] = useMutation(MUTATION_CREATE_AUDIT);
  const [searchText, setSearchText] = useState(filter || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct] = usePersistentState("supp_card_product", "LN");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [portalText, setPortalText] = useState("### Where can I find release Notes documents");

  const handleClose = () => setShowRequest(false);

  const createAudit = (e, type = "SupporCard", link) => {
    console.log(e);
    const splitAr = e.split("/");
    const page = splitAr.slice(0, 3).join("/");
    const linkid = splitAr.slice(3, 4)[0];
    const input = { page, linkid, username: currentUser ? currentUser.fullname : "", type };
    createAuditMutation({ variables: { input } }).then((res) => console.log("RES::", res));
  };

  const togglePortal = (text) => {
    setPortalText(text);
    setShowPortal(true);
  };

  const p = { authenticated, isEditor, supportcards, currentUser, favoriteCard, unfavoriteCard };
  const actions = [
    <Button variant="contained" color="secondary" onClick={handleClose}>
      Cancel
    </Button>,
    <Button variant="contained" color="primary" onClick={handleClose}>
      Submit
    </Button>,
  ];
  const doFilter = (supportcards, searchText, selectedCategory) => {
    let filteredCards = supportcards
      .filter((card) => {
        const {
          category: { name },
          title,
          keywords,
        } = card;
        // if (keywords)
        //   console.log(
        //     keywords?.toUpperCase(),
        //     _.includes(card.product.toUpperCase(), selectedProduct.toUpperCase()),
        //     selectedCategory === "" ? true : _.includes(selectedCategory.toUpperCase(), card.name.toUpperCase()),
        //     card.category.name,
        //     _.includes(keywords.toUpperCase(), searchText.toUpperCase())
        //   );
        return (
          _.includes(name.toUpperCase(), searchText.toUpperCase()) ||
          _.includes(title.toUpperCase(), searchText.toUpperCase()) ||
          _.includes(keywords.toUpperCase(), searchText.toUpperCase())
        );
      })
      .filter((card) => _.includes(card.product.toUpperCase(), selectedProduct.toUpperCase()))
      .filter((card) => {
        const {
          category: { name },
        } = card;
        return selectedCategory === "" ? true : selectedCategory.toUpperCase() === card.category.name.toUpperCase();
      });
    if (showFavorites) {
      console.log("showFavorites", showFavorites);
      filteredCards = filteredCards.filter((card) => card.isfavorite === true);
    }
    return filteredCards;
  };
  function handleToggleShowFavorites() {
    console.log(`showFavorites`, showFavorites);
    setShowFavorites(!showFavorites);
  }
  let filteredCards = doFilter(supportcards, searchText, selectedCategory);
  const history = useHistory();
  return (
    <div className="flex flex-col  h-full" onDoubleClick={() => setShowRequest(true)}>
      <header className="flex items-center justify-between">
        <h2 className=" pl-4 leading-6 font-bold text-2xl text-gray-700 font-pop">Support Cards</h2>
        <div>
          <TWButton color="teal" onClick={handleToggleShowFavorites}>
            Show {showFavorites ? `All` : `Favorites`}
          </TWButton>
          {authenticated && isEditor ? (
            <TWButton color="amber" onClick={() => history.push("supportcard/add")}>
              Add Card
            </TWButton>
          ) : (
            <TWButton onClick={() => history.push("supportcard/request")}>Request a Card</TWButton>
          )}
        </div>
      </header>
      <Dialog
        title="Add Request"
        actions={actions}
        modal={true}
        open={showRequest}
        contentStyle={customContentStyle}
        onRequestClose={() => setShowRequest(false)}
        autoScrollBodyContent={false}
      >
        <NewRequestForm user={currentUser} onSubmit={() => setShowRequest(false)} />
      </Dialog>
      <div className="flex w-full justify-between pr-6 flex-wrap">
        <CategoryTabs onChange={(value) => setSelectedCategory(value)} onSave={(v) => console.log(v)} />

        {/* <Button color="primary" className={classes.button} variant="contained" onClick={() => setShowFavorites(!showFavorites)}>
          Show {showFavorites ? `All` : `Favorites`}
        </Button> */}
      </div>
      <SearchBar onChange={(value) => setSearchText(value)} hintText="Start typing to match title, category or keywords..." />

      <div className="flex justify-start flex-wrap bg-gray-100 h-screen m-2">
        {/* {authenticated && isEditor ? (
          <AddCard link="/supportcard/add" title="Add a New Card" background="papayawhip" />
        ) : (
          // <TestCard />
          <AddCard link="supportcard/request" title="Request a new Support Card" background="papayawhip" />
        )} */}

        {filteredCards.map(
          ({ id, title, description, updatedAt, isfavorite, accessed, category: { name, color, backgroundcolor }, link, keywords }, i) => {
            const vieweditLink = authenticated && isEditor ? `/supportcard/edit/${id}` : `/supportcard/view/${id}`;
            const viewLink = `/supportcard/view/${id}`;

            const isNew = false;

            const supportcard_id = id;
            const account_id = currentUser ? currentUser.id : null;
            return (
              <SmallCard
                id={id}
                onTitleClick={() => togglePortal(description)}
                color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                textcolor={color || cardColors[i % (cardColors.length - 1)].front}
                key={id}
                authenticated={authenticated}
                account_id={account_id}
                isFavorite={isfavorite}
                updatedAt={updatedAt}
                accessed={accessed}
                keywords={keywords}
                onToggleFavorite={() => {
                  isfavorite
                    ? unfavoriteCard({ variables: { input: { supportcard_id, account_id } } })
                    : favoriteCard({ variables: { input: { supportcard_id, account_id } } });
                }}
                title={title}
                supportcard_id={id}
                isNew={isNew}
                text={description}
                category={name}
                buttonText="📂"
                link={link}
                canEdit={authenticated && isEditor}
                editLink={`${vieweditLink}`}
                viewLink={viewLink}
                onAudit={(v) => createAudit(v, "SupportCard", null)}
                onFollowLink={(v, link) => {
                  createAudit(v, "SupportCardLink", link);
                  return link;
                }}
              />
            );
          }
        )}
      </div>
      {/* <Modal on={showPortal} toggle={() => setShowPortal(!showPortal)}>
        <ReactMarkdown source={portalText} escapeHtml={false}></ReactMarkdown>
      </Modal> */}
    </div>
  );
};
