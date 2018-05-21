import React, { Component } from "react";
import { withRouter } from "react-router";
import NewsItem from "./newsitem";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class NewsItemAddContainer extends Component {
  doSubmit = async values => {
    await this.props.createNews({ variables: { input: values } });
    setTimeout(() => this.props.history.push("/news"), 500);
  };
  render() {
    return <NewsItem initialValues={{}} onSave={this.doSubmit} title="New news item" />;
  }
}

const createNews = gql`
  mutation createNews($input: NewsInputType) {
    createNews(input: $input) {
      id
    }
  }
`;

export default graphql(createNews, { name: "createNews" })(withRouter(NewsItemAddContainer));
