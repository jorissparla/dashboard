import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import SelectField from 'material-ui/SelectField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { HeaderRow, HeaderLeft, HeaderRight, Title, Image } from '../styles';
import Dialog from '@material-ui/core/Dialog';
import Save from '@material-ui/icons/Save';
import Undo from '@material-ui/icons/Undo';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

const P = styled.div`
  white-space: pre-line;
  font-size: 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  left: 15px;
  min-width: 100px;
`;
const DateField = styled.div`
  font-size: 12px;
  margin-right: 5px;
`;

const Fat = styled.h3`
  font-weight: 100;
  font-family: Raleway, Roboto;
}
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
    text: '',
    orgtext: '',
    open: false,
    navid: '',
    fullname: '',
    image: '',
    customername: '',
    newtext: '',
    createdAt: new Date()
  };

  initState = () => {
    this.setState({
      currentid: null,
      index: null,
      text: '',
      orgtext: '',
      navid: '',
      fullname: '',
      image: '',
      customername: '',
      newtext: '',
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
    console.log('mounting');
  }

  renderListItem = (item, index) => {
    const { id, text, createdAt, customername, forConsultant } = item;
    const { image, fullname } = forConsultant || { image: '', fullname: 'None' };
    return (
      <React.Fragment key={index}>
        <ListItem key={index}>
          <Left>
            <Image image={image} fullname={fullname} />
            <DateField>{createdAt.substr(0, 10)}</DateField>
          </Left>
          <ListItemText
            primary={
              <Fat>
                {fullname} ({customername} )
              </Fat>
            }
            secondary={
              this.state.currentid === id ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: 2,
                    color: '#40a5ed',
                    height: 100
                  }}
                >
                  <TextField
                    fullWidth={true}
                    underlineShow={true}
                    multiLine={true}
                    rows={2}
                    style={{
                      fontSize: '14px',
                      border: ' 1px solid #40a5ed',
                      textColor: 'white',
                      marginTop: 0
                    }}
                    value={this.state.text}
                    onBlur={this.handleBlur}
                    onChange={this.handleChangeText}
                  />
                  <Save onClick={this.handleBlur} />
                  <Undo onClick={this.handleUndo} />
                </div>
              ) : (
                <div>{text}</div>
              )
            }
          />

          <ListItemSecondaryAction>
            {this.props.isEditor ? <Clear onClick={() => this.handleClear(id)} /> : <div />}
          </ListItemSecondaryAction>
        </ListItem>

        <Divider key="divider123" />
      </React.Fragment>
    );
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push('/addfeedback')}
            >
              New
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.props.history.push('/comments')}
            >
              Surveys
            </Button>
          </HeaderRight>
        )}
      </HeaderRow>,
      <Paper key="555paper">
        <List key="fblist">{feedback.map((item, index) => this.renderListItem(item, index))}</List>
      </Paper>
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
      <Button key="okb" variant="contained" color="primary" onClick={this.saveEntry}>
        Ok
      </Button>,
      <Button
        key="canb"
        variant="contained"
        color="secondary"
        onClick={() => this.setState({ open: false })}
      >
        Cancel
      </Button>
    ];

    return (
      <Dialog
        title="Add New Feedback Entry"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        style={{ width: '900px' }}
      >
        <Select
          id="person"
          name="person"
          hintText="Select a person"
          multiple={false}
          fullWidth
          onChange={this.handleChangePerson}
          style={{ flex: 2 }}
          value={this.state.navid}
        >
          {supportfolks.map(person => (
            <MenuItem key={person.id} value={person.navid} primaryText={person.fullname}>
              {person.fullname}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="customername"
          name="customername"
          hintText="Customer name"
          fullWidth
          onChange={this.handleChange}
          value={this.state.customername}
        />
        <TextField
          type="date"
          label="Date"
          /* value={this.state.createdAt} */
          onChange={this.handleChangeDate}
        />
        <TextField
          id="newtext"
          name="newtext"
          multiLine
          fullWidth
          rows={2}
          label="Feedback text"
          onChange={this.handleChange}
          value={this.state.newtext}
        />
      </Dialog>
    );
  };
}

export default compose(
  graphql(queryFeedback),
  graphql(updateFeedback, { name: 'updateFeedback' }),
  graphql(deleteFeedback, { name: 'deleteFeedback' }),
  graphql(createFeedback, { name: 'createFeedback' })
)(withRouter(FeedBackList));
