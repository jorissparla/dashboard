import gql from "graphql-tag";
import React from "react";
import { Query, Mutation } from "@apollo/client/react/components";

const QUERY_PLANNEDCOURSE_WITHPARTICIPANTS_1 = gql`
  query QUERY_PLANNEDCOURSE_WITHPARTICIPANTS_1($id: ID) {
    plannedcourse(id: $id) {
      id
      course {
        id
        title
      }
      status
      students {
        fullname
        navid
      }
    }
    supportfolks {
      id
      fullname
    }
  }
`;

class DownshiftMultiple extends React.Component {
  state = {
    inputValue: "",
    selectedItem: [],
  };

  handleKeyDown = (event) => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === "backspace") {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = (item) => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: "",
      selectedItem,
    });
  };

  handleDelete = (item) => () => {
    this.setState((state) => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Query query={QUERY_PLANNEDCOURSE_WITHPARTICIPANTS_1} variables={{ id: this.props.id || "611E0A88-8690-4102-A629-F7E3B28874A3" }}>
        {({ data, loading, error }) => {
          if (loading) {
            return "Loading";
          }
          if (!data) {
            return "No data";
          }
          const { plannedcourse, supportfolks } = data;
          console.log(this.props.id, plannedcourse.students.map(({ fullname }) => fullname).join(";"));
          const suggestions = supportfolks;
          const participants = plannedcourse ? plannedcourse.students.map(({ fullname }) => fullname).join(";") : "";
          return (
            <Downshift id="downshift-multiple" inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItem}>
              {({ getInputProps, getItemProps, isOpen, inputValue: inputValue2, selectedItem: selectedItem2, highlightedIndex }) => (
                <div className={classes.container}>
                  {renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                      startAdornment: selectedItem.map((item) => (
                        <Chip key={item} tabIndex={-1} label={item} className={classes.chip} onDelete={this.handleDelete(item)} />
                      )),
                      onChange: this.handleInputChange,
                      onKeyDown: this.handleKeyDown,
                      placeholder: "Select multiple countries",
                    }),
                    label: "Label",
                  })}
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue2).map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem: selectedItem2,
                        })
                      )}
                    </Paper>
                  ) : null}
                </div>
              )}
            </Downshift>
          );
        }}
      </Query>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
};
