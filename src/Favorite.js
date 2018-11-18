import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core/styles";

import Component from "./common/component-component";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    color: "#EEC015"
  }
});

function Favorite(props) {
  const { classes, favorite = false } = props;
  return (
    <Component initialValue={{ favorite: props.favorite }}>
      {({ state, setState }) => {
        const { favorite } = state;
        return (
          <Grid container className={classes.root}>
            <Grid onClick={() => setState({ favorite: !favorite })}>
              {favorite ? <FavoriteIcon className={classes.icon} /> : <FavoriteBorderIcon />}
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {!favorite ? "Not " : ""}
                Favorite
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    </Component>
  );
}

export default withStyles(styles)(Favorite);
