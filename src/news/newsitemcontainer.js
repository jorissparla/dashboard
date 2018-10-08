import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router";
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
}

export default withRouter(NewsItemContainer);
//);
