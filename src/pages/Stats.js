import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { SelectionContext } from '../globalState/SelectionContext';
import { BacklogTable } from '../stats/BacklogTable';
import { ListFavoritePersons } from '../stats/FavoritesPersons';
import { QUERY_BACKLOG } from '../stats/queries/BACKLOG_QUERY2';
import { format } from '../utils/format';
import Spinner from '../utils/spinner';
import { useLocalStorage } from '../utils/useLocalStorage';
import { UserContext } from './../globalState/UserProvider';
import { useParams, StatsMain, styles } from './StatsMain';
import { SelectionForm } from '../stats/NewSelectionForm';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { usePersistentState } from 'hooks';
import NiceSpinner from './../utils/NiceSpinner';
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    top: '200px',
    backgroundColor: 'rgba(0,0,0,0.1)'
  }),
  tableheader: {
    fontFamily: 'Poppins',
    fontSize: 18,
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: 'white'
  },
  tableheadernarrow: {
    fontFamily: 'Poppins',
    fontSize: 18,
    width: 20
  },
  narrow: {
    width: 20
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 15,
    padding: 10
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textfield: {
    verticalAlign: 'center',
    margin: 10
  },
  button: {
    margin: 10
  },
  spaceapart: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10
  },
  number: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 18,
    margin: 2,
    width: 40,
    height: 40,
    borderRadius: '50%'
  },
  row: {
    fontFamily: 'Poppins',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
export const PRODUCT_LIST = ['LN', 'PLM', 'Protean', 'InforOS', 'Xpert', 'Swan', 'AutoConnect'];
export const REGION_LIST = ['APJ', 'EMEA', 'NA'];

const Stats = props => {
  const { user } = React.useContext(UserContext);
  const [date] = useState(format(Date.now(), 'yyyy-MM-dd'));
  const classes = useStyles();
  console.log('rendering data');

  const isValidSuperUser = ['Admin', 'PO'].some(u => (user ? u === user.role : false));
  const { loading, data } = useQuery(QUERY_BACKLOG, {
    variables: {
      date,
      owner: '',
      products: PRODUCT_LIST,
      deployment: 'ALL',
      ...useParams(!isValidSuperUser)
    }
  });

  if (loading) return <NiceSpinner />;
  console.log('🤷‍♂️🤷‍♂️', user);
  const owner = user ? (user.fullname ? user.fullname : '') : '';
  return (
    <StatsPage data={data} classes={classes} isValidSuperUser={isValidSuperUser} owner={owner} />
  );
};

const StatsPage = withRouter(({ data, classes, owner, isValidSuperUser, history }) => {
  const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
  const [selectedProducts] = usePersistentState('selectedproducts', ['LN']);
  const [filterValues, setFilterValues] = useState({ owner, products: selectedProducts });
  function handleChange(values) {
    setFilterValues(values);
  }
  return (
    <div>
      <SelectionForm
        classes={classes}
        isValidSuperUser={isValidSuperUser}
        onChange={handleChange}
        onNavigateToParams={() => history.push('/myworkparams')}
        initialValue={{ owner, lastUpdated: mostRecentUpdate, actionNeeded: true }}
      />

      <StatsMain data={data} classes={classes} owner={owner} filterValues={filterValues} />
    </div>
  );
});

export default Stats;
