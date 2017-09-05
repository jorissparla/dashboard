import { gql, graphql } from "react-apollo";
import React from "react";
import { withRouter } from "react-router-dom";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import {
  compose,
  withState,
  withHandlers,
  renderComponent,
  branch
} from "recompose";
import { CardSection } from "../common";
import SupportCardForm from "./SupportCardForm";
import withAuth from "../utils/withAuth";

const withOpen = withState("open", "setOpen", true);

const SimpleDialog = withOpen(({ open, setOpen }) => {
  console.log("Simpledilog", open, setOpen);
  return (
    <div>
      <Dialog
        title="Dialog With Actions"
        modal={false}
        open={open}
        actions={[<FlatButton label="Ok" onTouchTap={() => setOpen(false)} />]}
        onRequestClose={() => setOpen(false)}
      >
        Test
      </Dialog>
    </div>
  );
});
const showSimpleDialog = isOpen =>
  branch(isOpen, renderComponent(SimpleDialog));

const enhance = showSimpleDialog(props => props.open);
console.log(enhance);
const paperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "15px",
  padding: "10px",
  minWidth: "200px"
};

class SupportCardEdit extends React.Component {
  /*  state = {
    id: this.props.data.supportcard.id,
    title: this.props.data.supportcard.title,
    category: this.props.data.supportcard.category,
    link: this.props.data.supportcard.link
  };*/

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
    const { id, title, description, category, link } = e;

    this.props
      .modifySupportCard({
        id,
        title,
        description,
        category,
        link
      })
      // .then(this.props.data.refetch())
      .then(alert("Updated"))
      .then(this.props.data.refetch())
      .then(() => this.props.history.push("/supportcard"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  render() {
    const {
      loading,
      error,
      categories,
      supportcard,
      modifySupportCard
    } = this.props.data;
    const { authenticated, history } = this.props;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const { id, title, description, category, link } = supportcard;
    console.log("this.props", this.props);
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
    supportcard(id: $id ) {
        id
        title
        description
        category {
          name
          
        }
        link
    }
    categories {
      id
      name
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
  mutation modifySupportCard($input:InputCardType) {
    modifySupportCard(input: $input) {
      supportcard {
        id
        title
        description
        category
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
