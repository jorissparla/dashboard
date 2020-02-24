import { Fab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";
import React, { Component } from "react";
import { Query, useQuery } from "react-apollo";
import { withRouter, useHistory } from "react-router";
import NewsList from "../news/newslist";
import withAuth from "../utils/withAuth";
import Spinner from "utils/spinner";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },

  root: theme.mixins.gutters({
    marginTop: theme.spacing(3)
  })
});

export const QUERY_ALL_NEWS_EDIT_PAGE = gql`
  query QUERY_ALL_NEWS_EDIT_PAGE {
    news {
      title
      body
      img
      expire_date
      id
    }
  }
`;

function NewsListContainer({ authenticated, classes }) {
  const history = useHistory();
  const onOpen = id => {
    history.replace(`/news/edit/${id}`);
  };

  const onNew = () => {
    history.push(`/news/add`);
  };
  const { data, loading } = useQuery(QUERY_ALL_NEWS_EDIT_PAGE);
  if (loading) return <Spinner />;
  const { news } = data;
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h3" gutterBottom>
          News
        </Typography>
        <Fab color="secondary" aria-label="add" className={classes.button} onClick={onNew}>
          <AddIcon />
        </Fab>
        <NewsList news={news} onEdit={onOpen} authenticated={authenticated} />
      </Paper>
    </React.Fragment>
  );
}

export default withAuth(withStyles(styles)(NewsListContainer));
