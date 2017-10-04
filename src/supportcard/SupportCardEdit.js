import { gql, graphql } from "react-apollo";
import React from "react";
import { withRouter } from "react-router";
import SupportCardForm from "./SupportCardForm";
import withAuth from "../utils/withAuth";

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
      .then(() => setTimeout(this.props.history.push("/supportcard"), 500))
      .catch(e => alert(JSON.stringify(e, null, 2)));
  }

  handleSave(e) {
    const { id, title, description, categoryname, link, owner = "none", createdAt, updatedAt } = e;

    this.props
      .modifySupportCard({
        id,
        title,
        description,
        categoryname,
        link,
        owner
      })
      // .then(this.props.data.refetch())
      .then(alert("Updated"))
      .then(this.props.data.refetch())
      .then(() => this.props.history.push("/supportcard"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  render() {
    const { loading, error, categories, supportcard, me } = this.props.data;
    const { authenticated } = this.props;
    console.log("me", me);
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div>
        <SupportCardForm
          initialValues={supportcard}
          supportcard={supportcard}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
          readOnly={!authenticated}
          authenticated={authenticated}
          categories={categories}
        />
      </div>
    );
  }
}

const supportcard = gql`
  query supportcard($id: String) {
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
      fullname
    }
  }
`;

const deleteSupportCard = gql`
  mutation deleteSupportCard($input: InputCardType) {
    deleteSupportCard(input: $input) {
      id
    }
  }
`;

const modifySupportCard = gql`
  mutation modifySupportCard($input: InputCardType) {
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

export default graphql(deleteSupportCard, {
  props: ({ mutate }) => ({
    deleteSupportCard: input =>
      mutate({
        variables: {
          input
        }
      })
  })
})(
  graphql(modifySupportCard, {
    props: ({ mutate }) => ({
      modifySupportCard: input =>
        mutate({
          variables: {
            input
          }
        })
    })
  })(
    graphql(supportcard, {
      options: ownProps => ({ variables: { id: ownProps.match.params.id } })
    })(withRouter(withAuth(SupportCardEdit)))
  )
);
