import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Dialog from "material-ui/Dialog";
import { Loading, Button } from "../styles";
import RequestForm from "./RequestForm";

const RequestItem = ({ item, handleClick }) => {
  const { id, name, text, createdAt } = item;
  return (
    <ListItem
      key={id}
      primaryText={text}
      secondaryText={`requested by ${name} at ${createdAt}`}
      onClick={() => handleClick(item)}
    />
  );
};

class RequestContainer extends Component {
  state = { showRequest: false, selectedItem: {} };

  handleClose = () => this.setState({ showRequest: false, selectedItem: {} });
  handleOpen = e => {
    console.log(e);
    this.setState({ showRequest: true, selectedItem: e });
  };
  render() {
    const { data: { loading, error, requests } } = this.props;
    console.log(this.props);
    const actions = [
      <Button label="Cancel" primary={true} onClick={this.handleClose}>
        Cancel
      </Button>,
      <Button label="Submit" primary={true} onClick={this.handleClose}>
        Submit
      </Button>
    ];

    //
    if (loading) {
      return <Loading />;
    }
    if (error) return <h2>{error}</h2>;
    return (
      <div>
        <List style={{ backgroundColor: "white" }}>
          {requests.map(item => [
            <RequestItem item={item} handleClick={this.handleOpen} />,
            <Divider />
          ])}
        </List>
        <Dialog
          modal={true}
          open={this.state.showRequest}
          actions={actions}
          onRequestClose={() => this.setState({ showRequest: false })}
        >
          <RequestForm {...this.state.selectedItem} />
        </Dialog>
      </div>
    );
  }
}

const queryRequests = gql`
  query request {
    requests {
      id
      name
      text
      createdAt
      updatedAt
    }
  }
`;

export default graphql(queryRequests, { name: "data" })(RequestContainer);
