import React from "react";
import DatePicker from "material-ui/DatePicker";

export default ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <DatePicker
      onChange={(e, val) => {
        return input.onChange(val);
      }}
      {...custom}
      value={input.value}
      selected={input.value}
      underlineShow={true}
      underlineStyle={{ borderColor: "#039BE5" }}
    />
  );
};
