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
  onNavigateToParams
}) => {
  const selectionContext = useContext(SelectionContext);
  const {
    setOwner,
    isCloud,
    setisCloud,

    actionNeeded,
    setActionNeeded,
    products,
    setProducts
  } = selectionContext;
  setOwner(initialValue.owner);
  const [ownerVal, setOwnerVal] = useState(initialValue.owner);
  const [criteriaChange, setCriteriaChange] = React.useState(false);
  const [allOwners, toggleAllOwners] = React.useState(false);
  console.log(products);
  function toggleSet(value: string) {
    console.log(products.indexOf(value));
    if (products.indexOf(value) >= 0) {
      console.log(products.indexOf(value));
      setProducts(products.filter((prod: string) => prod !== value));
    } else {
      setProducts(products.concat(value));
    }
  }

  function getValue(value: string) {
    return products.indexOf(value) >= 0;
  }
  return (
    <Paper className={classes.paper2}>
      <FormLabel>Cloud</FormLabel>
      <Switch
        checked={isCloud}
        onChange={e => {
          setisCloud(!isCloud);
          setCriteriaChange(true);
        }}
        value={isCloud}
        color="primary"
      />
      <TextField
        value={ownerVal}
        disabled={!isValidSuperUser}
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
      </FormGroup>

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
