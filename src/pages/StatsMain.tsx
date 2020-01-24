import { withStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-apollo';
import { SelectionContext } from '../globalState/SelectionContext';
import { BacklogTable } from '../stats/BacklogTable';
import { ListFavoritePersons } from '../stats/FavoritesPersons';
import { QUERY_BACKLOG } from '../stats/queries/BACKLOG_QUERY2';
import { format } from '../utils/format';
import Spinner from '../utils/spinner';

import LoadingDots from './../utils/LoadingDots';
import { useLocalStorage } from '../utils/useLocalStorage';
import { UserContext } from './../globalState/UserProvider';
import { ItemStyle } from 'layout';
const SelectionForm = React.lazy(() => import('../stats/SelectionForm'));

export const styles = (theme: any) => ({
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
  }
});

interface ContainerProps {
  classes: any;
  user?: any;
  history?: any;
}

type functionParms = {
  owner: string;
  isCloud: boolean;
};

export function useParams(clean = false) {
  // return {
  //   C_AWAITINGCUSTOMER: 6,
  //   N_AWAITINGCUSTOMER: 6,
  //   C_RESEARCHING: 3,
  //   N_RESEARCHING: 1,
  //   C_AWAITINGINFOR: 1,
  //   N_AWAITINGINFOR: 1,
  //   C_NEW: 1,
  //   N_NEW: 1
  // };
  const [C_AWAITINGCUSTOMER] = useLocalStorage('C_AWAITINGCUSTOMER', 6, clean);
  const [C_AWAITINGINFOR] = useLocalStorage('C_AWAITINGINFOR', 1, clean);
  const [C_RESEARCHING] = useLocalStorage('C_RESEARCHING', 3, clean);
  const [C_NEW] = useLocalStorage('C_NEW', 1, clean);
  const [N_AWAITINGCUSTOMER] = useLocalStorage('N_AWAITINGCUSTOMER', 6, clean);
  const [N_RESEARCHING] = useLocalStorage('N_RESEARCHING', 10, clean);
  const [N_AWAITINGINFOR] = useLocalStorage('N_AWAITINGINFOR', 2, clean);
  const [N_NEW] = useLocalStorage('N_NEW', 1, clean);
  const [N_SOLUTIONPROPOSED] = useLocalStorage('N_SOLUTIONPROPOSED', 30, clean);
  const [N_AGING] = useLocalStorage('N_AGING', 90, clean);
  const [N_MAJORIMPACT] = useLocalStorage('N_MAJORIMPACT', 2, clean);
  return {
    C_AWAITINGCUSTOMER,
    N_AWAITINGCUSTOMER,
    C_RESEARCHING,
    N_RESEARCHING,
    C_AWAITINGINFOR,
    N_AWAITINGINFOR,
    C_NEW,
    N_NEW,
    N_SOLUTIONPROPOSED,
    N_AGING,
    N_MAJORIMPACT
  };
}

type backlogParams = {
  date: string;
  owner: string;
  products: string[];
  isValidSuperUser: boolean;
};

const StatsMainContainerWrapper: React.FC<ContainerProps> = (props: any) => {
  const { user } = React.useContext(UserContext);
  if (!user || user.fullname === null) {
    return <div>You need to be logged in to see this page</div>;
  } else {
    return <StatsMainContainer {...props} />;
  }
};

const StatsMainContainer: React.FC<ContainerProps> = (props: any) => {
  const { user } = React.useContext(UserContext);
  const [date] = useState(format(Date.now(), 'yyyy-MM-dd'));
  const [isCloud, setisCloud] = useState(false);
  const [owner, setOwner] = useState(props.user.fullname);
  const { products, persons } = useContext(SelectionContext);
  const { classes } = props;

  const isValidSuperUser = ['Admin', 'PO'].some(u => (user ? u === user.role : false));
  const { loading, data } = useQuery(QUERY_BACKLOG, {
    variables: { date, owner, products, deployment: 'ALL', ...useParams(!isValidSuperUser) }
  });
  if (loading) return null;
  if (!data) return null;
  //const data = getBacklog({ date, owner, products, isValidSuperUser });
  // const currentUser = props.user;
  // console.log('currentUser', dauserta, products);
  let enableIt: boolean;
  enableIt = false;
  let isXpertOrSwan = false;
  if (user && user.permissions) {
    enableIt = user.permissions.some((u: { permission: string }): any => u.permission === 'STATS');
    if (user.team) {
      isXpertOrSwan = ['Xpert', 'Swan'].some(
        item => item.toLowerCase() === user.team.toLowerCase()
      );
    }
  } else {
    // enableIt = false;
  }
  const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
  return (
    <div className={classes.root}>
      <SelectionForm
        isValidSuperUser={isValidSuperUser || enableIt}
        isXpertOrSwan={isValidSuperUser || isXpertOrSwan || enableIt}
        onNavigateToParams={() => props.history.push('/myworkparams')}
        classes={props.classes}
        initialValue={{ owner, isCloud, lastUpdated: mostRecentUpdate, actionNeeded: true }}
        valuesChanged={(a: string, b: boolean) => {
          if (a !== owner) {
            setOwner(a);
          }
          if (b !== isCloud) {
            setisCloud(b);
          }
        }}
      />
      <ListFavoritePersons persons={persons} />
      {!data ? (
        <Spinner />
      ) : (
        <StatsMain
          classes={props.classes}
          data={data}
          // onChange={(date: string) => setDate(date)}
          isCloud={isCloud}
          actionNeeded={false}
        />
      )}
    </div>
  );
};

interface Props {
  classes: any;
  data: any;
  isCloud: boolean;
  owner?: string;
  products?: string[];
  actionNeeded?: boolean;
  filterValues?: any;
}

const RELEASE_FILTER = ['Baan 4', 'Baan 5', 'LN FP5', 'LN FP6', 'LN FP7', 'LN FP3', '10.2', '10.3'];

export const StatsMain: React.FC<Props> = ({
  classes,
  data,
  owner = '',
  products = ['LN'],
  filterValues
}) => {
  const params = useParams();
  const sev12notrestored = [
    ...data.critical.filter((item: any) => !item.service_restored_date),
    ...data.sev2.filter(
      (item: any) => !item.service_restored_date && item.status !== 'Solution Proposed'
    )
  ];

  const [loading, setLoading] = useState(true);
  console.log('👍', owner);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {};
  }, []);
  // const sev1notrestored = data.critical.filter((item: any) => !item.service_restored_date);

  // customers that have a MT deployment type
  const multitenantcustomers = data.multitenantcustomers;

  // List of customers that have extended maintenance
  const extendedmaintenance = data.extendedMaintenance;

  const extIncidents = [...data.all, ...data.all_dev]
    .filter((item: any) => RELEASE_FILTER.includes(item.releasename))
    .map((item: any) => ({
      ...item,
      extended: extendedmaintenance.find((customer: any) => customer.customerid === item.customerid)
        ? 'Yes'
        : 'No'
    }))
    .sort((a: any, b: any) => a.daysSinceCreated - b.daysSinceCreated);

  const extIncidentsWithDev = extIncidents.filter(
    (item: any) => item.status === 'Awaiting Development'
  );
  // console.log('🤷‍♂️🤷‍♂️', extIncidents);
  // console.log('mt customers', multitenantcustomers);
  const mtincidents = data.all
    .filter(
      (inc: any) =>
        multitenantcustomers.find((cust: any) => parseInt(cust.customerid) === inc.customerid)
      // inc.customerid === 60028554
    )
    .filter((x: any) => x.Tenant !== 'Multi-Tenant');

  const multitenant = data.multitenant
    .filter((item: any) => item.Tenant === 'Multi-Tenant' && item.release !== '10.5')
    .filter((item: any) => item.dayssincelastupdate > 7)
    .sort((a: any, b: any) => a.dayssincelastupdate - b.dayssincelastupdate);
  // console.log('MT', multitenant);
  // console.log('critical', sev1notrestored);
  const { isCloud } = useContext(SelectionContext);
  // const filterValues = { owner, products };
  return (
    <>
      {loading && <LoadingDots />}

      {!isCloud && (
        <div>
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={sev12notrestored}
            title="Critical/Major Not restored"
            description="All Incidents with a severity of 'Production Outage / Major Impact' without a restored date"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={multitenant}
            title="Multitenant"
            description="All Incidents open for our MT customers not updated > 7 days"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={mtincidents}
            additionalFields={['Deployment', 'Tenant', 'release']}
            title="Multitenant customer incidents"
            description="All Incidents open for our MT not logged as multi tenant"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={extIncidents}
            additionalFields={['releasename', 'extended', 'daysSinceCreated']}
            title="Extended Maintenance Check"
            description="All Incidents open for customers logging on a version that has extended maintenance"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={extIncidentsWithDev}
            additionalFields={['releasename', 'extended', 'daysSinceCreated']}
            title="Extended Maintenance Check- Awaiting Development"
            description="All Awaiting Development Incidents open for customers logging on a version that has extended maintenance"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.sev1notrestored}
            title="Critical"
            description="All Incidents with a severity of 'Production Outage / Critical Application halted'"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.on_hold}
            title="On Hold"
            description="All Incidents with a status of On Hold By Customer with no or an Expired Action date"
          />

          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.awaiting_customer}
            additionalFields={['ownergroup']}
            title="Awaiting customer"
            description={`All Incidents with a status of Awaiting Customer not updated for more than ${params['N_AWAITINGCUSTOMER']} days `}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.researching}
            title="Researching"
            description={`Incidents with status 'Researching' Last updated  ${params['N_RESEARCHING']} days or more`}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.awaiting_infor}
            title="Awaiting Infor"
            description={`Incidents with status 'Awaiting Infor' Last updated  ${params['N_AWAITINGINFOR']} days or more`}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.callbacks}
            title="Callbacks/Awaiting Infor"
            description="All callbacks and Incidents with status 'Awaiting Infor'"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.major_impact}
            title="Major Impact"
            description={`Incidents with severity 'Major Impact' Last updated ${params['N_MAJORIMPACT']} days or more`}
            includeservicerestored={true}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.major_impact2}
            title="Major Impact"
            description={`Incidents with severity 'Major Impact' Last updated ${params['N_MAJORIMPACT']} days or more Not resolved in 5 days`}
            includeservicerestored={true}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.aging}
            title="Aging- Support"
            description={`Incidents older than ${params['N_AGING']}  days`}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.aging_dev}
            title="Aging- Development"
            description="Incidents older than 90 days - Development Backlog"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.new}
            title="New Incidents"
            description={`Incidents with status 'New' not updated for more than  ${params['N_NEW']} days`}
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.cloudops}
            title="All CloudOps"
            description="All Incidents with a CloudOps Specific status (Task....)"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.infor}
            additionalFields={['contactname']}
            title="Infor"
            description="All Support Backlog logged on Infor Account"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.active}
            title="Active"
            description="All Active Support Backlog"
          />
          <BacklogTable
            filterValues={filterValues}
            classes={classes}
            backlog={data.all}
            title="All"
            description="All Support Backlog"
          />
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(StatsMainContainerWrapper);
