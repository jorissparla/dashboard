import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import NewsItem from './newsitem';
import { SharedSnackbarConsumer } from '../globalState/SharedSnackbar.context';

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
    err: 'No error'
  };

  handleDelete = async id => {};

  render() {
    const id = this.props.match.params.id;
    return (
      <Query query={ALL_NEWS} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) {
            return 'Loading';
          }
          const defaultValues = data.news[0];
          return (
            <Mutation mutation={UPDATE_NEWS} refetchQueries={[{ query: ALL_NEWS }]}>
              {updateNews => {
                return (
                  <Mutation mutation={DELETE_NEWS} refetchQueries={[{ query: ALL_NEWS }]}>
                    {deleteNews => {
                      return (
                        <React.Fragment>
                          <SharedSnackbarConsumer>
                            {({ openSnackbar }) => (
                              <NewsItem
                                initialValues={defaultValues}
                                onSave={async values => {
                                  console.log('onSave', values);
                                  const { id, title, body, link, link_text, img } = values;
                                  const input = { id, title, body, link, link_text, img };
                                  await updateNews({ variables: { input } });
                                  openSnackbar('Item updated');
                                  setTimeout(() => this.props.history.push('/news'), 500);
                                }}
                                onDelete={async id => {
                                  const input = { id };
                                  await deleteNews({ variables: { input } });
                                  openSnackbar('Item Deleted');
                                  setTimeout(() => this.props.history.push('/news'), 500);
                                }}
                                title="Edit news item"
                              />
                            )}
                          </SharedSnackbarConsumer>
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
