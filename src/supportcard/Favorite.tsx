import React, { FunctionComponent } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

type ToggleFavoriteProps = {
  isFavorite?: boolean;
  toggle: Function;
};

export const ToggleFavorite: FunctionComponent<ToggleFavoriteProps> = (
  props: ToggleFavoriteProps
) => {
  const { isFavorite = false, toggle } = props;

  return (
    <div onClick={() => toggle()}>
      {isFavorite ? <StarIcon style={{ color: 'orange' }} /> : <StarBorderIcon />}
    </div>
  );
};
