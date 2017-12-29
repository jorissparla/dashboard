import React, { Component } from "react";

import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";

const PrimaryText = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: grey;
`;

class CustomerList extends Component {
  state = {};

  handleSelect = id => {
    this.props.onSelect ? this.props.onSelect(id) : console.log("id selected", id);
  };

  renderCustomer = ({ id, name, number, followed }) => {
    const { onSelect = () => console.log("noppes") } = this.props;
    return [
      <ListItem
        key={id}
        primaryText={<PrimaryText>{number}</PrimaryText>}
        secondaryText={name}
        leftAvatar={<Avatar src={followed.image} />}
        onClick={() => this.handleSelect(id)}
      />,
      <Divider key={`${id}d`} />
    ];
  };
  render() {
    const { customers } = this.props;
    return <List>{customers.map(customer => this.renderCustomer(customer))}</List>;
  }
}

export default CustomerList;
