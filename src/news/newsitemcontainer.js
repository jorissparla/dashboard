import { useMutation, useQuery, gql } from "@apollo/client";
import { useAlert } from "globalState/AlertContext";
import React from "react";
import { useHistory, useParams } from "react-router";
import Spinner from "utils/spinner";
import NewsItem from "./newsitem";

const SPECIFIC_NEWS_ITEM = gql`
  query news($id: ID) {
    news(id: $id) {
      id
      title
      body
      link
      link_text
      img
      create_date
      expire_date
      user_id
    }
  }
`;

const UPDATE_NEWS = gql`
  mutation updateNews($input: NewsInputType) {
    updateNews(input: $input) {
      title
      body
    }
  }
`;

const DELETE_NEWS = gql`
  mutation deleteNews($input: NewsInputType) {
    deleteNews(input: $input) {
      error
    }
  }
`;

const NewsItemContainer = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const { data, loading } = useQuery(SPECIFIC_NEWS_ITEM, { variables: { id } });
  const [updateNews] = useMutation(UPDATE_NEWS);
  const [deleteNews] = useMutation(DELETE_NEWS);
  const alert = useAlert();
  if (loading) {
    return <Spinner />;
  }
  if (data.news.length === 0) {
    alert.setMessage("item not found");
    history.push("/news");
    return <div>No item found</div>;
  }
  const news = data?.news[0];
  return (
    <div>
      <NewsItem
        initialValues={news}
        onSave={async (values) => {
          console.log("onSave", values);
          const { id, title, body, link, link_text, img } = values;
          const input = { id, title, body, link, link_text, img };
          await updateNews({ variables: { input } });
          alert.setMessage("Item updated");
          setTimeout(() => props.history.push("/news"), 1500);
        }}
        onDelete={async (id) => {
          const input = { id };
          await deleteNews({ variables: { input } });
          alert.setMessage("Item updated");
          setTimeout(() => props.history.push("/news"), 1500);
        }}
        title="Edit news item"
      />
    </div>
  );
};

export default NewsItemContainer;
//);
