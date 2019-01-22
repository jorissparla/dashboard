import React from 'react';
import { CardSection } from '../common';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  TextFieldStyle: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  buttonStyle: {
    backgroundColor: '#ffc600',
    labelColor: 'white',
    margin: '20px'
  },
  buttonStyle2: {
    backgroundColor: 'black',
    labelColor: 'white',
    margin: '20px'
  }
});

const teams = [
  { key: 'Finance', description: 'Finance' },
  { key: 'Logistics', description: 'Logistics' },
  { key: 'Tools', description: 'Tools' }
];

const regions = [
  { key: 'EMEA', description: 'EMEA' },
  { key: 'NA', description: 'NA' },
  { key: 'APJ', description: 'APJ' },
  { key: 'LA', description: 'LA' }
];

class ChatAdd extends React.Component {
  state = {
    team: 'Finance',
    region: 'EMEA',
    weeknr: '',
    nrchats: 0,
    responseintime: 0,
    dataSource: [],
    name: 'Joris'
  };

  componentDidMount() {
    this.setState({ weeknr: this.props.ranges[2].Name });
  }
  handleSubmit = e => {
    this.props.onSave(this.state);
  };

  doSubmit(values) {
    window.alert(`You submitted Parent:\n\n${JSON.stringify(values, null, 2)}`);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { ranges, onCancel, classes } = this.props;

    if (!ranges) {
      return <CardSection>Loading...</CardSection>;
    }
    const { team, region, weeknr, responseintime, nrchats } = this.state;
    const percentage = (nrchats === 0 ? 100 : (100 * responseintime) / nrchats).toFixed(1);
    return (
      <div>
        <CardSection style={{ fontSize: '36px', fontFamily: 'Oswald' }}>
          Add Chat Result
        </CardSection>
        <form>
          <CardSection>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-readonly">Team</InputLabel>
              <Select
                id="team"
                name="team"
                onChange={this.handleChange}
                style={{ flex: 2 }}
                value={team}
              >
                {teams.map(team => (
                  <MenuItem key={team.key} value={team.key}>
                    {team.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-readonly">region</InputLabel>
              <Select
                id="region"
                name="region"
                style={{ flex: 2 }}
                onChange={this.handleChange}
                value={region}
              >
                {regions.map(region => (
                  <MenuItem key={region.key} value={region.key}>
                    {region.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-readonly">weeknr</InputLabel>
              <Select name="weeknr" id="weeknr" onChange={this.handleChange} value={weeknr}>
                {ranges.map(range => (
                  <MenuItem key={range.Name} value={range.Name} primaryText={range.Name}>
                    {range.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardSection>
          <CardSection>
            <TextField name="fromDate" disabled={true} type="text" />
          </CardSection>

          <CardSection id="inputboxes">
            <TextField
              className={classes.TextFieldStyle}
              name="nrchats"
              label="Number of chats"
              type="number"
              width={2}
              onChange={this.handleChange}
              value={nrchats}
            />
            <TextField
              className={classes.TextFieldStyle}
              name="responseintime"
              label="Responded in time"
              type="number"
              onChange={this.handleChange}
              value={responseintime}
            />
            <TextField
              className={classes.TextFieldStyle}
              name="percentage"
              label="Responded in time"
              type="text"
              value={percentage}
            />
          </CardSection>
          <CardSection>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              label="Submit"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onCancel}
              type="reset"
            >
              Cancel
            </Button>
          </CardSection>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ChatAdd);
