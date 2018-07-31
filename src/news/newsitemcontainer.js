import React, { Component } from "react";
import gql from "graphql-tag";
import * as R from "ramda";
import { graphql, compose, Mutation, Query } from "react-apollo";
import { withRouter } from "react-router";
import { adopt } from "react-adopt";
import NewsItem from "./newsitem";
import Snackbar from "material-ui/Snackbar";

const ALL_NEWS = gql`
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

const updateNews = ({ render }) => (
  <Mutation
    mutation={UPDATE_NEWS}
    update={(cache, { data: { updateNews } }) => {
      const query = ALL_NEWS;
      const { news } = cache.readQuery({ query });
      const idx = R.findIndex(R.propEq("id", news.id), news);
      cache.writeQuery({
        query,
        data: { news: R.update(idx, updateNews, news) }
      });
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const DELETE_NEWS = gql`
  mutation deleteNews($input: NewsInputType) {
    deleteNews(input: $input) {
      error
    }
  }
`;

const deleteNews = ({ render }) => (
  <Mutation
    mutation={DELETE_NEWS}
    update={(cache, { data: { deleteNews } }) => {
      const query = ALL_NEWS;
      const props = cache.readQuery({ query });
      const { news } = props;
      const byTodoId = R.propEq("id", deleteNews.id);
      cache.writeQuery({
        query,
        data: { news: R.reject(byTodoId, news) }
      });
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const newsComp = ({ render }) => {
  <Query query={ALL_NEWS}>{(data, loading) => render(data, loading)}</Query>;
};

const NewsContainer = adopt({
  news: newsComp,
  deleteNews,
  updateNews
});

class NewsItemContainer extends Component {
  state = {
    showMessage: false,
    err: "No error"
  };
  doSubmit = values => {
    //window.alert(JSON.stringify(values, null, 2));
    //console.log(JSON.stringify(values, null, 2));
    const { id, title, body, link, link_text, img } = values;
    const input = { id, title, body, link, link_text, img };
    this.props.updateNews({ variables: { input } });
    setTimeout(() => this.props.history.push("/news"), 500);
  };

  doDelete = id => {
    //deleteNews(id);
    const input = { id };
    this.props.deleteNews({ variables: { input } });
    setTimeout(() => this.props.history.push("/news"), 500);
  };

  render() {
    const id = this.props.match.params.id;
    return (
      <NewsContainer>
        {({ news: { data, loading }, deleteNews, updateNews }) => {
          console.log("Container||");
          if (loading) {
            return <div>Loading</div>;
          } else {
            console.log("Container&&", id, data.news[0]);
            const idx = R.findIndex(R.propEq("id", id), data.news);

            const defaultValues = data.news[idx];
            console.log("idx", idx), defaultValues;
            const handleSubmit = async values => {
              const { id, title, body, link, link_text, img } = values;
              const input = { id, title, body, link, link_text, img };
              await updateNews.mutation({ variables: { input } });
              setTimeout(() => this.props.history.push("/news"), 500);
            };

            const handleDelete = async id => {
              const input = { id };
              await deleteNews.mutation({ variables: { input } });
              setTimeout(() => this.props.history.push("/news"), 500);
            };

            return (
              <React.Fragment>
                <NewsItem
                  initialValues={defaultValues}
                  onSave={values => handleSubmit(values)}
                  onDelete={id => handleDelete(id)}
                  title="Edit news item"
                />
                <Snackbar
                  open={this.state.showMessage}
                  message={this.state.err}
                  autoHideDuration={4000}
                  onRequestClose={() => console.log("close")}
                />
              </React.Fragment>
            );
          }
        }}
      </NewsContainer>
    );
  }

  render2() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    const news = this.props.data.news[0];
    if (!news) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <NewsItem
          initialValues={news}
          onSave={this.doSubmit}
          onDelete={this.doDelete}
          title="Edit news item"
        />
        <Snackbar
          open={this.state.showMessage}
          message={this.state.err}
          autoHideDuration={4000}
          onRequestClose={() => console.log("close")}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.summary.newsItem[0]
  };
};

export default /* compose(
  graphql(ALL_NEWS, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } })
  }),
  graphql(UPDATE_NEWS, { name: "updateNews" }),
  graphql(DELETE_NEWS, { name: "deleteNews" })
)( */
withRouter(NewsItemContainer);
//);
