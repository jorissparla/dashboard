// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { usePersistentState } from 'hooks';
import _ from 'lodash';
import React, { useState } from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
//import { SmallCard } from "./SupportCard";
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import SearchBar from '../common/SearchBar';
import { SmallCard } from '../common/SmallCard';
import Modal from '../ModalWrapper';
import AddCard from '../supportcard/AddCard';
import CategoryTabs from '../supportcard/CategoryTabs';
// import Typography from '@material-ui/core/Typography';
import NewRequestForm from '../supportcard/Request';
import User from '../User';
import Spinner from '../utils/spinner';
import withAuth from '../utils/withAuth';

const cardColors = [
  { back: '#7fbadb', front: '#000' },
  { back: '#FFCC80', front: '#000' },
  { back: 'papayawhip', front: '#000' },
  { back: '#B9F6CA', front: '#000' },
  { back: '#EDE7F6', front: '#000' },
  { back: '#80D8FF', front: '#000' },
  { back: '#b39ddb', front: '#000' },
  { back: '#FFCCBC', front: '#000' },
  { back: 'palevioletred', front: '#000' },
  { back: '#E1F5FE', front: '#000' },
  { back: '#607D8B', front: '#000' }
];

const suppCardFragment = gql`
  fragment SupportCardDetails on SupportCard {
    id
    title
    description
    link
    created
    updatedAt
    isfavorite
    accessed
    product
    category {
      name
      color
      backgroundcolor
    }
  }
`;

export const QUERY_ALL_SUPPORTCARDS = gql`
  ${suppCardFragment}
  query QUERY_ALL_SUPPORTCARDS {
    supportcards {
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

const styles = theme => ({
  card: {
    maxWidth: 320,
    padding: 10,
    height: 250,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between'
  },
  media: {
    height: 100
  },
  smallText: {
    fontSize: 12
  },
  button: {
    height: '2rem'
  }
});

// String.prototype.includes2 = function(search, start) {
//   if (typeof start !== 'number') {
//     start = 0;
//   }

//   if (start + search.length > this.length) {
//     return false;
//   } else {
//     return this.indexOf(search, start) !== -1;
//   }
// };

const customContentStyle = {
  height: '100%'
};

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  background: #eeeeee;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-top: 10px;
  background: #eeeeee;
`;

const Composed = adopt({
  supportcards: ({ render }) => <Query query={QUERY_ALL_SUPPORTCARDS}>{render}</Query>,
  createAudit: ({ render }) => <Mutation mutation={MUTATION_CREATE_AUDIT}>{render}</Mutation>,
  favoriteCard: ({ render }) => (
    <Mutation
      mutation={MUTATION_FAVORITE_CARD}
      refetchQueries={[{ query: QUERY_ALL_SUPPORTCARDS }]}
    >
      {render}
    </Mutation>
  ),
  unfavoriteCard: ({ render }) => (
    <Mutation
      mutation={MUTATION_UNFAVORITE_CARD}
      refetchQueries={[{ query: QUERY_ALL_SUPPORTCARDS }]}
    >
      {render}
    </Mutation>
  ),
  user: ({ render }) => <User>{render}</User>
});

export default function SupportCardContainer(props) {
  const { text = '' } = props;
  return (
    <Composed>
      {({ supportcards, createAudit, favoriteCard, unfavoriteCard, user }) => {
        const { data, loading } = supportcards;
        if (loading) return <Spinner />;
        console.log('🎉🎉', user);
        return (
          <StyledSupportCards
            supportcards={data.supportcards}
            createAudit={createAudit}
            favoriteCard={favoriteCard}
            unfavoriteCard={unfavoriteCard}
            currentUser={user}
            {...props}
            filter={text}
          />
        );
      }}
    </Composed>
  );
}

const TestCard = () => {
  return (
    <div className="w-full max-w-md ">
      <div className="rounded-lg  m-4 bg-purple-200 p-4 shadow-lg">
        <div
          className="overflow-hidden truncate font-bold font-mon text-base"
          title="Check for extended maintenance -Lifecycle policy"
        >
          Check for extended maintenance -Lifecycle policy
        </div>
        <span className="mt-2 text-sm tracking-wide text-gray-600">
          Last updated: Fri 07 Feb 2020, 04:06
        </span>
        <div className="mt-4">
          <span className="rounded-lg border bg-teal-300 text-gray-700 uppercase font-bold px-3 py-2 text-lg font-pop w-64">
            REPRODUCTION
          </span>
        </div>
        <div className="border-t-2 border-purple-100 h-1 w-full mt-4"></div>
        <div className="flex justify-between items-center justify-between mt-8">
          <button className=" btn-tw text-gray-700 bg-gray-200 hover:bg-blue-700 text-white font-pop font-semibold py-2 px-4 rounded inline-flex items-center  shadow-lg">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2 2v10h16V6H2z" />
            </svg>
            <span>Open</span>
          </button>
          <button className="text-black px-6 cursor-pointer leading-tight font-pop">View</button>
          <button className="text-black px-6 btn-tw-u bg-teal-300 ">Link</button>
        </div>
      </div>
    </div>
  );
};

const SupportCards = props => {
  const [searchText, setSearchText] = useState(props.filter || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct] = usePersistentState('supp_card_product', 'LN');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [portalText, setPortalText] = useState('### Where can I find release Notes documents');

  const handleClose = () => setShowRequest(false);

  const createAudit = (e, type = 'SupporCard', link) => {
    const splitAr = e.split('/');
    const page = splitAr.slice(0, 3).join('/');
    const linkid = splitAr.slice(3, 4)[0];
    const input = { page, linkid, username: props.user ? props.user.fullname : '', type };
    props.createAudit({ variables: { input } }).then(res => console.log('RES::', res));
  };

  const togglePortal = text => {
    setPortalText(text);
    setShowPortal(true);
  };

  const {
    authenticated,
    isEditor,
    supportcards,
    currentUser,
    favoriteCard,
    unfavoriteCard,
    classes
  } = props;
  console.log('Auth', props);
  const actions = [
    <Button variant="contained" color="secondary" onClick={handleClose}>
      Cancel
    </Button>,
    <Button variant="contained" color="primary" onClick={handleClose}>
      Submit
    </Button>
  ];
  const doFilter = (supportcards, searchText, selectedCategory) => {
    let filteredCards = supportcards
      .filter(card => {
        const {
          category: { name },
          title
        } = card;
        return (
          _.includes(name.toUpperCase(), searchText.toUpperCase()) ||
          _.includes(title.toUpperCase(), searchText.toUpperCase())
        );
      })
      .filter(card => _.includes(card.product.toUpperCase(), selectedProduct.toUpperCase()))
      .filter(card => {
        const {
          category: { name }
        } = card;
        return selectedCategory !== ''
          ? _.includes(selectedCategory.toUpperCase(), name.toUpperCase())
          : true;
      });
    if (showFavorites) {
      filteredCards = filteredCards.filter(card => card.isfavorite === true);
    }
    return filteredCards;
  };
  let filteredCards = doFilter(supportcards, searchText, selectedCategory);

  return (
    <Container onDoubleClick={() => setShowRequest(true)}>
      <Dialog
        title="Add Request"
        actions={actions}
        modal={true}
        open={showRequest}
        contentStyle={customContentStyle}
        onRequestClose={() => setShowRequest(false)}
        autoScrollBodyContent={false}
      >
        <NewRequestForm user={props.user} onSubmit={() => setShowRequest(false)} />
      </Dialog>
      <Div>
        {/* <Div2>
          <CategoryTabsNew
            onChange={value => setSelectedCategory(value)}
            onSave={v => console.log(v)}
          />
          <ProductsTab onChange={prod => setSelectedProduct(prod)} />
        </Div2> */}
        <CategoryTabs onChange={value => setSelectedCategory(value)} onSave={v => console.log(v)} />
        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          Show {showFavorites ? `All` : `Favorites`}
        </Button>
      </Div>
      <SearchBar onChange={value => setSearchText(value)} />

      <Div>
        {authenticated && isEditor ? (
          <AddCard link="/supportcard/add" title="Add a New Card" background="papayawhip" />
        ) : (
          // <TestCard />
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
              isfavorite,
              accessed,
              category: { name, color, backgroundcolor },
              link
            },
            i
          ) => {
            const vieweditLink =
              authenticated && isEditor ? `/supportcard/edit/${id}` : `/supportcard/view/${id}`;
            const viewLink = `/supportcard/view/${id}`;

            const isNew = false;

            const supportcard_id = id;
            const account_id = currentUser ? currentUser.id : null;
            return (
              <SmallCard
                onTitleClick={() => togglePortal(description)}
                color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                textcolor={color || cardColors[i % (cardColors.length - 1)].front}
                key={id}
                authenticated={authenticated}
                account_id={account_id}
                isFavorite={isfavorite}
                updatedAt={updatedAt}
                accessed={accessed}
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
                onAudit={v => createAudit(v, 'SupportCard', null)}
                onFollowLink={(v, link) => {
                  createAudit(v, 'SupportCardLink', link);
                  return link;
                }}
              />
            );
          }
        )}
      </Div>
      <Modal on={showPortal} toggle={() => setShowPortal(!showPortal)}>
        <ReactMarkdown source={portalText} escapeHtml={false}></ReactMarkdown>
      </Modal>
    </Container>
  );
};

const StyledSupportCards = withAuth(withStyles(styles)(SupportCards));
