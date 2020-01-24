import React, { useContext, useState } from 'react';
import { usePersistentState } from 'hooks';
import {
  Paper,
  TextField,
  Switch,
  FormLabel,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { PRODUCT_LIST, REGION_LIST } from 'pages/Stats';

export const SelectionForm = ({
  classes,
  initialValue,
  valuesChanged,
  isValidSuperUser,
  onChange,
  onNavigateToParams
}) => {
  const [selectedProducts, setSelectedProducts] = usePersistentState('selectedproducts', ['LN']);
  const [ownerVal, setOwnerVal] = useState(initialValue.owner);
  const [region, setRegion] = usePersistentState('region', 'EMEA');
  const [actionNeeded, setActionNeeded] = useState(false);
  const [allOwners, toggleAllOwners] = React.useState(false);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const doAddPersonToLocalStorage = newPerson => {
    const item = window.localStorage.getItem('persons');
    let persons = [];
    if (!item || item.length === 0) {
      persons = [];
    } else {
      persons = JSON.parse(item);
      console.log('do', item, persons, typeof persons);
    }
    persons = persons.filter(person => newPerson !== person.name).concat({ name: newPerson });

    window.localStorage.setItem('persons', JSON.stringify(persons));
    // setPersons(persons);
    return persons;
  };

  function toggleSet(value) {
    console.log('toggle selectedProducts', selectedProducts, value);
    if (selectedProducts.indexOf(value) >= 0) {
      setSelectedProducts(selectedProducts.filter(prod => prod !== value));
    } else {
      setSelectedProducts(selectedProducts.concat(value));
    }
  }

  function getValue(value) {
    return selectedProducts.indexOf(value) >= 0;
  }
  console.log('loading .....', selectedProducts);
  return (
    <Paper className={classes.paper2}>
      <TextField
        value={ownerVal}
        disabled={!isValidSuperUser}
        onMouseDown={e => {
          if (e.nativeEvent.which === 3) {
            doAddPersonToLocalStorage(ownerVal);
          }
        }}
        onChange={event => {
          setOwnerVal(event.target.value);
        }}
        onKeyDown={event => {
          if (event.keyCode === 13) {
            console.log(event.target);
          }
        }}
        placeholder="enter person"
      />
      {isValidSuperUser && <FormLabel>Clear Owner / All Owners</FormLabel>}
      {isValidSuperUser && (
        <Switch
          checked={allOwners}
          onChange={e => {
            if (!allOwners) {
              setOwnerVal('');
            } else {
              setOwnerVal(initialValue.owner);
            }
            toggleAllOwners(!allOwners);
          }}
          value={allOwners}
          color="primary"
        />
      )}
      <Button
        color="primary"
        className="button"
        // disabled={!criteriaChange}
        variant="contained"
        onClick={() => {
          onChange({ owner: ownerVal, products: selectedProducts });
        }}
      >
        Search
      </Button>
      <FormLabel> Only Actions Needed</FormLabel>
      <Switch
        checked={actionNeeded}
        onChange={e => {
          setActionNeeded(!actionNeeded);
        }}
        value={actionNeeded}
        color="secondary"
      />
      <FormGroup row style={{ marginLeft: 20, border: '1px solid #ccc', padding: 5 }}>
        {PRODUCT_LIST.map(product => (
          <FormControlLabel
            key={product}
            control={
              <Checkbox
                checked={getValue(product)}
                onChange={() => toggleSet(product)}
                value={product}
                color="primary"
              />
            }
            label={product}
          />
        ))}
      </FormGroup>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Region
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={region}
          onChange={e => setRegion(e.target.value)}
          labelWidth={labelWidth}
        >
          {REGION_LIST.map(r => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ position: 'relative', right: '-40px' }}>
        {' '}
        last Updated: {initialValue.lastUpdated}
      </div>
      {isValidSuperUser && (
        <Button
          color="secondary"
          variant="contained"
          style={{ marginLeft: 60 }}
          onClick={onNavigateToParams}
        >
          Parameters
        </Button>
      )}
    </Paper>
  );
};
export default SelectionForm;
