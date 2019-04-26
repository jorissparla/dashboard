import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";
import { adopt } from "react-adopt";
import User from "./User";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    color: "#EEC015"
  }
});

const MUTATION_FAVORITE = gql`
  mutation MUTATION_FAVORITE($input: inputWhereSupportCardFavorite) {
    favoriteSupportCard(input: $input) {
      id
      title
    }
  }
`;
const MUTATION_UNFAVORITE = gql`
  mutation MUTATION_UNFAVORITE($input: inputWhereSupportCardFavorite) {
    favoriteSupportCard(input: $input) {
      id
      title
    }
  }
`;

const QUERY_SUPPORTCARD = gql`
  query QUERY_SUPPORTCARD($id: ID, $me: ID) {
    supportcard(id: $id) {
      id
      isfavorite(me: $me)
    }
  }
`;

const Composed = adopt({
  favorite: ({ render }) => <Mutation mutation={MUTATION_FAVORITE}>{render}</Mutation>,
  unfavorite: ({ render }) => <Mutation mutation={MUTATION_UNFAVORITE}>{render}</Mutation>,
  user: ({ render }) => <User>{render}</User>,
  supportcard: ({ render }) => <Query query={QUERY_SUPPORTCARD}>{render}</Query>
});

class FavoriteWrapper extends React.Component {
  render() {
    const { id = "F0D7A3B6-4D23-4960-9502-96C48099BE7A", isFavorite } = this.props;
    <Composed>
      {({ favorite, unfavorite, user: { data, loading }, supportcard }) => {
        if (loading) {
          return "loading";
        }
        if (!data || !data.me) {
          return <div />;
        }
        const {
          me: { id }
        } = data;
        console.log();
        return <StyledFavorite toggleFavorite={() => console.log("toggle")} />;
      }}
    </Composed>;
  }
}

function Favorite(props) {
  const { classes, favorite = false, toggleFavorite } = props;
  return (
    <Grid container className={classes.root}>
      <Grid onClick={() => toggleFavorite()}>
        {favorite ? <FavoriteIcon className={classes.icon} /> : <FavoriteBorderIcon />}
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}

const StyledFavorite = withStyles(styles)(Favorite);
export default FavoriteWrapper;
