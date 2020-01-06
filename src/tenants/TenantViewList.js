import {
  Avatar,
  Backdrop,
  Grid,
  Modal,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import { usePersistentState } from 'hooks';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Spinner from 'utils/spinner';
import { FilterFieldContext } from '../globalState/FilterContext';
import { DashBoardContext } from '../globalState/Provider';
import Loader from '../utils/Loader';
import EditTenantDetails from './details/components/EditTenant';
import { TenantChecked } from './TenantChecked';
import { ALL_TENANTS, QUERY_ALL_TENANT_DETAILS } from './TenantQueries';
import { Main } from './TenantStyledElements';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90vw',
    margin: '10px',
    backgroundColor: theme.palette.background.paper
  },
  live: {
    background: 'rgb(46, 202, 19)',
    border: '5px solid rgba(46, 202, 19, 1)'
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },
  watch: {
    background: 'rgb(251, 221, 0) !important',
    border: '10px solid rgb(251, 221, 0) !important'
  },
  alert: {
    background: 'rgb(229, 57, 53) !important',
    border: '10px solid rgb(229, 57, 53) !important'
  },

  tableheader: {
    fontFamily: 'Poppins',
    fontSize: 18,
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: 'white'
  },
  tablecell: {
    fontSize: '1rem'
  },
  tableheadernarrow: {
    fontFamily: 'Poppins',
    fontSize: 18,
    width: 20
  },

  main: {
    display: 'flex'
  },
  spaceFooter: {
    justifyContent: 'space-between'
  },
  csm: {
    maxWidth: 120
  },
  oldVersion: {
    color: 'red;',
    fontWeight: 600,
    fontFamily: 'Poppins',
    fontSize: '1rem'
  },
  newerVersion: {
    fontFamily: 'Poppins',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.12)',
      cursor: 'pointer'
    }
  }
}));

const filterTenantsByCustomerFarmVersion = (tenants, fields, details, sortField = 'customer') => {
  let filteredCustomerNames = null;

  if (details) {
    filteredCustomerNames = details;
  }
  console.log({ filteredCustomerNames });

  let retValue = _.chain(tenants).filter(o => o.customer.name !== 'Infor');

  if (sortField === 'customer') {
    retValue = _.chain(tenants)
      .filter(o => o.customer.name !== 'Infor')
      .sortBy(o => o.customer.name)
      .value();
  } else {
    retValue = _.chain(tenants)
      .filter(o => o.customer.name !== 'Infor')
      .sortBy(o => o.csm);
  }

  if (details) {
    return retValue.filter(t =>
      filteredCustomerNames.find(cn => cn.customer.name === t.customer.name)
    );
  } else return retValue;
};

const TableHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: theme.palette.common.white,
    // fontSize: '1rem',
    // fontWeight: 800,
    textTransform: 'uppercase'
  },
  body: {
    fontSize: '1rem'
  }
}))(TableCell);

const TenantViewList = props => {
  const dbctx = React.useContext(DashBoardContext);
  let role = dbctx && dbctx.role ? dbctx.role : 'Guest';
  // const { setFields, fields } = useContext(FilterFieldContext);

  const [showNotReady, setShowNotReady] = usePersistentState('not ready', false);
  const [sortedByCSM, setSortedByCSM] = usePersistentState('sort by csm', false);
  const classes = useStyles();
  const [currentId, setCurrentId] = useState('');
  // const [showFilterDialog, toggleShowFilterDialog] = useState(false);
  const [isShowingDetails, toggleShowDetails] = useState(false);

  // const { data, loading } = useQuery(ALL_TENANTS);
  const { data: details, loading: detailsloading } = useQuery(QUERY_ALL_TENANT_DETAILS);

  if (detailsloading) {
    return <Spinner />;
  }

  // if (loading || detailsloading) {
  //   return <Loader loading={loading} />;
  // }
  // const { tenants, updatestatus, tenantlogs } = data;
  const { tenantcustomerdetails } = details;
  // let fields = null;
  // let filteredTenants = filterTenantsByCustomerFarmVersion(
  //   tenants,
  //   fields,
  //   details.tenantcustomerdetails,
  //   sortedByCSM ? 'csm' : 'customer'
  // );
  let allCustomers;
  if (!sortedByCSM) {
    allCustomers = _.chain(tenantcustomerdetails)
      .filter(o => o.customer.name !== 'Infor')
      .sortBy(o => o.customer.name)
      .value();
  } else {
    allCustomers = _.chain(tenantcustomerdetails)
      .filter(o => o.customer.name !== 'Infor')
      .sortBy(o => o.csm)
      .value();
  }

  let filteredCustomers = [];
  allCustomers.map(o => {
    const found = filteredCustomers.find(n => n.customerid === o.customerid);
    console.log({ found });
    if (!found) {
      filteredCustomers.push(o);
    }
  });
  console.log('filterTenants', filteredCustomers);

  const doChange = async () => {
    setShowNotReady(!showNotReady);
  };
  const doChangeSort = async () => {
    setSortedByCSM(!sortedByCSM);
  };
  // console.log(uniqueCustomers);
  return (
    <div style={{ margin: 5, background: '#ddd' }}>
      <Main
        onKeyDown={e => {
          // console.log(e, e.keyCode);
        }}
      >
        <Loader loading={detailsloading} />
        <div>
          <Paper style={{ marginBottom: 10, padding: 20 }}>
            <Grid container>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch value={showNotReady} checked={showNotReady} onChange={doChange} />
                  }
                  label={`${
                    showNotReady
                      ? 'Uncheck to show all customers'
                      : 'Check to show all customers that are not ready'
                  }`}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch value={sortedByCSM} checked={sortedByCSM} onChange={doChangeSort} />
                  }
                  label={`${
                    sortedByCSM ? 'Uncheck to sort by customer name' : 'Check to sort by CSM'
                  }`}
                />
              </Grid>
            </Grid>
          </Paper>
          <div className={classes.flex}>
            <Table style={{ fontSize: '1rem', background: '#fff' }}>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Ready</TableHeaderCell>

                  <TableHeaderCell className={classes.tableheader}>Customer</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader} style={{ width: 100 }}>
                    Farm
                  </TableHeaderCell>

                  <TableHeaderCell className={classes.tableheader} style={{ width: 100 }}>
                    PRD
                  </TableHeaderCell>
                  <TableHeaderCell>TRN</TableHeaderCell>
                  <TableHeaderCell>TST</TableHeaderCell>
                  <TableHeaderCell>DEV</TableHeaderCell>
                  <TableHeaderCell>DEM</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader}>PM</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader}>CSM</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader}>Comments</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((currCustomer, index) => {
                  const sub = currCustomer.tenants;
                  const ar = { PRD: '', TRN: '', TST: '', DEV: '', DEM: '' };
                  sub.map(tenantInstance => {
                    const type = tenantInstance.name.split('_')[1];
                    ar[type] = tenantInstance.version;
                  });
                  const live = sub[0].live === 1 ? true : false;
                  const customerid = currCustomer.customerid;
                  const farm = sub[0].farm;
                  const customer = currCustomer.customer.name;
                  const updated = currCustomer.updated;
                  if (showNotReady && updated === 1) return <div />;
                  // console.log(customer, updated);
                  const temp = currCustomer.temperature;
                  const avaclass = classNames({
                    [classes.alert]: temp === 'ALERT' ? true : false,
                    [classes.watch]: temp === 'WATCH' ? true : false,
                    [classes.live]: live,
                    [classes.notlive]: !live
                  });

                  let isTen6 = ar['PRD'].indexOf('10.6') >= 0;
                  const posOfCEVersion = ar['PRD'].indexOf('2019.');
                  if (posOfCEVersion >= 0) {
                    isTen6 = isTen6 || ar['PRD'].slice(posOfCEVersion) < '2019.11';
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell
                        onClick={() =>
                          window.open(
                            'http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=' +
                              customerid
                          )
                        }
                        className={classes.newerVersion}
                      >
                        {customerid}
                      </TableCell>
                      <TableCell>
                        <Avatar className={avaclass} alt="Author" title={temp}>
                          {live ? 'Live' : ''}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <TenantChecked id={customerid} value={updated === 1}></TenantChecked>
                      </TableCell>
                      <TableCell className={classes.tablecell}>{customer}</TableCell>
                      <TableCell className={classes.tablecell}>{farm}</TableCell>
                      {isTen6 ? (
                        <TableCell className={classes.oldVersion}>{ar['PRD']}</TableCell>
                      ) : (
                        <TableCell className={classes.newerVersion}>{ar['PRD']}</TableCell>
                      )}
                      <TableCell>{ar['TRN']}</TableCell>
                      <TableCell>{ar['TST']}</TableCell>
                      <TableCell>{ar['DEV']}</TableCell>
                      <TableCell>{ar['DEM']}</TableCell>
                      <TableCell className={classes.tablecell}>{currCustomer.pm}</TableCell>
                      <TableCell className={classes.tablecell}>{currCustomer.csm}</TableCell>
                      <TableCell className={classes.tablecell}>{currCustomer.comments}</TableCell>
                      <TableCell>
                        {' '}
                        <MoreVertIcon
                          onClick={() => {
                            setCurrentId(customerid);
                            toggleShowDetails(true);
                          }}
                        ></MoreVertIcon>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow:
              '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
          }}
        >
          {/* <SearchBar onChange={e => setSearchText(e)} /> */}
        </div>

        <Modal
          onClose={() => toggleShowDetails(false)}
          open={isShowingDetails}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <EditTenantDetails
            profile={tenantcustomerdetails.find(d => d.customerid === currentId)}
            onClose={() => toggleShowDetails(false)}
          />
        </Modal>
      </Main>
    </div>
  );
};

export default TenantViewList;
