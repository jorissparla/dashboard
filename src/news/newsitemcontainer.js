import React, { Component } from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import NewsItem from "./newsitem";
import { fetchNewsItem, updateNews, deleteNews } from "../actions/index";

const FETCHITEM_QUERY = gql`
  query news ($id: ID){
  news (id: $id) {
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
`

const UPDATE_ITEM_QUERY = gql`
  mutation updateNews($input: NewsInputType) {
    updateNews(input: $input) {
      id

    }
  }

`

class NewsItemContainer extends Component {
  doSubmit = input => {
    window.alert(JSON.stringify(input, null, 2));
    // this.props.updateNews({ variables: { input } })
    updateNews(input);
    setTimeout(() => this.props.history.push("/news"), 500);
  };

  doDelete = id => {
    deleteNews(id);
    setTimeout(() => this.props.history.replace("/news"), 500);
  };

  async componentDidMount() {

    await this.props.fetchNewsItem(this.props.match.params.id);
  }

  render() {
    //const newsItem = this.props.data;
    console.log(this.props)
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    const news = this.props.data.news[0]
    //const newsItem = this.props.data.news({ variables: { id: this.props.match.params.id } })
    //console.log('NewsItem::', newsItem) //newsItem);
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

export default connect(mapStateToProps, {
  fetchNewsItem,
  updateNews,
  deleteNews
})(
  compose(graphql(FETCHITEM_QUERY, { options: ownProps => ({ variables: { id: ownProps.match.params.id } }) }),
    graphql(UPDATE_ITEM_QUERY, { name: 'updateNews' })

  )(withRouter(NewsItemContainer)));
