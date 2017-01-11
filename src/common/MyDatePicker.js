import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const MyDatePicker = ({ input, label, meta: { touched, error }, ...custom }) => {
    return (
        <DatePicker
         onChange={(e, val) => {return input.onChange(val)}}
          {...custom}
          value={input.value}
          selected={input.value}
          hintText={label}
          style={styles.inputStyle}
          container="inline" 
          mode="landscape"
        />
);
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingLeft: '10px',
    fontSize: '18px',
    flex: 1
    }
}
export  { MyDatePicker };
