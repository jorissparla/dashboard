import React from 'react';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';
const StudentChip = ({ id, fullname, image, handleClick }) => (
  <Chip
    style={{
      margin: 4,
      backgroundColor: '#ededed',
      color: 'black'
    }}
    key={id ? `chip_${id}` : _.uniqueId('chip_')}
    onClick={() => handleClick()}
    label={fullname}
  />
);

export default StudentChip;

export const RegularChip = ({ name, handleClick, handleDelete }) => (
  <Chip
    label={name}
    onDelete={handleDelete}
    onClick={handleClick}
    style={{
      margin: 2
    }}
    color="primary"
  />
);
