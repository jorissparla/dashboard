import { withStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { QUERY_BACKLOG } from '../stats/queries/BACKLOG_QUERY2';
import { BacklogTable } from '../stats/BacklogTable';
import { SelectionContext } from '../globalState/SelectionContext';
// import { SelectionForm } from '../stats/SelectionForm';

import { useUser } from '../User';
import { format } from '../utils/format';
import Spinner from '../utils/spinner';
import { useLocalStorage } from '../utils/useLocalStorage';
import { ListFavoritePersons } from '../stats/FavoritesPersons';
const SelectionForm = React.lazy(() => import('../stats/SelectionForm'));

export const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
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
const useBacklog = ({ date, owner, products, isValidSuperUser }: backlogParams) => {
  const { loading, data } = useQuery(QUERY_BACKLOG, {
    suspend: true,
    variables: { date, owner, products, deployment: 'ALL', ...useParams(!isValidSuperUser) }
  });
  if (loading) return null;
  if (!data) return null;
  return data;
};

const useBacklogAndCurrentUser = ({ date, owner, products, isValidSuperUser }: backlogParams) => {
  const currentUser = useUser();
  const currentBacklog = useBacklog({ date, owner, products, isValidSuperUser });
  return [currentUser, currentBacklog];
};

const StatsMainContainer: React.FC<ContainerProps> = (props: any) => {
  const [date, setDate] = useState(format(Date.now(), 'YYYY-MM-DD'));
  const [isCloud, setisCloud] = useState(false);
  const [owner, setOwner] = useState(props.user.fullname);
  const { products, persons } = useContext(SelectionContext);
  const { classes, user } = props;

  const isValidSuperUser = ['Admin', 'PO'].some(u => u === user.role);
  const [currentUser, data] = useBacklogAndCurrentUser({ date, owner, products, isValidSuperUser });
  // const currentUser = props.user;
  console.log('currentUser', data);
  if (props.user.fullname === null || !currentUser) {
    return <div>You need to be logged in to see this page</div>;
  }
  let enableIt: boolean;
  if (currentUser && currentUser.permissions) {
    enableIt = currentUser.permissions.some(
      (u: { permission: string }): any => u.permission === 'STATS'
    );
  } else {
    enableIt = false;
  }
  const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
  return (
    <div className={classes.root}>
      <SelectionForm
        isValidSuperUser={isValidSuperUser || enableIt}
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
  actionNeeded: boolean;
}

const StatsMain: React.FC<Props> = ({ classes, data }) => {
  const [date, setDate] = useState(format(Date.now(), 'YYYY-MM-DD'));
  const params = useParams();

  const { isCloud } = useContext(SelectionContext);
  return (
    <>
      {isCloud && (
        <div>
          <BacklogTable
            classes={classes}
            backlog={data.critical_cloud}
            title="Critical"
            description="All Incidents with a severity of 'Production Outage / Critical Application halted'"
          />
          <BacklogTable
            classes={classes}
            backlog={data.on_hold_cloud}
            title="On Hold"
            description="All Incidents with a status of On Hold By Customer with no or an Expired Action date"
          />

          <BacklogTable
            classes={classes}
            backlog={data.solution_proposed_cloud}
            title="Solution Proposed"
            description={`All Incidents with a status of Solution Proposed not updated for ${
              params['N_SOLUTIONPROPOSED']
            } days or more`}
          />

          <BacklogTable
            classes={classes}
            backlog={data.awaiting_customer_cloud}
            title="Awaiting customer"
            description={`All Incidents with a status of Awaiting Customer not updated for more than  ${
              params['C_AWAITINGCUSTOMER']
            } days `}
          />

          <BacklogTable
            classes={classes}
            backlog={data.researching_cloud}
            title="Researching"
            description={`Incidents with status 'Researching' Last updated  ${
              params['C_RESEARCHING']
            } days or more`}
          />

          <BacklogTable
            classes={classes}
            backlog={data.awaiting_infor_cloud}
            title="Awaiting Infor"
            description={`Incidents with status 'Awaiting Infor' Last updated  ${
              params['C_AWAITINGINFOR']
            } days or more`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.callbacks_cloud}
            title="Callbacks/Awaiting Infor"
            description="All callbacks and Incidents with status 'Awaiting Infor'"
          />

          <BacklogTable
            classes={classes}
            backlog={data.major_impact_cloud}
            title="Major Impact"
            description="Incidents with severity 'Major Impact' Last updated 2 days or more"
          />

          <BacklogTable
            classes={classes}
            backlog={data.major_impact_cloud2}
            title="Major Impact"
            description="Incidents with severity 'Major Impact' Last updated 2 days or more Not resolved in 5 days"
          />

          <BacklogTable
            classes={classes}
            backlog={data.aging_cloud}
            title="Aging"
            description={`Incidents older than ${params['N_AGING']}  days`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.aging_dev_cloud}
            title="Aging- Development"
            description="Incidents older than 90 days - Development Backlog"
          />
          <BacklogTable
            classes={classes}
            backlog={data.new_cloud}
            title="New Incidents"
            description={`Incidents with status 'New' not updated for more than  ${
              params['C_NEW']
            } days`}
          />

          <BacklogTable
            classes={classes}
            backlog={data.cloudops}
            title="All CloudOps"
            description="All Incidents with a CloudOps Specific status (Task....)"
          />
          <BacklogTable
            classes={classes}
            backlog={data.all_cloud}
            title="All"
            description="All Support Backlog"
          />
        </div>
      )}
      {!isCloud && (
        <div>
          <BacklogTable
            classes={classes}
            backlog={data.critical}
            title="Critical"
            description="All Incidents with a severity of 'Production Outage / Critical Application halted'"
          />
          <BacklogTable
            classes={classes}
            backlog={data.on_hold}
            title="On Hold"
            description="All Incidents with a status of On Hold By Customer with no or an Expired Action date"
          />
          <BacklogTable
            classes={classes}
            backlog={data.solution_proposed}
            title="Solution Proposed"
            description={`All Incidents with a status of Solution Proposed not updated for ${
              params['N_SOLUTIONPROPOSED']
            } days or more`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.awaiting_customer}
            title="Awaiting customer"
            description={`All Incidents with a status of Awaiting Customer not updated for more than ${
              params['N_AWAITINGCUSTOMER']
            } days `}
          />
          <BacklogTable
            classes={classes}
            backlog={data.researching}
            title="Researching"
            description={`Incidents with status 'Researching' Last updated  ${
              params['N_RESEARCHING']
            } days or more`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.awaiting_infor}
            title="Awaiting Infor"
            description={`Incidents with status 'Awaiting Infor' Last updated  ${
              params['N_AWAITINGINFOR']
            } days or more`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.callbacks}
            title="Callbacks/Awaiting Infor"
            description="All callbacks and Incidents with status 'Awaiting Infor'"
          />
          <BacklogTable
            classes={classes}
            backlog={data.major_impact}
            title="Major Impact"
            description={`Incidents with severity 'Major Impact' Last updated ${
              params['N_MAJORIMPACT']
            } days or more`}
            includeservicerestored={true}
          />
          <BacklogTable
            classes={classes}
            backlog={data.major_impact2}
            title="Major Impact"
            description={`Incidents with severity 'Major Impact' Last updated ${
              params['N_MAJORIMPACT']
            } days or more Not resolved in 5 days`}
            includeservicerestored={true}
          />
          <BacklogTable
            classes={classes}
            backlog={data.aging}
            title="Aging- Support"
            description={`Incidents older than ${params['N_AGING']}  days`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.aging_dev}
            title="Aging- Development"
            description="Incidents older than 90 days - Development Backlog"
          />
          <BacklogTable
            classes={classes}
            backlog={data.new}
            title="New Incidents"
            description={`Incidents with status 'New' not updated for more than  ${
              params['N_NEW']
            } days`}
          />
          <BacklogTable
            classes={classes}
            backlog={data.cloudops}
            title="All CloudOps"
            description="All Incidents with a CloudOps Specific status (Task....)"
          />
          <BacklogTable
            classes={classes}
            backlog={data.infor}
            title="Infor"
            description="All Support Backlog logged on Infor Account"
          />
          <BacklogTable
            classes={classes}
            backlog={data.active}
            title="Active"
            description="All Active Support Backlog"
          />
          <BacklogTable
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

export default withStyles(styles)(StatsMainContainer);
