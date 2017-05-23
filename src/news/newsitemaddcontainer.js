import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NewsItem from "./newsitem";
import { createNews } from "../actions/index";

class NewsItemAddContainer extends Component {
  doSubmit = values => {
    createNews(values);
    setTimeout(() => this.props.history.push("/news"), 500);
    //browserHistory.push("/news");
  };
  render() {
    return (
      <NewsItem
        initialValues={{}}
        onSave={this.doSubmit}
        title="New news item"
      />
    );
  }
}

export default connect(null, {
  createNews
})(withRouter(NewsItemAddContainer));
