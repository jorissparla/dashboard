import React, { useContext, useState } from "react";
import BacklogTableNewStyle from "stats/BacklogTableNewStyle";
import { Backlog } from "stats/BacklogType";
import { SelectionContext } from "../globalState/SelectionContext";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useIsValidEditor } from "./../globalState/UserProvider";
import LoadingDots from "./../utils/LoadingDots";

const SelectionForm = React.lazy(() => import("../stats/SelectionForm"));

export const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    top: "200px",
    backgroundColor: "rgba(0,0,0,0.1)",
  }),
  tableheader: {
    fontFamily: "Poppins",
    fontSize: 18,
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: "white",
  },
  tableheadernarrow: {
    fontFamily: "Poppins",
    fontSize: 18,
    width: 20,
  },
  narrow: {
    width: 20,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 15,
    padding: 10,
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
  },
  textfield: {
    verticalAlign: "center",
    margin: 10,
  },
  button: {
    margin: 10,
  },
  spaceapart: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
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
    borderRadius: "50%",
  },
  row: {
    fontFamily: "Poppins",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
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
  const [C_AWAITINGCUSTOMER] = useLocalStorage("C_AWAITINGCUSTOMER", 6, clean);
  const [C_AWAITINGINFOR] = useLocalStorage("C_AWAITINGINFOR", 1, clean);
  const [C_RESEARCHING] = useLocalStorage("C_RESEARCHING", 3, clean);
  const [C_NEW] = useLocalStorage("C_NEW", 1, clean);
  const [N_AWAITINGCUSTOMER] = useLocalStorage("N_AWAITINGCUSTOMER", 6, clean);
  const [N_RESEARCHING] = useLocalStorage("N_RESEARCHING", 10, clean);
  const [N_AWAITINGINFOR] = useLocalStorage("N_AWAITINGINFOR", 2, clean);
  const [N_NEW] = useLocalStorage("N_NEW", 1, clean);
  const [N_SOLUTIONPROPOSED] = useLocalStorage("N_SOLUTIONPROPOSED", 30, clean);
  const [N_AGING] = useLocalStorage("N_AGING", 90, clean);
  const [N_MAJORIMPACT] = useLocalStorage("N_MAJORIMPACT", 2, clean);
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
    N_MAJORIMPACT,
  };
}

type backlogParams = {
  date: string;
  owner: string;
  products: string[];
  isValidSuperUser: boolean;
};

// const StatsMainContainerWrapper: React.FC<ContainerProps> = (props: any) => {
//   const { user } = React.useContext(UserContext);
//   if (!user || user.fullname === null) {
//     return <div>You need to be logged in to see this page</div>;
//   } else {
//     return <StatsMainContainer {...props} />;
//   }
// };

// const StatsMainContainer: React.FC<ContainerProps> = (props: any) => {
//   const { user } = React.useContext(UserContext);
//   const [date] = useState(format(Date.now(), "yyyy-MM-dd"));
//   const [isCloud, setisCloud] = useState(false);
//   const [owner, setOwner] = useState(props.user.fullname);
//   const { products, persons } = useContext(SelectionContext);
//   const { classes } = props;
//   const isValidSuperUser = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
//   const { loading, data } = useQuery(QUERY_BACKLOG, {
//     variables: {
//       date,
//       owner,
//       products,
//       deployment: "ALL",
//       ...useParams(!isValidSuperUser),
//     },
//   });
//   console.log("Start:", new Date());
//   if (loading) return null;
//   if (!data) return null;
//   //const data = getBacklog({ date, owner, products, isValidSuperUser });
//   // const currentUser = props.user;
//   // console.log('currentUser', dauserta, products);
//   let enableIt: boolean;
//   enableIt = false;
//   let isXpertOrSwan = false;
//   if (user && user.permissions) {
//     enableIt = user.permissions.some((u: { permission: string }): any => u.permission === "STATS");
//     if (user.team) {
//       isXpertOrSwan = ["Xpert", "Swan"].some((item) => item.toLowerCase() === user.team.toLowerCase());
//     }
//   } else {
//     // enableIt = false;
//   }
//   const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
//   return (
//     <div className={classes.root}>
//       <SelectionForm
//         isValidSuperUser={isValidSuperUser || enableIt}
//         isXpertOrSwan={isValidSuperUser || isXpertOrSwan || enableIt}
//         onNavigateToParams={() => props.history.push("/myworkparams")}
//         classes={props.classes}
//         initialValue={{
//           owner,
//           isCloud,
//           lastUpdated: mostRecentUpdate,
//           actionNeeded: true,
//         }}
//         valuesChanged={(a: string, b: boolean) => {
//           if (a !== owner) {
//             setOwner(a);
//           }
//           if (b !== isCloud) {
//             setisCloud(b);
//           }
//         }}
//       />
//       <ListFavoritePersons persons={persons} />
//       {!data ? (
//         <Spinner />
//       ) : (
//         <StatsMain
//           classes={props.classes}
//           data={data}
//           // onChange={(date: string) => setDate(date)}
//           isCloud={isCloud}
//           actionNeeded={false}
//         />
//       )}
//     </div>
//   );
// };

interface Props {
  classes: any;
  data: any;
  isCloud: boolean;
  owner?: string;
  products?: string[];
  actionNeeded?: boolean;
  filterValues?: any;
}

const RELEASE_FILTER = ["Baan 4", "Baan 5", "LN FP5", "LN FP6", "LN FP7", "LN FP3", "10.2", "10.3"];

export const StatsMain: React.FC<Props> = ({ classes, data, owner = "", products = ["LN"], filterValues }) => {
  const [isValidEditor, user] = useIsValidEditor();
  const params = useParams();
  const blBase = new Backlog(data.everything, data.accounts);
  const sev12notrestored = blBase
    .notServicedRestored()
    .hasSeverity(["Major Impact", "Production Outage / Critical Application halted"])
    .notStatus(["Solution Proposed"])
    .getData();
  const critical = blBase
    .init()
    .severity("Production Outage / Critical Application halted")
    .notServicedRestored()
    .notStatus(["Solution Proposed"])
    .getData();

  const [loading, setLoading] = useState(true);
  const [avgAgeSupport, all] = blBase
    .init()
    .notStatus(["Awaiting Development", "Solution Proposed", "Solution Pending Maintenance"])
    .sort("dayssincelastupdate", "D")
    .getAvgAndData();
  const [avgAge, allOver30] = blBase
    .init()
    .notStatus(["Solution Proposed", "Solution Pending Maintenance"])
    .daysSinceCreated(30)
    .sort("daysSinceCreated", "D")
    .getAvgAndData();
  const all_dev = blBase.init().status("Awaiting Development").sort("dayssincelastupdate", "D").getData();
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // const sev1notrestored = data.critical.filter((item: any) => !item.service_restored_date);

  // customers that have a MT deployment type
  const multitenantcustomers = data.multitenantcustomers;

  // List of customers that have extended maintenance
  const extendedmaintenance = data.extendedMaintenance;

  const extIncidents = [...all, ...all_dev]
    .filter((item: any) => RELEASE_FILTER.includes(item.releasename))
    .map((item: any) => ({
      ...item,
      extended: extendedmaintenance.find((customer: any) => customer.customerid === item.customerid) ? "Yes" : "No",
    }))
    .sort((a: any, b: any) => a.daysSinceCreated - b.daysSinceCreated);

  const extIncidentsWithDev = extIncidents.filter((item: any) => item.status === "Awaiting Development");
  // console.log('🤷‍♂️🤷‍♂️', extIncidents);
  // console.log('mt customers', multitenantcustomers);
  const mtincidents = all
    .filter(
      (inc: any) => multitenantcustomers.find((cust: any) => parseInt(cust.customerid) === inc.customerid)
      // inc.customerid === 60028554
    )
    .filter((x: any) => x.Tenant !== "Multi-Tenant");

  const multitenant = new Backlog(data.multitenant).isMT().dayssincelastupdate(7).sort("dayssincelastupdate", "D").getData();

  const awaiting_customer = blBase
    .init()
    .status("Awaiting Customer")
    .dayssincelastupdate(params["N_AWAITINGCUSTOMER"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const awaiting_infor = blBase
    .init()
    .status("Awaiting Infor")
    .dayssincelastupdate(params["N_AWAITINGINFOR"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const researching = blBase.init().status("Researching").dayssincelastupdate(params["N_RESEARCHING"]).sort("dayssincelastupdate", "D").getData();
  const infor = blBase
    .init()
    // .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .customername("Infor ")
    .notStatus(["Solution Proposed", "Solution Pending Maintenance", "Awaiting Development"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const on_hold = blBase.init().status("On hold by customer").valid_actiondate().sort("dayssincelastupdate", "D").getData();
  const aging = blBase
    .init()
    .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .daysSinceCreated(params["N_AGING"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const aging_dev = blBase.init().hasStatus(["Awaiting Development"]).daysSinceCreated(90).sort("dayssincelastupdate", "D").getData();
  const major_impact = blBase
    .init()
    .severity("Major Impact")
    .notServicedRestored()
    .notStatus(["Solution Proposed"])
    .dayssincelastupdate(params["N_MAJORIMPACT"])
    .sort("dayssincelastupdate", "D")
    .getData();

  const escalated = blBase
    .init()
    // .region("EMEA")
    .escalated()
    .addEscalatedDays()
    .notStatus(["Solution Proposed", "Solution Pending Maintenance"])
    .sort("dayssincelastupdate", "D")
    .addManager()
    .getData();
  const pendingmaintenance = blBase
    .init()
    // .region("EMEA")
    .hasStatus(["Solution Pending Maintenance"])
    .invalid_activity_date()
    .sort("dayssincelastupdate", "D")
    .addManager()
    .getData();

  const cloudops = blBase
    .init()
    // .region("EMEA")
    .statusContains("task")
    .sort("dayssincelastupdate", "D")
    .getData();
  const new_inc = blBase
    .init()
    // .region("EMEA")
    // .escalated()
    .status("New")
    .dayssincelastupdate(params["N_NEW"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const callbacks = blBase.init().status("Awaiting Infor").sort("dayssincelastupdate", "D").getData();

  const { isCloud } = useContext(SelectionContext);

  return (
    <>
      {loading && <LoadingDots />}

      {!isCloud && (
        <div className="w-full mx-4">
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            additionalFields={["managername", "daysEscalated"]}
            backlog={escalated}
            title="Escalated"
            description="All Incidents escalated"
          />

          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={sev12notrestored}
            title="Critical/Major Not restored"
            description="All Incidents with a severity of 'Production Outage / Major Impact' without a restored date"
          />

          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={multitenant}
            title="Multitenant"
            description="All Incidents open for our MT customers not updated > 7 days"
          />

          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={pendingmaintenance}
            title="Pending Maintenance"
            description="All Incidents Solution Pending Maintenance without a valid activity date "
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={extIncidentsWithDev}
            additionalFields={["releasename", "extended"]}
            title="Extended Maintenance Check- Awaiting Development"
            description="All Awaiting Development Incidents open for customers logging on a version that has extended maintenance"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={mtincidents}
            additionalFields={["Deployment", "Tenant", "release"]}
            title="Multitenant customer incidents"
            description="All Incidents open for our MT not logged as multi tenant"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={extIncidents}
            additionalFields={["releasename", "extended"]}
            title="Extended Maintenance Check"
            description="All Incidents open for customers logging on a version that has extended maintenance"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={data.sev1notrestored}
            title="Critical"
            description="All Incidents with a severity of 'Production Outage / Critical Application halted'"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={on_hold}
            // backlog={data.on_hold}
            title="On Hold"
            description="All Incidents with a status of On Hold By Customer with no or an Expired Action date"
          />

          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            // backlog={data.awaiting_customer}
            backlog={awaiting_customer}
            additionalFields={["ownergroup"]}
            title="Awaiting customer"
            description={`All Incidents with a status of Awaiting Customer not updated for more than ${params["N_AWAITINGCUSTOMER"]} days `}
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            // backlog={data.researching}
            backlog={researching}
            title="Researching"
            description={`Incidents with status 'Researching' Last updated  ${params["N_RESEARCHING"]} days or more`}
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            // backlog={data.awaiting_infor}
            backlog={awaiting_infor}
            title="Awaiting Infor"
            description={`Incidents with status 'Awaiting Infor' Last updated  ${params["N_AWAITINGINFOR"]} days or more`}
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            // backlog={data.callbacks}
            backlog={callbacks}
            title="Callbacks/Awaiting Infor"
            description="All callbacks and Incidents with status 'Awaiting Infor'"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            // backlog={data.major_impact}
            backlog={major_impact}
            title="Major Impact"
            description={`Incidents with severity 'Major Impact' Last updated ${params["N_MAJORIMPACT"]} days or more`}
            includeservicerestored={true}
          />

          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={aging}
            // backlog={data.aging}
            title="Aging- Support"
            description={`Incidents older than ${params["N_AGING"]}  days`}
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={aging_dev}
            // backlog={data.aging_dev}
            title="Aging- Development"
            description="Incidents older than 90 days - Development Backlog"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={new_inc}
            // backlog={data.new}
            title="New Incidents"
            description={`Incidents with status 'New' not updated for more than  ${params["N_NEW"]} days`}
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            // backlog={data.cloudops}
            backlog={cloudops}
            title="All CloudOps"
            description="All Incidents with a CloudOps Specific status (Task....)"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={infor}
            // backlog={infor}
            additionalFields={["contactname"]}
            title="Infor"
            description="All Support Backlog logged on Infor Account"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={data.active}
            title="Active"
            description="All Active Support Backlog"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={all}
            sub={` age ${avgAgeSupport} days`}
            title={`All  `}
            description="All Support Backlog"
          />
          <BacklogTableNewStyle
            filterValues={filterValues}
            classes={classes}
            backlog={allOver30}
            sub={` age ${avgAge} days`}
            title={`All `}
            description="Aged over 30"
          />
        </div>
      )}
    </>
  );
};

// export default withStyles(styles)(StatsMainContainerWrapper);
