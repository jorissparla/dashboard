import React from 'react';

const CardSection = (props) => {
  const cardSectionStyle = {...styles.containerStyle, ...props.style}
  return (
    <div style={cardSectionStyle}>
      {props.children}
    </div>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: '1px',
    padding: '5px',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: '5px',
    display: 'flex',
    flex: 1,
    marginTop: '5px',
  }
};

export { CardSection };