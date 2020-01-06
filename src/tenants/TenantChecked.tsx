import Checkbox from '@material-ui/core/Checkbox';
import { green, red } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import React from 'react';
import { useMutation } from 'react-apollo';
import { MUTATION_UPDATE_DETAIL } from './TenantQueries';

type Props = {
  id: string;
  value: boolean;
};

export const TenantChecked: React.FC<Props> = ({ id, value }) => {
  const [checked, setChecked] = React.useState(value);
  const [updateDetails] = useMutation(MUTATION_UPDATE_DETAIL);
  // console.log({ id, value, checked });
  const doChange = async () => {
    await updateDetails({ variables: { input: { customerid: id, updated: checked ? 0 : 1 } } });
    setChecked(!checked);
    console.log(id, checked);
  };
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            icon={<ErrorOutline style={{ color: red[500] }} />}
            checkedIcon={<CheckCircle style={{ color: green[500] }} />}
            value={checked}
            checked={checked}
            onChange={doChange}
          />
        }
        label={`${checked ? 'Ready' : 'Not ready'}`}
      />
    </div>
  );
};
