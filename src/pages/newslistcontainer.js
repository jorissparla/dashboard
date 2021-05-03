import { Fab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import Spinner from "utils/spinner";
import NewsList from "../news/newslist";
import withAuth from "../utils/withAuth";
import TWButton from "elements/TWButton";

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
  const onOpen = (id) => {
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
      <div className="">
        <header class="flex items-center justify-between">
          <h2 class=" pl-4 leading-6 font-medium text-2xl text-gray-700 font-pop">News</h2>
          <TWButton onClick={onNew}>New</TWButton>
        </header>
        {/* <Typography variant="h3" gutterBottom>
          News
        </Typography>
        <Fab color="secondary" aria-label="add" className={classes.button} onClick={onNew}>
          <AddIcon />
        </Fab> */}
        <NewsList news={news} onEdit={onOpen} authenticated={authenticated} />
      </div>
    </React.Fragment>
  );
}

export default withAuth(NewsListContainer);
