import { useMutation, useQuery } from "@apollo/client";
import FavoriteIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/StarBorder";
import { useUserContext } from "globalState/UserProvider";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";

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

// export default FavoriteWrapper;
export default NewFavorite;
