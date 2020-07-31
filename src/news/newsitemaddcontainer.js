import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router";
import NewsItem from "./newsitem";
import { QUERY_ALL_NEWS_EDIT_PAGE } from "pages/newslistcontainer";

function NewsItemAddContainer() {
  const [createNews] = useMutation(MUTATION_CREATE_NEWS);
  const history = useHistory();

  const doSubmit = async values => {
    await createNews({ variables: { input: values }, refetchQueries: [{ query: QUERY_ALL_NEWS_EDIT_PAGE }] });
    setTimeout(() => history.push("/news"), 500);
  };
  return <NewsItem initialValues={{}} title="News to Share!" onSave={doSubmit} />;
}

const MUTATION_CREATE_NEWS = gql`
  mutation MUTATION_CREATE_NEWS($input: NewsInputType) {
    createNews(input: $input) {
      title
      body
      img
      expire_date
      id
    }
  }
`;

export default NewsItemAddContainer;
