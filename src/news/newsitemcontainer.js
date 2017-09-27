import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NewsItem from "./newsitem";
import { fetchNewsItem, updateNews, deleteNews } from "../actions/index";

class NewsItemContainer extends Component {
  doSubmit = values => {
    window.alert(JSON.stringify(values, null, 2));
    updateNews(values);
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
    if (!this.props.news) {
      return <div>Loading...</div>;
    }
    return (
      <NewsItem
        initialValues={this.props.news}
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
})(withRouter(NewsItemContainer));
