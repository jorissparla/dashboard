import React, { Component } from "react";
import { connect } from "react-redux";
import NewsItem from "./newsitem";
import { fetchNewsItem, updateNews, deleteNews } from "../actions/index";

const doSubmit = values => {
  console.log("DoSubmit", values);
  window.alert(JSON.stringify(values, null, 2));
  updateNews(values);
  setInterval(() => (window.location.href = "/news"), 3000);
};

const doDelete = values => {
  deleteNews(values.id);
};
class NewsItemContainer extends Component {
  componentDidMount() {
    this.props.fetchNewsItem(this.props.params.id);
  }

  render() {
    console.log("render container", this.props.params.id, this.props);

    if (!this.props.news) {
      return <div>Loading...</div>;
    }
    return (
      <NewsItem
        initialValues={this.props.news}
        onSave={doSubmit}
        onDelete={doDelete}
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
})(NewsItemContainer);
