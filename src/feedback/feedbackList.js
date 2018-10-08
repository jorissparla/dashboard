import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import { withRouter } from "react-router";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import styled from "styled-components";
import { HeaderRow, HeaderLeft, HeaderRight, Title, Image } from "../styles";
import Dialog from "material-ui/Dialog";
import Save from "material-ui/svg-icons/content/save";
import Undo from "material-ui/svg-icons/content/undo";
import Clear from "material-ui/svg-icons/content/clear";
import RaisedButton from "material-ui/RaisedButton";

const P = styled.p`
  white-space: pre-line;
  font-size: 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  left: 15px;
`;
const DateField = styled.div`
  font-size: 12px;
  margin-right: 5px;
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

const createFeedback = gql`
  mutation createFeedback($input: FeedbackInputType) {
    createFeedback(input: $input) {
      id
    }
  }
`;

const updateFeedback = gql`
  mutation updateFeedback($input: FeedbackInputType) {
    updateFeedback(input: $input) {
      id
    }
  }
`;

const deleteFeedback = gql`
  mutation deleteFeedback($input: FeedbackInputType) {
    deleteFeedback(input: $input) {
      result
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
    image: "",
    customername: "",
    newtext: "",
    createdAt: new Date()
  };

  initState = () => {
    this.setState({
      currentid: null,
      index: null,
      text: "",
      orgtext: "",
      navid: "",
      fullname: "",
      image: "",
      customername: "",
      newtext: "",
      createdAt: new Date()
    });
  };
  handleClick = (id, text, index) => {
    this.setState({ currentid: id, text, orgtext: text, index });
  };

  handleChangeText = e => this.setState({ text: e.target.value });
  handleBlur = e => {
    this.updateEntry();
  };
  handleUndo = e => this.setState({ text: this.state.orgtext });

  handleClear = id => {
    const input = { id };
    this.props.deleteFeedback({ variables: { input } }).then(() => {
      this.props.data.refetch();
      this.initState();
    });
  };

  componentDidMount() {
    console.log("mounting");
  }

  renderListItem = (item, index) => {
    const { id, text, createdAt, customername, forConsultant } = item;
    const { image, fullname } = forConsultant || { image: "", fullname: "None" };
    return [
      <ListItem
        style={{ height: index === this.state.index ? 150 : 75 }}
        onClick={() => this.handleClick(id, text, index)}
        key={id}
        leftAvatar={
          <Left>
            <Image image={image} fullname={fullname} />
            <DateField>{createdAt.substr(0, 10)}</DateField>
          </Left>
        }
        primaryText={`${fullname} (${customername} )`}
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
                onChange={this.handleChangeText}
              />
              <Save onClick={this.handleBlur} />
              <Undo onClick={this.handleUndo} />
            </div>
          ) : (
            <P>{text}</P>
          )
        }
        secondaryTextLines={2}
        rightIcon={this.props.isEditor ? <Clear onClick={() => this.handleClear(id)} /> : <div />}
      />,
      <Divider key="divider123" />
    ];
  };
  render() {
    const {
      data: { loading, feedback },
      isEditor
    } = this.props;
    if (loading) return <div>Loading</div>;
    return [
      <HeaderRow key="sdsheaderrow">
        <HeaderLeft>
          <Title>Nice Customer Feedback</Title>
        </HeaderLeft>
        {isEditor && (
          <HeaderRight>
            <RaisedButton
              label="New"
              primary={true}
              style={{ margin: 10 }}
              onClick={() => this.setState({ open: true })}
            />
            <RaisedButton
              label="Surveys"
              secondary={true}
              style={{ margin: 10 }}
              onClick={() => this.props.history.push("/comments")}
            />
          </HeaderRight>
        )}
      </HeaderRow>,
      <Paper key="555paper">
        <List key="fblist">{feedback.map((item, index) => this.renderListItem(item, index))}</List>
      </Paper>,
      <div key="stateopen43242">{this.state.open ? this.renderDialog() : null}</div>
    ];
  }

  handleChangePerson = (e, i, v) => {
    this.setState({
      navid: v,
      fullname: this.props.data.supportfolks[i].fullname,
      image: this.props.data.supportfolks[i].image
    });
  };

  handleChange = ({ target: { name, value } }, newValue) => {
    this.setState({ [name]: value });
  };

  handleChangeDate = (e, d) => {
    this.setState({ createdAt: d });
  };

  saveEntry = () => {
    const input = {
      createdAt: this.state.createdAt,
      customername: this.state.customername,
      consultant: this.state.fullname,
      navid: this.state.navid,
      text: this.state.newtext
    };
    this.props.createFeedback({ variables: { input } }).then(() => {
      this.props.data.refetch();
      this.initState();
      this.setState({ open: false });
    });
  };

  updateEntry = () => {
    const input = {
      id: this.state.currentid,
      text: this.state.text
    };
    this.props.updateFeedback({ variables: { input } }).then(() => {
      this.props.data.refetch();
      this.initState();
    });
  };

  renderDialog = () => {
    const {
      data: { supportfolks }
    } = this.props;
    const actions = [
      <RaisedButton
        key="okb"
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.saveEntry}
      />,
      <RaisedButton
        key="canb"
        label="Cancel"
        secondary={true}
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
        style={{ width: "900px" }}
      >
        <SelectField
          id="person"
          name="person"
          hintText="Select a person"
          multiple={false}
          fullWidth={true}
          onChange={this.handleChangePerson}
          style={{ flex: 2 }}
          value={this.state.navid}
        >
          {supportfolks.map(person => (
            <MenuItem key={person.id} value={person.navid} primaryText={person.fullname} />
          ))}
        </SelectField>
        <TextField
          id="customername"
          name="customername"
          hintText="Customer name"
          fullWidth={true}
          onChange={this.handleChange}
          value={this.state.customername}
        />
        <DatePicker hintText="Date" value={this.state.createdAt} onChange={this.handleChangeDate} />
        <TextField
          id="newtext"
          name="newtext"
          multiLine={true}
          fullWidth={true}
          rows={2}
          hintText="Feedback text"
          onChange={this.handleChange}
          value={this.state.newtext}
        />
      </Dialog>
    );
  };
}

export default compose(
  graphql(queryFeedback),
  graphql(updateFeedback, { name: "updateFeedback" }),
  graphql(deleteFeedback, { name: "deleteFeedback" }),
  graphql(createFeedback, { name: "createFeedback" })
)(withRouter(FeedBackList));
