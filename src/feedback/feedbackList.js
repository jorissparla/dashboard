import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Paper from "material-ui/Paper";
import { withRouter } from "react-router";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import styled from "styled-components";
import { HeaderRow, HeaderLeft, HeaderRight, WideTitle, Title, Image } from "../styles";
import Dialog from "material-ui/Dialog";
//import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import ModeEdit from "material-ui/svg-icons/image/navigate-next";
import Save from "material-ui/svg-icons/content/save";
import Undo from "material-ui/svg-icons/content/undo";
import Clear from "material-ui/svg-icons/content/clear";
import RaisedButton from "material-ui/RaisedButton";

const P = styled.p`
  white-space: pre-line;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  left: 15px;
`;
const DateField = styled.div`
  font-size: 10px;
`;

const queryFeedback = gql`
  query feedbackQuery {
    feedback {
      id
      createdAt
      customername
      text
      forConsultant {
        image
        fullname
      }
    }
    supportfolks {
      id
      navid
      fullname
      image
    }
  }
`;
const querySupportFolks = gql`
  query supportFolks {
    supportfolks {
      id
      navid
      fullname
      image
    }
  }
`;

class FeedBackList extends Component {
  state = {
    index: null,
    currentid: null,
    text: "",
    orgtext: "",
    open: false,
    navid: "",
    fullname: "",
    image: ""
  };

  handleClick = (id, text, index) => {
    this.setState({ currentid: id, text, orgtext: text, index });
  };

  handleChange = e => this.setState({ text: e.target.value });
  handleBlur = e => console.log("Blur", e.target.value);
  handleUndo = e => this.setState({ text: this.state.orgtext });
  renderListItem = (item, index) => {
    const { id, text, createdAt, forConsultant: { image, fullname } } = item;
    const hi = parseInt(text.length / 300) + 1;
    const h = hi === 1 ? 125 : 150;
    console.log(h);
    return [
      <ListItem
        style={{ height: h }}
        onClick={() => this.handleClick(id, text, index)}
        key={id}
        leftAvatar={
          <Left>
            <Image image={image} fullname={fullname} />
            <DateField>{createdAt.substr(0, 10)}</DateField>
          </Left>
        }
        primaryText={fullname.slice(0, 50)}
        secondaryText={
          this.state.currentid === id ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: 2,
                color: "#40a5ed",
                height: 100
              }}
            >
              <TextField
                fullWidth={true}
                underlineShow={true}
                multiLine={true}
                rows={2}
                style={{
                  fontSize: "14px",
                  border: " 1px solid #40a5ed",
                  textColor: "white",
                  marginTop: 0
                }}
                hintText="Select a person"
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
              <Save onClick={this.handleBlur} />
              <Undo onClick={this.handleUndo} />
            </div>
          ) : (
            <P>{text}</P>
          )
        }
        secondaryTextLines={2}
        rightIcon={<Clear onClick={() => this.props.history.push("/feedback/edit/" + id)} />}
      />,
      <Divider />
    ];
  };
  render() {
    console.log(this.props);
    const { data: { loading, feedback, supportfolks } } = this.props;
    if (loading) return <div>Loading</div>;
    return [
      <HeaderRow>
        <HeaderLeft>
          <Title>Nice Customer Feedback</Title>
        </HeaderLeft>
        <HeaderRight>
          <RaisedButton
            label="New"
            primary={true}
            style={{ margin: 10 }}
            onClick={() => this.setState({ open: true })}
          />
          <RaisedButton label="Surveys" secondary={true} style={{ margin: 10 }} />
        </HeaderRight>
      </HeaderRow>,
      <Paper>
        <List>{feedback.map((item, index) => this.renderListItem(item, index))}</List>
      </Paper>,
      <div>{this.state.open ? this.renderDialog() : null}</div>
    ];
  }

  handleChangePerson = (e, i, v) => {
    console.log(i, v, this.props.data.supportfolks[i].fullname);
    this.setState({
      navid: v,
      fullname: this.props.data.supportfolks[i].fullname,
      image: this.props.data.supportfolks[i].image
    });
  };

  renderDialog = () => {
    const { data: { supportfolks } } = this.props;
    const actions = [
      <RaisedButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.setState({ open: false })}
      />
    ];

    return (
      <Dialog
        title="Add New Feedback Entry"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Open a Date Picker dialog from within a dialog.
        <TextField hintText="Date Picker" />
        <SelectField
          id="person"
          name="person"
          hintText="Select a person"
          multiple={false}
          onChange={this.handleChangePerson}
          style={{ flex: 2 }}
          value={this.state.navid}
        >
          {supportfolks.map(person => (
            <MenuItem key={person.id} value={person.navid} primaryText={person.fullname} />
          ))}
        </SelectField>
      </Dialog>
    );
  };
}

export default graphql(queryFeedback)(withRouter(FeedBackList));
