import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  Paper,
  Typography,
  withStyles,
  TextField,
  Portal,
  Switch,
  FormLabel,
  Button
} from '@material-ui/core';
import { Formik } from 'formik';
import { format } from '../utils/format';
import OwnerList from '../stats/OwnerList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { QUERY_BACKLOG } from '../graphql/BACKLOG_QUERY2';
import { FlexCol } from '../styles';

const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '200px'
  }),
  tableheader: {
    fontFamily: 'Poppins',
    fontSize: 18
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
}

type functionParms = {
  owner: string;
  isCloud: boolean;
};

interface SelectionProps {
  classes: any;
  valuesChanged: any;
  initialValue: {
    isCloud: boolean;
    owner: string;
    lastUpdated: string;
  };
}

const SelectionForm: React.FunctionComponent<SelectionProps> = ({
  classes,
  initialValue,
  valuesChanged
}) => {
  const [owner, setOwner] = useState(initialValue.owner);
  const [allOwners, toggleAllOwners] = useState(false);
  const [isCloud, setisCloud] = useState(initialValue.isCloud);

  return (
    <Paper className={classes.paper2}>
      <FormLabel>Cloud</FormLabel>
      <Switch
        checked={isCloud}
        onChange={e => setisCloud(!isCloud)}
        value={isCloud}
        color="primary"
      />
      <TextField
        value={owner}
        onChange={event => {
          setOwner(event.target.value);
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
            setOwner('');
          } else {
            setOwner(initialValue.owner);
          }
          toggleAllOwners(!allOwners);
        }}
        value={allOwners}
        color="primary"
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          valuesChanged(owner, isCloud);
        }}
      >
        Search
      </Button>
      <div style={{ position: 'relative', right: '-40px' }}>
        {' '}
        last Updated: {initialValue.lastUpdated}
      </div>
    </Paper>
  );
};

const StatsMainContainer: React.FC<ContainerProps> = (props: any) => {
  const [date, setDate] = useState(format(Date.now(), 'YYYY-MM-DD'));
  const [isCloud, setisCloud] = useState(false);
  const [owner, setOwner] = useState(props.user.fullname);
  const { loading, data } = useQuery(QUERY_BACKLOG, {
    suspend: false,
    variables: { date, owner, deployment: 'ALL' }
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!(data && data.solution_proposed)) {
    return <div>Error</div>;
  }

  const { classes, user } = props;
  const isAdmin = ['admin', 'PO'].some(u => u === user.role);
  console.log(isAdmin);
  const handleEnable = () => {};
  return (
    <div className={classes.root}>
      <SelectionForm
        classes={props.classes}
        initialValue={{ owner, isCloud, lastUpdated: data.mostRecentUpdate }}
        valuesChanged={(a: string, b: boolean) => {
          console.log('a', a, b);
          if (a !== owner) {
            setOwner(a);
          }
          if (b !== isCloud) {
            setisCloud(b);
          }
        }}
      />
      <StatsMain
        classes={props.classes}
        data={data}
        onChange={(date: string) => setDate(date)}
        isCloud={isCloud}
      />
    </div>
  );
};

interface Props {
  classes: any;
  onChange: Function;
  data: any;
  isCloud: boolean;
}

const StatsMain: React.FC<Props> = ({ classes, onChange, data, isCloud }) => {
  const [date, setDate] = useState(format(Date.now(), 'YYYY-MM-DD'));
  console.log(data);
  function handleChange(event: any) {
    setDate(event.target.value);
    onChange(event.target.value);
  }
  return (
    <>
      {isCloud && (
        <div className={classes.root}>
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
            description="All Incidents with a status of Solution Proposed not updated for 30 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.awaiting_customer_cloud}
            title="Awaiting customer"
            description="All Incidents with a status of Awaiting Customer not updated for 3 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.researching_cloud}
            title="Researching"
            description="Incidents with status 'Researching' Last updated 7 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.awaiting_infor_cloud}
            title="Awaiting Infor"
            description="Incidents with status 'Awaiting Infor' Last updated 3 days or more"
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
            description="Incidents older than 90 days"
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
        <div className={classes.root}>
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
            description="All Incidents with a status of Solution Proposed not updated for 30 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.awaiting_customer}
            title="Awaiting customer"
            description="All Incidents with a status of Awaiting Customer not updated for 7 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.researching}
            title="Researching"
            description="Incidents with status 'Researching' Last updated 7 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.awaiting_infor}
            title="Awaiting Infor"
            description="Incidents with status 'Awaiting Infor' Last updated 3 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.major_impact}
            title="Major Impact"
            description="Incidents with severity 'Major Impact' Last updated 2 days or more"
          />
          <BacklogTable
            classes={classes}
            backlog={data.major_impact2}
            title="Major Impact"
            description="Incidents with severity 'Major Impact' Last updated 2 days or more Not resolved in 5 days"
          />
          <BacklogTable
            classes={classes}
            backlog={data.aging}
            title="Aging"
            description="Incidents older than 90 days"
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: theme.palette.common.white
  },
  body: {
    fontSize: '1rem'
  }
}))(TableCell);

const BacklogTable = ({ backlog, classes, title, description = title }: any) => {
  //
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
        <div className={classes.spaceapart}>
          <Typography variant="h6" className={classes.heading}>
            {title}({backlog.length})
          </Typography>
          <div>{description}</div>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.row}>
              <CustomTableCell className={classes.tableheader}>Incident</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Severity</CustomTableCell>
              <CustomTableCell className={classes.tableheadernarrow}>Esc</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Customer</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Owner </CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Status</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Last Updated</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Age</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Summary</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {backlog.map((row: any, index: number) => (
              <TableRow key={index} className={classes.row}>
                <TableCell component="th" scope="row">
                  <a
                    href={`http://navigator.infor.com/a/incident.asp?IncidentID=${row.incident}`}
                    target="_blank"
                  >
                    {row.incident}
                  </a>
                </TableCell>
                <TableCell>{row.severityname}</TableCell>
                <TableCell className={classes.tableheadernarrow}>
                  {row.escalated ? 'Yes' : ''}
                </TableCell>
                <TableCell>{row.customername}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.dayssincelastupdate}</TableCell>
                <TableCell>{row.daysSinceCreated}</TableCell>
                <TableCell>{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(StatsMainContainer);
