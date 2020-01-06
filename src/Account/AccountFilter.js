import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
});

class AccountFilter extends Component {
  state = {
    team: this.props.values.team || '',
    location: this.props.values.location || '',
    firstname: this.props.values.firstname || '',
    region: this.props.values.region || ''
  };

  static propTypes = {
    onApply: PropTypes.func
  };

  static defaultProps = {
    onApply: values => console.log(values)
  };

  toggleGuest = () => {
    console.log('toggling Guest', this.state.firstname);
    this.state.firstname === 'Guest'
      ? this.setState({ firstname: '' })
      : this.setState({ firstname: 'Guest' });
  };
  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  clearFilter = () => {
    this.setState({
      team: '',
      location: '',
      firstname: '',
      region: ''
    });
  };
  makeFilter = () => {
    return Object.keys(this.state)
      .filter(n => this.state[n] !== '')
      .map(n => {
        return { [n]: this.state[n] };
      })
      .reduce((v, iv) => {
        return Object.assign(iv, v);
      }, {});
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            Account Information.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
          <Query query={LISTS_QUERY}>
            {({ data, loading }) => {
              if (loading) return 'loading';
              const { teams, locations, regions } = data;
              return (
                <div className="container">
                  <TextField
                    id="select-team"
                    name="team"
                    select
                    label="Select"
                    className={classes.textField}
                    value={this.state.team}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Please select your team"
                    margin="normal"
                  >
                    {teams.map(option => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="select-currency"
                    name="location"
                    select
                    label="Select"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Please select your location"
                    margin="normal"
                  >
                    {locations.map(option => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="select-region"
                    name="region"
                    select
                    label="Select"
                    className={classes.textField}
                    value={this.state.region}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Please select your region"
                    margin="normal"
                  >
                    {regions.map(option => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Guest"
                        onChange={this.toggleGuest}
                        checked={this.state.firstname === 'Guest'}
                      />
                    }
                    label="Guests/incomplete entries"
                  />
                  <div className="container">
                    {this.state.team}
                    {this.state.location}
                    {this.state.region}
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={() => this.props.onApply(this.makeFilter())}
                    >
                      Apply Filter
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      onClick={this.clearFilter}
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              );
            }}
          </Query>
        </Paper>
      </div>
    );
  }
}

const LISTS_QUERY = gql`
  query LISTS_QUERY {
    teams {
      id
      key
      description
    }
    locations {
      id
      key
      description
    }
    regions {
      id
      value
    }
  }
`;

export default withStyles(styles)(AccountFilter);
