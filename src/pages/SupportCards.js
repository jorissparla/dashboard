import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose, Query, Mutation } from 'react-apollo';
import { SmallCard } from '../common/SmallCard';
//import { SmallCard } from "./SupportCard";
import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import NewRequestForm from '../supportcard/Request';
import { addDays } from 'date-fns';
import { format } from '../utils/format';
import _ from 'lodash';
import SearchBar from '../common/SearchBar';
import withAuth from '../utils/withAuth';
import AddCard from '../supportcard/AddCard';
import CategoryTabs from '../supportcard/CategoryTabs';
import { adopt } from 'react-adopt';
import User from '../User';
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

String.prototype.includes2 = function(search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > this.length) {
    return false;
  } else {
    return this.indexOf(search, start) !== -1;
  }
};

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
  return (
    <Composed>
      {({ supportcards, createAudit, favoriteCard, unfavoriteCard, user }) => {
        const { data, loading } = supportcards;
        if (loading) return 'Loading';
        const currentUser = user.data.me;
        console.log('Currentuser', user);
        return (
          <StyledSupportCards
            supportcards={data.supportcards}
            createAudit={createAudit}
            favoriteCard={favoriteCard}
            unfavoriteCard={unfavoriteCard}
            currentUser={currentUser}
            {...props}
          />
        );
      }}
    </Composed>
  );
}

class SupportCards extends React.Component {
  state = { searchText: '', selectedCategory: '', showRequest: false, showFavorites: false };

  setSearchText = value => this.setState({ searchText: value });
  setSelectedCategory = value => this.setState({ selectedCategory: value });

  handleClose = () => this.setState({ showRequest: false });

  createAudit = (e, type = 'SupporCard', link) => {
    const splitAr = e.split('/');
    const page = splitAr.slice(0, 3).join('/');
    const linkid = splitAr.slice(3, 4)[0];
    const input = { page, linkid, username: this.props.user.fullname, type };
    this.props.createAudit({ variables: { input } }).then(res => console.log('RES::', res));
  };

  render() {
    const {
      authenticated,
      isEditor,
      supportcards,
      currentUser,
      favoriteCard,
      unfavoriteCard,
      classes
    } = this.props;
    console.log('Auth', this.props);
    const actions = [
      <Button variant="contained" color="secondary" onClick={this.handleClose}>
        Cancel
      </Button>,
      <Button variant="contained" color="primary" onClick={this.handleClose}>
        Submit
      </Button>
    ];
    const { searchText, selectedCategory } = this.state;

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
      .filter(card => {
        const {
          category: { name }
        } = card;
        return _.includes(name.toUpperCase(), selectedCategory.toUpperCase());
      });
    if (this.state.showFavorites) {
      filteredCards = filteredCards.filter(card => card.isfavorite === true);
    }

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
        <Div>
          <CategoryTabs onChange={this.setSelectedCategory} onSave={v => console.log(v)} />
          <Button
            color="primary"
            className={classes.button}
            variant="contained"
            onClick={() => this.setState({ showFavorites: !this.state.showFavorites })}
          >
            Show {this.state.showFavorites ? `All` : `Favorites`}
          </Button>
        </Div>
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
                isfavorite,
                category: { name, color, backgroundcolor },
                link
              },
              i
            ) => {
              const vieweditLink =
                authenticated && isEditor ? `/supportcard/edit/${id}` : `/supportcard/view/${id}`;
              const viewLink = `/supportcard/view/${id}`;

              const isNew = false;
              //    format(updatedAt, 'YYYYMMDD') > format(addDays(new Date(), -7), 'YYYYMMDD');
              // console.log(
              //   isNew,
              //   format(updatedAt, 'YYYYMMDD'),
              //   format(addDays(new Date(), -7), 'YYYYMMDD')
              // );
              const supportcard_id = id;
              const account_id = currentUser ? currentUser.id : null;
              return (
                <SmallCard
                  color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                  textcolor={color || cardColors[i % (cardColors.length - 1)].front}
                  key={id}
                  authenticated={authenticated}
                  account_id={account_id}
                  isFavorite={isfavorite}
                  onToggleFavorite={() => {
                    isfavorite
                      ? unfavoriteCard({ variables: { input: { supportcard_id, account_id } } })
                      : favoriteCard({ variables: { input: { supportcard_id, account_id } } });
                  }}
                  title={title}
                  isNew={isNew}
                  text={description}
                  category={name}
                  buttonText="📂"
                  link={link}
                  canEdit={authenticated && isEditor}
                  editLink={`${vieweditLink}`}
                  viewLink={viewLink}
                  onAudit={v => this.createAudit(v, 'SupportCard', null)}
                  onFollowLink={(v, link) => {
                    this.createAudit(v, 'SupportCardLink', link);
                    return link;
                  }}
                />
              );
            }
          )}
        </Div>
      </Container>
    );
  }
}

const StyledSupportCards = withAuth(withStyles(styles)(SupportCards));
