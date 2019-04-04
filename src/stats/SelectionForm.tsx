import React, { useContext, useState } from 'react';
import { Paper, TextField, Switch, FormLabel, Button } from '@material-ui/core';
import { SelectionContext } from './SelectionContext';
interface SelectionProps {
  classes: any;
  valuesChanged: any;
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
  valuesChanged
}) => {
  const selectionContext = useContext(SelectionContext);
  const {
    setOwner,
    isCloud,
    setisCloud,

    actionNeeded,
    setActionNeeded
  } = selectionContext;
  setOwner(initialValue.owner);
  const [ownerVal, setOwnerVal] = useState(initialValue.owner);
  const [criteriaChange, setCriteriaChange] = React.useState(false);
  const [allOwners, toggleAllOwners] = React.useState(false);
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
      <FormLabel>Clear Owner / All Owners</FormLabel>
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
      <div style={{ position: 'relative', right: '-40px' }}>
        {' '}
        last Updated: {initialValue.lastUpdated}
      </div>
    </Paper>
  );
};
