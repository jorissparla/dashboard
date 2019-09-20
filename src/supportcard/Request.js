import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ViewText } from '../styles';
export const niceblue = '#40a5ed';
export const babyblue = '#ecf6fd';
export const twitterblue = '#1da1f2';

const paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '15px',
  padding: '10px',
  minWidth: '200px'
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing(1),
    width: 250
  },

  buttonDel: {
    margin: theme.spacing(1),
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: '100%'
  },
  titleField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: '40px',
    color: '#039BE5'
  },
  contentField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#eeeeee99',
    fontSize: 40
  }
});

const H3 = styled.h3`
  color: black;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  display: flex;
  align-items: flex-start;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid red;
  text-decoration: none;
  background-color: red;
  opacity: 0.7;
  color: white;
  font-family: Roboto;
  font-size: 15px;

  transition: all 0.45s;
  text-align: center;
  line-height: 36px;
  margin-left: 8px;
`;


class Request extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email,
    text: '',
    page: 'SupportCard',
    error: '',
    buttonText: 'Enter Request'
  };

  isNotEmpty = value => (value ? true : false);
  isValidEmail = email => /\S+@\S+\.\S+/.test(email);

  checkErrors = ({ email, name, text }) => {
    let error = '';
    if (!this.isValidEmail(email)) {
      error += ' Invalid email address ';
    }
    if (!this.isNotEmpty(name)) {
      error += ' - Name cannot be empty ';
    }
    if (!this.isNotEmpty(text)) {
      error += ' - Text  cannot be empty ';
    }
    this.setState({ error });
    return error === '';
  };

  componentWillMount() {
    if (this.props.user) {
      console.log('request', this.props);
      this.setState({
        ...this.state,
        email: this.props.user.email,
        name: this.props.user.fullname
      });
    }
  }
  onChangeName = ({ target: { value } }) => {
    this.setState({ name: value });
  };
  onChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value });
  };
  onChangeText = ({ target: { value } }) => {
    this.setState({ text: value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper style={paperStyle}>
        <H3>New Supportcard Request</H3>
        <FlexCol>
          {/*<H1>{this.state.page} Request</H1> */}
          <FlexRow>
            <ViewText
              placeholder="Enter Name"
              name="name"
              onChange={this.onChangeName}
              value={this.state.name}
            >
              {this.state.name}
            </ViewText>
            <ViewText
              placeholder="Enter email"
              name="email"
              onChange={this.onChangeEmail}
              value={this.state.email}
            >
              {this.state.email}
            </ViewText>
          </FlexRow>
          <TextField
            className={classes.contentField}
            placeholder="Enter Text"
            name="Request"
            multiLine
            rows={4}
            fullWidth
            onChange={this.onChangeText}
          />
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            onClick={this._onSubmit}
          >
            {this.state.buttonText}
          </Button>
          {this.state.error && <Error>{this.state.error}</Error>}
        </FlexCol>
      </Paper>
    );
  }

  _onSubmit = async e => {
    e.preventDefault();
    if (!this.checkErrors(this.state)) {
      return;
    } else {
      this.setState({ buttonText: 'submitting..' });
      await this.props.createRequest({ variables: this.state });
      setTimeout(() => {
        this.props.onSubmit ? this.props.onSubmit() : this.props.history.push('/supportcard');
      }, 2000);
    }
  };
}

const createRequestMutation = gql`
  mutation createRequest($name: String, $email: String, $text: String) {
    createRequest(input: { name: $name, email: $email, text: $text }) {
      id
    }
  }
`;

export default graphql(createRequestMutation, { name: 'createRequest' })(
  withRouter(withStyles(styles)(Request))
);
