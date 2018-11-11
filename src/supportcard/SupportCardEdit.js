import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React from 'react';
import { withRouter } from 'react-router';
import SupportCardForm from './SupportCardForm';
import withAuth from '../utils/withAuth';
import { SharedSnackbarConsumer } from '../SharedSnackbar.context';

class SupportCardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    const { id } = e;
    this.props
      .deleteSupportCard({ id })
      // .then(this.props.data.refetch())
      .then(() => setTimeout(this.props.history.push('/supportcard'), 500))
      .catch(e => alert(JSON.stringify(e, null, 2)));
  }

  handleSave = async e => {
    const { id, title, description, categoryname, link, owner = 'none' } = e;

    await this.props
      .modifySupportCard({
        id,
        title,
        description,
        categoryname,
        link,
        owner
      })
      // .then(this.props.data.refetch())
      .then(() => this.props.history.push('/supportcard'))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };

  render() {
    const { loading, error, categories, supportcard, me } = this.props.data;
    const { authenticated, isEditor } = this.props;
    console.log('me', me);
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => {
          return (
            <SupportCardForm
              initialValues={supportcard}
              supportcard={supportcard}
              onSave={async values => {
                await this.handleSave(values);
                openSnackbar('saved SupportCard');
              }}
              onDelete={async values => {
                await this.handleDelete(values);
                openSnackbar('Deleted SupportCard');
              }}
              readOnly={!(authenticated && isEditor)}
              authenticated={authenticated && isEditor}
              categories={categories}
            />
          );
        }}
      </SharedSnackbarConsumer>
    );
  }
}

const CURRENT_SUPPORTCARD_QUERY = gql`
  query CURRENT_SUPPORTCARD_QUERY($id: String) {
    supportcard(id: $id) {
      id
      title
      description
      categoryname
      category {
        name
      }
      link
      owner
      created
      updatedAt
    }
    categories {
      id
      name
    }
    me {
      id
      fullname
    }
  }
`;

const DELETE_SUPPORTCARD_MUTATION = gql`
  mutation DELETE_SUPPORTCARD_MUTATION($input: InputCardType) {
    deleteSupportCard(input: $input) {
      id
    }
  }
`;

const UPDATE_SUPPORTCARD_MUTATION = gql`
  mutation UPDATE_SUPPORTCARD_MUTATION($input: InputCardType) {
    modifySupportCard(input: $input) {
      supportcard {
        id
        title
        description
        categoryname
        link
      }
    }
  }
`;

export default graphql(DELETE_SUPPORTCARD_MUTATION, {
  props: ({ mutate }) => ({
    deleteSupportCard: input =>
      mutate({
        variables: {
          input
        }
      })
  })
})(
  graphql(UPDATE_SUPPORTCARD_MUTATION, {
    props: ({ mutate }) => ({
      modifySupportCard: input =>
        mutate({
          variables: {
            input
          }
        })
    })
  })(
    graphql(CURRENT_SUPPORTCARD_QUERY, {
      options: ownProps => ({ variables: { id: ownProps.match.params.id } })
    })(withRouter(withAuth(SupportCardEdit)))
  )
);
