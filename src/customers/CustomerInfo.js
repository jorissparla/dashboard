import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Checkbox from "material-ui/Checkbox";
import styled from "styled-components";

const styles = {
  checkbox: {
    width: "20%"
  },
  customWidth: {
    width: 350,
    marginRight: 20
  }
};

const PrimaryText = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: grey;
  padding: 5px;
`;

const TitleText = styled.div`
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: grey;
  padding: 5px;
`;

const Horiz = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Horiz2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
`;
class CustomerInfo extends React.Component {
  state = {
    navid: "",
    id: this.props.followed.id,
    image: this.props.followed.image,
    active: this.props.details.active,
    checked: this.props.details.active === 1
  };

  handleChange = (event, index, id) => {
    this.setState({ id });
    const { navid, image } = this.props.persons.filter(person => person.id === id)[0];

    this.setState({ id, navid, image });
  };

  handleUpdateActive = () => {
    this.setState(old => {
      console.log("OLD", old);
      return { active: 1 - old.active };
    });
  };
  menuItems = persons => {
    console.log("persons", persons);
    return persons.map(person => (
      <MenuItem
        key={person.id}
        insetChildren={true}
        checked={this.state.id === person.id}
        value={person.id}
        primaryText={person.fullname}
        leftAvatar={<Avatar src={person.image} size={30} />}
      />
    ));
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.followed.id !== this.props.followed.id) {
      const { followed: { navid, id, image }, details: { active } } = nextProps;
      this.setState({ id, navid, image, active });
    }
  }
  render() {
    const { details, persons } = this.props;
    console.log("STATE", this.state.active === 1, this.state, this.props);
    return (
      <div style={{ marginBottom: 20 }}>
        {" "}
        <Horiz>
          <TitleText>{details.name}</TitleText>
        </Horiz>
        <Horiz>
          <PrimaryText>{details.number}</PrimaryText>{" "}
          <Checkbox
            label="Active"
            style={styles.checkbox}
            value={this.state.checked}
            onCheck={this.handleUpdateActive}
          />
        </Horiz>
        <Horiz>Followed By</Horiz>
        <Horiz2>
          <SelectField
            hintText="Select a name"
            value={this.state.id}
            onChange={this.handleChange}
            style={styles.customWidth}
          >
            {this.menuItems(persons)}
          </SelectField>
          <Avatar src={this.state.image} />
        </Horiz2>
        <Divider style={{ marginBottom: 20 }} />
      </div>
    );
  }
}

export default CustomerInfo;
