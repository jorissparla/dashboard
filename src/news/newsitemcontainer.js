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
      title
      body
    }
  }
`;

const DELETE_NEWS = gql`
  mutation deleteNews($input: NewsInputType) {
    deleteNews(input: $input) {
      error
    }
  }
`;

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

  handleDelete = async id => {};

  render() {
    const id = this.props.match.params.id;
    return (
      <Query query={ALL_NEWS} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) {
            return "Loading";
          }
          const defaultValues = data.news[0];
          return (
            <Mutation mutation={UPDATE_NEWS}>
              {updateNews => {
                return (
                  <Mutation mutation={DELETE_NEWS}>
                    {deleteNews => {
                      return (
                        <React.Fragment>
                          <NewsItem
                            initialValues={defaultValues}
                            onSave={async values => {
                              const { id, title, body, link, link_text, img } = values;
                              const input = { id, title, body, link, link_text, img };
                              await updateNews({ variables: { input } });
                              setTimeout(() => this.props.history.push("/news"), 500);
                            }}
                            onDelete={async id => {
                              const input = { id };
                              await deleteNews({ variables: { input } });
                              setTimeout(() => this.props.history.push("/news"), 500);
                            }}
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
                    }}
                  </Mutation>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
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
