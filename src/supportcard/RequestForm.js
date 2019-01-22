import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { format } from 'date-fns';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { FlexCol, FlexRow } from '../styles';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, FormControlLabel } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

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
    margin: theme.spacing.unit
  },

  buttonDel: {
    margin: theme.spacing.unit,
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    height: '100%',
    marginBottom: 20
  },
  titleField: {
    fontFamily: 'Didact Gothic',
    fontSize: '40px',
    color: '#039BE5',
    fontWeight: 800
  },
  dense: {
    marginTop: 19
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250
  },
  menu: {
    width: 200
  }
});

class RequestForm extends React.Component {
  componentWillMount() {
    this.setState(this.props.request);
    this.setState({ accounts: this.props.accounts });
    this.setState({ checked: this.props.request.complete === 1 });
  }
  updateCheck = () => {
    this.setState(oldState => {
      return {
        checked: !oldState.checked,
        complete: oldState.checked ? 0 : 1
      };
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleCancel = () => {
    this.props.onCancel();
  };
  render() {
    const assignees = this.props.accounts.map(item => ({ id: item.id, name: item.fullname }));
    const { classes } = this.props;
    console.log(this.props.request.createdAt);
    // const createdAt = format(Date.parse(this.props.request.createdAt || Date.now(), "dddd, DD-MMM-YYYY"));
    return (
      <Formik initialValues={this.props.request} onSubmit={values => this.props.onSave(values)}>
        {({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        }) => {
          return (
            <Paper style={paperStyle}>
              <form width="800px">
                <FlexCol>
                  <Typography variant="h5" gutterBottom>
                    Request
                  </Typography>
                  <FlexRow>
                    <TextField
                      variant="outlined"
                      className={classes.textField}
                      value={values.name}
                      label="name of requester"
                    />
                  </FlexRow>
                  <FlexRow>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows="3"
                      cols="80"
                      width="90%"
                      name="text"
                      placeholder="text"
                      value={values.text}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FlexRow>
                  <FlexRow>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="owner-simple">Assigned</InputLabel>
                      <Select
                        value={values.assigned}
                        onChange={handleChange}
                        inputProps={{
                          name: 'assigned',
                          id: 'assigned-simple'
                        }}
                      >
                        {assignees.map(({ id, name }) => (
                          <MenuItem key={id} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="complete"
                            checked={values.complete}
                            onChange={handleChange}
                            value={values.checked}
                            color="primary"
                          />
                        }
                        label="complete"
                      />
                    </FormControl>
                  </FlexRow>
                  <FlexRow>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      className={classes.button}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleCancel}
                      className={classes.button}
                    >
                      Cancel
                    </Button>
                    <Chip name="createdAt" label={`Created at ${values.createdAt}`} />
                  </FlexRow>
                </FlexCol>
              </form>
            </Paper>
          );
        }}
      </Formik>
    );
  }
}

export default withStyles(styles)(RequestForm);
