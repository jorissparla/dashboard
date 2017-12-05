import React from "react";
//import DatePicker from 'redux-form-material-ui';
import DatePicker from "material-ui/DatePicker";

const styles = {
  inputStyle: {
    color: "#000",
    paddingLeft: "10px",
    fontSize: "18px",
    flex: 1
  }
};

const MyDatePicker = ({ input, label, ...custom }) => {
  return (
    <DatePicker
      onChange={(e, val) => {
        return input.onChange(val);
      }}
      value={input.value !== "" ? new Date(input.value) : null}
      {...custom}
      selected={input.value}
      hintText={label}
      style={styles.inputStyle}
      container="inline"
      mode="landscape"
    />
  );
};

export { MyDatePicker };
