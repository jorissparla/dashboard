import React, { Component } from "react";
import AddIcon from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  margin-left: 0px;
  padding: 20px 56px 20px 72px;
  position: relative;
`;

const Img = styled.div`
  color: white;
  background-color: rgb(186, 104, 200);
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 8px;
  left: 16px;
`;

const Icon = styled.div`
  display: block;
  color: rgba(0, 0, 0, 0.87);
  fill: rgb(117, 117, 117);
  height: 24px;
  width: 24px;
  visibility: ${props => (props.enabled ? "initial" : "initial")};
  user-select: none;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 4px;
  cursor: pointer;
  margin: 12px;
  right: 4px;
`;
class AddNote extends Component {
  state = { note: ''};
  handleClick = () => {
    window.alert(this.state.note)
    this.props.onAdd(this.state.note)
    this.setState({note: ''})
  };

  handleChange = (e, val) => {
    this.setState({note: val})
  }

  render() {
    const defaultDate = new Date();
    const { enabled } = this.props;
    const styles = {
      iconStyleOn : {
      visibility: 'inherit'
    }, 
    iconStyleOff: {
      visibility: 'hidden'
    }
  }
    
    return (
      <Container>
        <Img>{format(defaultDate, "DD")}</Img>
        <TextField hintText="Please add your update note for the customer.." fullWidth={true} onChange={this.handleChange} value={this.state.note}/>
        <Icon onClick={this.handleClick} style={this.props.enabled? styles.iconStyleOn: styles.iconStyleOff}>
          <AddIcon />
        </Icon>
      </Container>
    );
  }
}

export default AddNote;
