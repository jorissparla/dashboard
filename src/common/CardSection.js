import React from 'react';

const styles = {
  containerStyle: {
    borderBottomWidth: '1px',
    padding: '5px',
    backgroundColor: '#fff',
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    marginTop: '5px',
    alignItems: 'space-between'
  }
};

const CardSection = (props) => {
  const cardSectionStyle = {...styles.containerStyle, ...props.style}
  return (
    <div style={cardSectionStyle}>
      {props.children}
    </div>
  );
};



export { CardSection };