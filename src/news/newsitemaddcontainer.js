import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NewsItem from './newsitem';
import gql from 'graphql-tag';
import * as R from 'ramda';
import { Mutation } from 'react-apollo';

class NewsItemAddContainer extends Component {
  doSubmit = async values => {
    await this.props.createNews({ variables: { input: values } });
    setTimeout(() => this.props.history.push('/news'), 500);
  };
  render() {
    return (
      <Mutation
        mutation={createNews}
        update={(cache, { data: { createNews } }) => {
          const query = ALL_NEWS;
          const { news } = cache.readQuery({ query });
          // const idx = R.findIndex(R.propEq("id", news.id), news);
          cache.writeQuery({
            query,
            data: { news: R.concat(news, [createNews]) }
          });
        }}
      >
        {(createNews, { data }) => {
          return (
            <NewsItem
              initialValues={{}}
              title="News to Share!"
              onSave={values => {
                createNews({ variables: { input: values } });
                setTimeout(() => this.props.history.push('/newspage'), 500);
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

const createNews = gql`
  mutation createNews($input: NewsInputType) {
    createNews(input: $input) {
      id
    }
  }
`;

const ALL_NEWS = gql`
  query ALL_NEWS {
    news {
      title
      body
      img
      expire_date
      id
    }
  }
`;

export default withRouter(NewsItemAddContainer);
