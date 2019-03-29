import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles,
  createStyles
} from '@material-ui/core';

const styles = (theme: any) =>
  createStyles({
    root: {
      width: 300,
      margin: 10
    }
  });

const OWNERS_QUERY = gql`
  query OWNERS_QUERY {
    accounts(teams: ["FIN", "LOG", "TLS"], region: "EMEA") {
      id
      fullname
    }
  }
`;

interface OwnerProps {
  initialValue: string;
  classes: any;
  onChange: Function;
}

export const OwnersContainer: React.FC<OwnerProps> = (props: any) => {
  const { loading, data } = useQuery(OWNERS_QUERY, {
    suspend: false
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!(data && data.accounts)) {
    return <div>Error</div>;
  }
  const owners = data.accounts;
  return (
    <OwnerList
      initialValue={props.initialValue}
      owners={owners}
      classes={props.classes}
      onSelect={(v: string) => {
        console.log('change' + v);

        props.onChange(v);
      }}
    />
  );
};

type Owner = { id: string; fullname: string };
interface Props {
  classes?: any;
  onSelect: Function;
  owners: any;
  initialValue: string;
}

const OwnerList: React.FC<Props> = ({ classes, onSelect, owners }) => {
  const [selected, setSelected] = useState('Michel van Huenen');
  console.log(selected);
  return (
    <FormControl className={classes.root}>
      <InputLabel htmlFor="owner">Support Analyst</InputLabel>
      <Select
        onChange={e => {
          console.log('object');
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
        value={selected}
        id="owner"
        // value={state.age}
        // onChange={this.handleChange}
        inputProps={{
          name: 'owner',
          id: 'owner'
        }}
      >
        {owners.map((owner: any) => (
          <MenuItem value={owner.fullname} key={owner.id}>
            {owner.fullname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(OwnersContainer);
