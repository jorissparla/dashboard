import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { useQuery } from 'react-apollo-hooks';
import { QUERY_BACKLOG, QUERY_LAST_UPDATED } from '../stats/queries/BACKLOG_QUERY2a';
import Spinner from 'utils/spinner';
import { SelectionForm } from './../stats/SelectionForm';
import { styles } from './StatsMain';
import { useUser } from 'User';

interface Props {}

export const StatsPage: React.FC<Props> = () => {
  const { loading, data } = useQuery(QUERY_LAST_UPDATED);
  const [text, setText] = React.useState('');
  if (loading) {
    return <Spinner loadingMessage="fetching most recent updates" />;
  }
  console.log(data);
  let mostRecentUpdate: string = '';

  if (data) {
    ({ mostRecentUpdate } = data);
  }
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <MyPage mostRecentUpdate={mostRecentUpdate} />
    </div>
  );
};

const DataPage: React.FC<{ mostRecentUpdate: string; classes: any }> = ({
  mostRecentUpdate,
  classes
}) => {
  console.log('render');
  const products = ['LN', 'PLM', 'Protean', 'InforOS'];
  const [text, setText] = React.useState('');
  const { loading, data } = useQuery(QUERY_BACKLOG, { variables: { products } });
  const user = useUser();
  const owner = user && user.fullname ? user.fullname : '';
  if (loading) {
    return <Spinner loadingMessage="fetching Data..." />;
  }

  console.log(user);
  let result =
    data &&
    data.all.filter(
      (item: { owner: { toUpperCase: () => string } }) =>
        item.owner.toUpperCase() === text.toUpperCase()
    );
  console.log(result);
  return (
    <div>
      <SelectionForm
        onNavigateToParams={() => null}
        initialValue={{
          isCloud: false,
          owner: owner,
          actionNeeded: false,
          lastUpdated: mostRecentUpdate
        }}
        isValidSuperUser={true}
        valuesChanged={() => null}
        classes={classes}
      />
      <input value={text} onChange={e => setText(e.target.value)} placeholder="filter " />
      <div>Data</div>
    </div>
  );
};

const MyPage = React.memo(withStyles(styles)(DataPage));
