import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FontIcon from '@material-ui/core/Icon';
import ActionSearch from '@material-ui/icons/Search';

export default ({
  onChange,
  hintText = 'Search..',
  defaultValue = '',
  searchOnEnter = false,
  style = { display: 'flex', marginBottom: 10, alignItems: 'center' },
  shade = true
}) => {
  const [val, setVal] = useState(defaultValue || '');
  return (
    <Paper style={style}>
      <FontIcon style={{ margin: '10px' }}>
        <ActionSearch />
      </FontIcon>
      {searchOnEnter ? (
        <TextField
          label={hintText}
          placeholder={hintText}
          value={val}
          onChange={({ target: { value } }) => setVal(value)}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              onChange(val);
            }
          }}
          fullWidth={true}
          style={{ color: 'black', padding: 1, marginBottom: 10 }}
        />
      ) : (
        <TextField
          label={hintText}
          defaultValue={defaultValue}
          placeholder={hintText}
          onChange={e => onChange(e.target.value)}
          fullWidth={true}
          style={{ color: 'black', padding: 1, marginBottom: 10 }}
        />
      )}
    </Paper>
  );
};
