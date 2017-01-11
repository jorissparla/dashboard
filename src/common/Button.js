import React from 'react';

const Button = ({children, onPress}) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <div style={buttonStyle} onClick={onPress}>
        <p style={textStyle}>{children}</p>
    </div>

  )
}

const styles = {
  buttonStyle : {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: '5px',
    borderWidth: '2px',
    borderColor: '#007aff',
    borderStyle: 'solid',
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    justifyContent: 'center',
    height: '40px'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
}

exports.Button = Button;