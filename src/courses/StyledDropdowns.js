import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import keycode from "keycode";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  fieldname = "label",
  idfieldname = "id",
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion[fieldname]) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion[idfieldname]}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion[fieldname]}
    </MenuItem>
  );
}

function getSuggestions(value, fieldname, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 10 && suggestion[fieldname].slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

class DownShiftSingle extends React.Component {
  static defaultProps = {
    label: "Label",
    placeholder: "Select ",
    fieldname: "fieldname",
    idfieldname: "id"
  };

  handleInputChange = event => {
    const { setState, state } = this.props;
    setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    const { setState, state } = this.props;

    setState({
      inputValue: "",
      selectedItem: item
    });
    this.props.onChange(item);
  };
  render() {
    const { classes, suggestions, state, label, placeholder, fieldname, idfieldname } = this.props;
    const { selectedItem } = state;
    return (
      <div className={classes.root}>
        <Downshift id="downshift-simple" onChange={this.handleChange} selectedItem={selectedItem}>
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            isOpen
          }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder: placeholder,
                  onChange: this.handleInputChange
                }),
                label: label
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue2, fieldname, suggestions).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        fieldname,
                        idfieldname,
                        index,
                        itemProps: getItemProps({ item: suggestion[fieldname] }),
                        highlightedIndex,
                        selectedItem: selectedItem2
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

DownShiftSingle.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired
};

class DownshiftMultiple extends React.Component {
  static defaultProps = {
    label: "Students",
    placeholder: "Select Multiple Students",
    fieldname: "fullname",
    idfieldname: "id"
  };

  handleKeyDown = event => {
    const { setState, state } = this.props;
    const { inputValue, selectedItem } = state;
    if (selectedItem.length && !inputValue.length && keycode(event) === "backspace") {
      setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleInputChange = event => {
    const { setState, state } = this.props;
    setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    const { setState, state } = this.props;
    let { selectedItem } = state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    setState({
      inputValue: "",
      selectedItem
    });
    this.props.onChange(selectedItem.join(";"));
  };

  handleDelete = item => () => {
    const { setState } = this.props;
    setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes, label, placeholder, state, suggestions, fieldname, idfieldname } = this.props;
    const { inputValue, selectedItem } = state;

    return (
      <div>
        <Downshift
          id="downshift-multiple"
          inputValue={inputValue}
          onChange={this.handleChange}
          selectedItem={selectedItem}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex
          }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  )),
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: placeholder
                }),
                label: label
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue2, fieldname, suggestions).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      fieldname,
                      idfieldname,
                      index,
                      itemProps: getItemProps({ item: suggestion[fieldname] }),
                      highlightedIndex,
                      selectedItem: selectedItem2
                    })
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default class SelectDropDown extends React.Component {
  handleChange = ({ target: { name, value } }) => {
    this.props.setState({ selectedItem: value });
    this.props.onChange(value);
    console.log(value);
  };
  render() {
    const {
      classes,
      suggestions,
      state,
      label,
      placeholder,
      fieldname,
      idfieldname = "id"
    } = this.props;
    return (
      <React.Fragment>
        <InputLabel shrink htmlFor="age-label-placeholder">
          {label}
        </InputLabel>
        <Select
          id={fieldname}
          name={fieldname}
          placeholder={placeholder}
          onChange={this.handleChange}
          style={{ flex: 2 }}
          value={state.selectedItem}
        >
          {suggestions.map(ctype => (
            <MenuItem key={ctype[idfieldname]} value={ctype[fieldname]}>
              {ctype[fieldname]}
            </MenuItem>
          ))}
        </Select>
      </React.Fragment>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10
  },
  button: {
    margin: theme.spacing.unit,
    width: 150,
    marginRight: 50
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "relative",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  paper2: {
    padding: 10,
    margin: 10
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const StyledMultiple = withStyles(styles)(DownshiftMultiple);
const StyledSimple = withStyles(styles)(DownShiftSingle);
const StyledSelect = withStyles(styles)(SelectDropDown);
export { StyledMultiple, StyledSimple, StyledSelect };
