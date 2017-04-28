import React, { Component } from "react";
import { connect } from "react-redux";
import NewsItem from "./newsitem";
import { createNews } from "../actions/index";

const doSubmit = values => {
  createNews(values);
  //browserHistory.push("/news");
};

class NewsItemAddContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NewsItem initialValues={{}} onSave={doSubmit} title="New news item" />
    );
  }
}

export default connect(null, {
  createNews
})(NewsItemAddContainer);
