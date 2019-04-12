import { withStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { QUERY_BACKLOG } from "../graphql/BACKLOG_QUERY2";
import { BacklogTable } from "../stats/BacklogTable";
import { SelectionContext, SelectionProvider } from "../stats/SelectionContext";
import { SelectionForm } from "../stats/SelectionForm";
import { withUser } from "../User";
import { FormattedDateNow } from "../utils/FormattedDate";
import Spinner from "../utils/spinner";

const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    top: "200px",
    backgroundColor: "rgba(0,0,0,0.1)"
  }),
  tableheader: {
    fontFamily: "Poppins",
    fontSize: 18,
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: "white"
  },
  tableheadernarrow: {
    fontFamily: "Poppins",
    fontSize: 18,
    width: 20
  },
  narrow: {
    width: 20
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 15,
    padding: 10
  },
  summary: {
    display: "flex",
    justifyContent: "space-between"
  },
  textfield: {
    verticalAlign: "center",
    margin: 10
  },
  button: {
    margin: 10
  },
  spaceapart: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: 10
  },
  number: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "black",
    color: "white",
    fontSize: 18,
    margin: 2,
    width: 40,
    height: 40,
    borderRadius: "50%"
  },
  row: {
    fontFamily: "Poppins",
    "&:nth-of-type(odd)": {
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

const StatsMainContainer: React.FC<ContainerProps> = (props: any) => {
  const [date, setDate] = useState(FormattedDateNow());
  const [isCloud, setisCloud] = useState(false);
  const [owner, setOwner] = useState(props.user.fullname);

  const currentUser = withUser();
  if (props.user.fullname === null || !currentUser) {
    return <div>You need to be logged in to see this page</div>;
  }

  console.log("PROPS", currentUser);

  const { loading, data } = useQuery(QUERY_BACKLOG, {
    suspend: false,
    variables: { date, owner, deployment: "ALL" }
  });
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (!(data && data.solution_proposed)) {
  //   return <div>Error</div>;
  // }

  const { classes, user } = props;
  let enableIt: boolean;
  if (currentUser && currentUser.permissions) {
    enableIt = currentUser.permissions.some(u => u.permission === "STATS");
  } else {
    enableIt = false;
  }

  const isValidSuperUser = ["Admin", "PO"].some(u => u === user.role) || enableIt;
  console.log(isValidSuperUser, enableIt);
  const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
  const handleEnable = () => {};
  return (
    <SelectionProvider>
      <div className={classes.root}>
        <SelectionForm
          isValidSuperUser={isValidSuperUser}
          classes={props.classes}
          initialValue={{ owner, isCloud, lastUpdated: mostRecentUpdate, actionNeeded: true }}
          valuesChanged={(a: string, b: boolean) => {
            console.log("a", a, b);
            if (a !== owner) {
              setOwner(a);
            }
            if (b !== isCloud) {
              setisCloud(b);
            }
          }}
        />
        {loading ? (
          <Spinner />
        ) : (
          <StatsMain
            classes={props.classes}
            data={data}
            onChange={(date: string) => setDate(date)}
            isCloud={isCloud}
            actionNeeded={false}
          />
        )}
      </div>
    </SelectionProvider>
  );
};

interface Props {
  classes: any;
  onChange: Function;
  data: any;
  isCloud: boolean;
  actionNeeded: boolean;
}

const StatsMain: React.FC<Props> = ({ classes, onChange, data }) => {
  const [date, setDate] = useState(FormattedDateNow());
  console.log(data);
  function handleChange(event: any) {
    setDate(event.target.value);
    onChange(event.target.value);
  }
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
            description="Incidents older than 90 days"
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
            description="Incidents with status 'New' not updated for more than 2 days"
          />

          <BacklogTable classes={classes} backlog={data.all_cloud} title="All" description="All Support Backlog" />
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
            backlog={data.callbacks}
            title="Callbacks/Awaiting Infor"
            description="All callbacks and Incidents with status 'Awaiting Infor'"
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
            title="Aging- Support"
            description="Incidents older than 90 day- Support Backlog"
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
            description="Incidents with status 'New' not updated for more than 2 days"
          />

          <BacklogTable classes={classes} backlog={data.all} title="All" description="All Support Backlog" />
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(StatsMainContainer);
