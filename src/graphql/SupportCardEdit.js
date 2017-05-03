import { gql, graphql } from "react-apollo";
import React from "react";
import { withRouter } from "react-router";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import { CardSection } from "../common";

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

  componentDidMount() {
    console.log("Props0", this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      id: props.data.supportcard.id,
      title: props.data.supportcard.title,
      description: props.data.supportcard.description,
      category: props.data.supportcard.category,
      link: props.data.supportcard.link
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let title = this.state.title;
    let description = this.state.description;
    let category = this.state.category;
    let link = this.state.link;

    this.props
      .modifySupportCard({
        variables: {
          title: title,
          description: description,
          category: category,
          link: link
        }
      })
      .then(() => window.alert("success"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  render() {
    console.log("Props", this.props);
    const { loading, error, supportcard, modifySupportCard } = this.props.data;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const { id, title, description, category, link } = supportcard;

    return (
      <Paper zDepth={1} style={paperStyle}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            placeholder="Title"
            hintText="Title"
            name="title"
            value={this.state.title}
            fullWidth={true}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <TextField
            placeholder="Description"
            hintText="Description"
            name="description"
            value={this.state.description}
            fullWidth={true}
            multiLine={true}
            rows={4}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <TextField
            placeholder="Category"
            hintText="Category"
            name="category"
            value={this.state.category}
            fullWidth={true}
            onChange={e => this.setState({ category: e.target.value })}
          />
          <TextField
            placeholder="Link"
            name="link"
            value={this.state.link}
            fullWidth={true}
            onChange={e => this.setState({ link: e.target.value })}
          />
          <CardSection>
            <FlatButton type="submit" primary={true} label="Submit" />
          </CardSection>
        </form>
      </Paper>
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
  mutation modifySupportCard($title:String!, $description: String!, $category: String!,$link: String!) {
    modifySupportCard(title: $title, 
      description: $description, 
      category: $category, link: $link) {
        id
        title
        description
        category
        link
    }
  }
`;

export default graphql(modifySupportCard, { name: "modifySupportCard" })(
  graphql(supportcard, {
    options: ownProps => ({ variables: { id: ownProps.params.id } })
  })(withRouter(SupportCardEdit))
);
