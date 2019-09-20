import React, { useContext, useState } from 'react';
import {
  Paper,
  TextField,
  Switch,
  FormLabel,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox
} from '@material-ui/core';
import { SelectionContext } from '../globalState/SelectionContext';

interface SelectionProps {
  classes: any;
  valuesChanged: any;
  isValidSuperUser: boolean;
  isXpertOrSwan: boolean;
  onNavigateToParams: () => void;

  initialValue: {
    isCloud: boolean;
    owner: string;
    lastUpdated: string;
    actionNeeded: boolean;
  };
}
export const SelectionForm: React.FunctionComponent<SelectionProps> = ({
  classes,
  initialValue,
  valuesChanged,
  isValidSuperUser,
  isXpertOrSwan,
  onNavigateToParams
}) => {
  const selectionContext = useContext(SelectionContext);
  const {
    setOwner,
    isCloud,
    //    setisCloud,
    owner,
    actionNeeded,
    setActionNeeded,
    products,
    setProducts,
    setPersons,
    persons
  } = selectionContext;
  const [ownerVal, setOwnerVal] = useState('');
  const [criteriaChange, setCriteriaChange] = React.useState(false);
  const [allOwners, toggleAllOwners] = React.useState(false);
  const [newData, setnewData] = React.useState(false);

  const doAddPersonToLocalStorage = (newPerson: string) => {
    const item = window.localStorage.getItem('persons');
    let persons: any = [];
    if (!item || item.length === 0) {
      persons = [];
    } else {
      persons = JSON.parse(item);
      console.log('do', item, persons, typeof persons);
    }
    persons = persons
      .filter((person: any) => newPerson !== person.name)
      .concat({ name: newPerson });

    window.localStorage.setItem('persons', JSON.stringify(persons));
    setPersons(persons);
    return persons;
  };

  function toggleSet(value: string) {
    if (products.indexOf(value) >= 0) {
      setProducts(products.filter((prod: string) => prod !== value));
    } else {
      setProducts(products.concat(value));
    }
  }

  React.useEffect(() => {
    setOwner(initialValue.owner);
    console.log('Load', owner, initialValue);
    setOwnerVal(initialValue.owner);
  }, []);

  React.useEffect(() => {
    console.log('ownerChange', owner);
    setOwnerVal(owner);
    setCriteriaChange(true);
  }, [owner]);

  React.useEffect(() => {
    console.log('timer set');
    const timer = setTimeout(() => {
      console.log('expired');
      setnewData(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  function getValue(value: string) {
    return products.indexOf(value) >= 0;
  }
  return (
    <Paper className={classes.paper2}>
      {/* <FormLabel>Cloud</FormLabel>
      <Switch
        checked={isCloud}
        onChange={e => {
          setisCloud(!isCloud);
          setCriteriaChange(true);
        }}
        value={isCloud}
        color="primary"
      /> */}
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
          setCriteriaChange(true);
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
            setCriteriaChange(true);
          }}
          value={allOwners}
          color="primary"
        />
      )}
      <Button
        color="primary"
        className="button"
        disabled={!criteriaChange}
        variant="contained"
        onClick={() => {
          valuesChanged(ownerVal, isCloud);
          setCriteriaChange(false);
        }}
      >
        Search
      </Button>
      <FormLabel> Only Actions Needed</FormLabel>
      <Switch
        checked={actionNeeded}
        onChange={e => {
          setActionNeeded(!actionNeeded);
          setCriteriaChange(true);
        }}
        value={actionNeeded}
        color="secondary"
      />
      <FormGroup row style={{ marginLeft: 50, border: '1px solid #ccc', padding: 5 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={getValue('LN')}
              onChange={() => toggleSet('LN')}
              value="LN"
              color="primary"
            />
          }
          label="LN"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={getValue('PLM')}
              onChange={() => toggleSet('PLM')}
              value="PLM"
              color="secondary"
            />
          }
          label="PLM"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={getValue('Protean')}
              onChange={() => toggleSet('Protean')}
              value="Protean"
              color="secondary"
            />
          }
          label="Protean"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={getValue('InforOS')}
              onChange={() => toggleSet('InforOS')}
              value="InforOS"
              color="secondary"
            />
          }
          label="InforOS"
        />
        {isXpertOrSwan && (
          <FormControlLabel
            control={
              <Checkbox
                checked={getValue('Xpert')}
                onChange={() => toggleSet('Xpert')}
                value="Xpert"
                color="secondary"
              />
            }
            label="Xpert"
          />
        )}
        {isXpertOrSwan && (
          <FormControlLabel
            control={
              <Checkbox
                checked={getValue('Swan')}
                onChange={() => toggleSet('Swan')}
                value="Swan"
                color="secondary"
              />
            }
            label="Swan"
          />
        )}
      </FormGroup>

      <div style={{ position: 'relative', right: '-40px' }}>
        {' '}
        last Updated: {initialValue.lastUpdated}
        {newData && '...new data available'}
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
