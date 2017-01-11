import React, {Component} from 'react'
import  {TextField} from 'redux-form-material-ui'

const Input = ({ label, value, onChangeText, secureTextEntry, style, ...rest }) => {
  const { containerStyle, inputStyle, labelStyle } = styles
  const mergedStyle = {...inputStyle, ...style }
  
  return (
      <TextField 
        hintText={label}
        floatingLabelText={label}
        autoCorrect={false}
        //onChangeText={ onChangeText}
        inputStyle={mergedStyle}
        value={value}
        name={name}
        underlineShow={false}
        floatingLabelFixed={true}
        floatingLabelStyle={{ fontSize: '15px', marginLeft: '5px'}}
        {...rest}
        />
  )
} 

const styles = {
  inputStyle: {
    color: '#000',
    paddingLeft: '10px',
    fontSize: '18px',
    flex: 1
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export { Input };
