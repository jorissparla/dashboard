import { gql, graphql } from "react-apollo";
import React from "react";
import { withRouter, browserHistory } from "react-router";
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log("doSubmit", JSON.stringify(e, null, -2));
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
      .then(() => browserHistory.push("/test"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  render() {
    const { loading, error, supportcard, modifySupportCard } = this.props.data;
    console.log("Pripraprops", this.props);
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const { id, title, description, category, link } = supportcard;

    return (
      <div>

        <SupportCardForm
          initialValues={supportcard}
          supportcard={supportcard}
          onSave={this.handleSubmit}
          onDelete={this.handleDelete}
          readOnly={false}
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
        category
        link
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

export default graphql(modifySupportCard, {
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
    options: ownProps => ({ variables: { id: ownProps.params.id } })
  })(withRouter(SupportCardEdit))
);
