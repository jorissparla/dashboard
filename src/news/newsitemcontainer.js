import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import NewsItem from "./newsitem";
//import { fetchNewsItem, updateNews, deleteNews } from "../actions/index";

const FETCHITEM_QUERY = gql`
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

const UPDATE_ITEM_QUERY = gql`
  mutation updateNews($input: NewsInputType) {
    updateNews(input: $input) {
      title
    }
  }
`;

const DELETE_ITEM_QUERY = gql`
  mutation deleteNews($input: NewsInputType) {
    deleteNews(input: $input) {
      error
    }
  }
`;

class NewsItemContainer extends Component {
  doSubmit = values => {
    //window.alert(JSON.stringify(values, null, 2));
    //console.log(JSON.stringify(values, null, 2));
    const { id, title, body, link, link_text, img } = values;
    const input = { id, title, body, link, link_text, img };
    console.log(input);
    this.props.updateNews({ variables: { input } });
    //updateNews(values);
    setTimeout(() => this.props.history.push("/news"), 500);
  };

  doDelete = id => {
    //deleteNews(id);
    const input = { id };
    this.props.deleteNews({ variables: { input } });
    setTimeout(() => this.props.history.push("/news"), 500);
  };



  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    const news = this.props.data.news[0];
    if (!this.props.news) {
      return <div>Loading...</div>;
    }
    return (
      <NewsItem
        initialValues={news}
        onSave={this.doSubmit}
        onDelete={this.doDelete}
        title="Edit news item"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.summary.newsItem[0]
  };
};

export default
  compose(
    graphql(FETCHITEM_QUERY, {
      options: ownProps => ({ variables: { id: ownProps.match.params.id } })
    }),
    graphql(UPDATE_ITEM_QUERY, { name: "updateNews" }),
    graphql(DELETE_ITEM_QUERY, { name: "deleteNews" })
  )(withRouter(NewsItemContainer));
