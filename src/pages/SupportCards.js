import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
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
import _ from 'lodash';
import SearchBar from '../common/SearchBar';
import withAuth from '../utils/withAuth';
import AddCard from '../supportcard/AddCard';
import CategoryTabs from '../supportcard/CategoryTabs';

const styles = {
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
  }
};

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

// function SupporCard(props) {
//   const {
//     color,
//     classes,
//     title,
//     isNew,
//     text,
//     category,
//     buttonText,
//     link,
//     canEdit,
//     editLink,
//     viewLink
//   } = props;
//   return (
//     <Card className={classes.card} style={{ backgroundColor: color }}>
//       <CardActionArea>
//         <CardMedia className={classes.media}>
//           <Typography gutterBottom variant="h6" component="h3">
//             A {title}
//           </Typography>
//         </CardMedia>
//         <CardContent>
//           <Typography component="p" className={classes.smallText}>
//             {text.slice(0, 200)}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary" variant="contained">
//           View
//         </Button>
//         {category}
//         <Button size="small" color="primary">
//           {category}
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

class SupportCards extends React.Component {
  state = { searchText: '', selectedCategory: '', showRequest: false };

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
      data: { loading, error, supportcards }
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
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const filteredCards = supportcards
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
          {/* {filteredCards.map((card, index) => (
            <ACard key={index} {...card} />
          ))} */}
          ;
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
              const viewLink = `/supportcard/view/${id}`;

              const isNew = Date.parse(updatedAt) > addDays(new Date(), -7);
              /*  return (
                <SupporCard
                  color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                  classes={classes}
                  key={id}
                  authenticated={authenticated}
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
              ); */
              return (
                <SmallCard
                  color={backgroundcolor || cardColors[i % (cardColors.length - 1)].back}
                  textcolor={color || cardColors[i % (cardColors.length - 1)].front}
                  key={id}
                  authenticated={authenticated}
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

export default compose(
  graphql(SupportCardQuery),
  graphql(createAudit, { name: 'createAudit' })
)(withAuth(withStyles(styles)(SupportCards)));
