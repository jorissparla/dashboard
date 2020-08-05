import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/StarBorder";
import React, { useEffect, useState } from "react";
import { adopt } from "react-adopt";
import User, { useUser } from "./User";
import gql from "graphql-tag";
import { useQuery, useMutation, Mutation, Query } from "@apollo/client";
import { useUserContext } from "globalState/UserProvider";

const styles = (theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    color: "#EEC015",
  },
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
  query QUERY_SUPPORTCARD($id: String) {
    supportcard(id: $id) {
      id
      isfavorite
    }
  }
`;

const Composed = adopt({
  favorite: ({ render }) => <Mutation mutation={MUTATION_FAVORITE}>{render}</Mutation>,
  unfavorite: ({ render }) => <Mutation mutation={MUTATION_UNFAVORITE}>{render}</Mutation>,
  user: ({ render }) => <User>{render}</User>,
  supportcard: ({ render }) => <Query query={QUERY_SUPPORTCARD}>{render}</Query>,
});

// class FavoriteWrapper extends React.Component {
//   render() {
//     const { id = "F0D7A3B6-4D23-4960-9502-96C48099BE7A", isFavorite } = this.props;
//     <Composed>
//       {({ favorite, unfavorite, user: { data, loading }, supportcard }) => {
//         if (loading) {
//           return "loading";
//         }
//         if (!data || !data.me) {
//           return <div />;
//         }
//         const {
//           me: { id },
//         } = data;
//         console.log();
//         return <StyledFavorite toggleFavorite={() => console.log("toggle")} />;
//       }}
//     </Composed>;
//   }
// }

function Favorite(props) {
  const { classes, favorite = false, toggleFavorite } = props;
  return (
    <Grid container className={classes.root}>
      <Grid onClick={() => toggleFavorite()}>{favorite ? <FavoriteIcon className={classes.icon} /> : <FavoriteBorderIcon />}</Grid>
      <Grid item xs={4} />
    </Grid>
  );
}

const NewFavorite = ({ id, isFavorite }) => {
  const { user } = useUserContext();
  console.log(id, user);
  const [isFavorited, setIsFavorite] = useState(isFavorite);
  const [favorite] = useMutation(MUTATION_FAVORITE);
  const [unfavorite] = useMutation(MUTATION_UNFAVORITE);
  const account_id = user.id;
  const supportcard_id = id;
  const input = { account_id, supportcard_id };
  const { loading, data } = useQuery(QUERY_SUPPORTCARD, { variables: { id } });

  console.log(account_id, supportcard_id);
  function handleToggleFavorite() {
    const newValue = !isFavorited;
    if (newValue) {
      favorite({ variables: { input } });
    } else {
      unfavorite({ variables: { input } });
    }
    setIsFavorite(newValue);
  }

  useEffect(() => {
    console.log(data);
    if (data && data.supportcard) {
      const newFav = data.supportcard.isfavorite;
      console.log("newFav", newFav);
      setIsFavorite(newFav);
    }
  }, [data]);
  if (loading) return <div />;
  // console.log(data);
  return (
    <div type="button" onClick={handleToggleFavorite} className="mx-2 text-3xl">
      {isFavorited ? (
        <FavoriteIcon className="mx-2 text-xl font-bold text-yellow-400" title="Mark Favorite" />
      ) : (
        <FavoriteBorderIcon className="mx-2" />
      )}
    </div>
  );
};

const StyledFavorite = withStyles(styles)(Favorite);
// export default FavoriteWrapper;
export default NewFavorite;
