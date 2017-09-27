import React from "react";
import { TextField } from "redux-form-material-ui";

const styles = {
  inputStyle: {
    color: "#000",
    paddingLeft: "10px",
    fontSize: "18px",
    flex: 1,
    marginRight: "10px"
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  }
};

const Input = ({ label, value, onChangeText, secureTextEntry, style, name, ...rest }) => {
  const { inputStyle } = styles;
  const mergedStyle = { ...inputStyle, ...style };
  return (
    <TextField
      hintText={label}
      floatingLabelText={label}
      autoCorrect={false}
      //onChangeText={ onChangeText}
      inputStyle={mergedStyle}
      name={name}
      underlineShow={false}
      // underlineStyle={{ borderColor: "#039BE5" }}
      floatingLabelFixed={true}
      floatingLabelStyle={{ fontSize: "15px", marginLeft: "5px" }}
      {...rest}
    />
  );
};

export { Input };
