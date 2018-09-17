import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import deburr from "lodash/deburr";
import keycode from "keycode";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const ALL_USERS = gql`
  {
    supportfolks {
      fullname
    }
  }
`;

const suggestions = [
  { fullname: "Afghanistan" },
  { fullname: "Aland Islands" },
  { fullname: "Albania" },
  { fullname: "Algeria" },
  { fullname: "American Samoa" },
  { fullname: "Andorra" },
  { fullname: "Angola" },
  { fullname: "Anguilla" },
  { fullname: "Antarctica" },
  { fullname: "Antigua and Barbuda" },
  { fullname: "Argentina" },
  { fullname: "Armenia" },
  { fullname: "Aruba" },
  { fullname: "Australia" },
  { fullname: "Austria" },
  { fullname: "Azerbaijan" },
  { fullname: "Bahamas" },
  { fullname: "Bahrain" },
  { fullname: "Bangladesh" },
  { fullname: "Barbados" },
  { fullname: "Belarus" },
  { fullname: "Belgium" },
  { fullname: "Belize" },
  { fullname: "Benin" },
  { fullname: "Bermuda" },
  { fullname: "Bhutan" },
  { fullname: "Bolivia, Plurinational State of" },
  { fullname: "Bonaire, Sint Eustatius and Saba" },
  { fullname: " and Herzegovina" },
  { fullname: "Botswana" },
  { fullname: "Bouvet Island" },
  { fullname: "Brazil" },
  { fullname: "British Indian Ocean Territory" },
  { fullname: "Brunei Darussalam" }
];

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

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.fullname) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.fullname}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.fullname}
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.fullname.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

class DownshiftMultiple extends React.Component {
  state = {
    inputValue: "",
    selectedItem: []
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === "backspace") {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: "",
      selectedItem
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Query query={ALL_USERS}>
        {({ data, loading }) => {
          if (loading) return "Loading....";
          const suggestions = data.supportfolks;
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
                        placeholder: "Select multiple countries"
                      }),
                      label: "Students"
                    })}
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {getSuggestions(inputValue2, suggestions).map((suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.fullname }),
                            highlightedIndex,
                            selectedItem: selectedItem2
                          })
                        )}
                      </Paper>
                    ) : null}
                  </div>
                )}
              </Downshift>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => alert(JSON.stringify(this.state.selectedItem))}
                type="reset"
              >
                Save{" "}
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
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

class AddPlannedCourseRequest extends React.Component {
  render() {
    return <div />;
  }
}
export default withStyles(styles)(DownshiftMultiple);
