import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import Spinner from "../utils/spinner";
import { BacklogTable } from "./BacklogTable";
import { useParams } from "../pages/StatsMain";

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

const query = gql`
  query BasicQuery {
    backlog(productFilters: ["LN", "PLM", "Protean", "InforOS"]) {
      incident
      incidentcreated
      owner
      customername
      summary
      product
      ownergroup
      title
      status
      dayssincelastupdate
      daysSinceCreated
      escalated
      Deployment
      severityname
      service_restored_date
      action_date
    }
  }
`;

const Basic = (props: any) => {
  const params = useParams();
  const { loading, data } = useQuery(query);
  if (loading) return <Spinner />;
  console.log(data);
  const d1 = Date.now();

  let { backlog } = data;
  let ln = [
    "LN E-Enterprise Support",
    "Industrial Machinery Support",
    "LN Manufacturing Support",
    "LN Logistics Support",
    "Automotive Support",
    "LN Tools Support",
    "LN Finance Support",
  ];
  backlog = backlog.filter((data: any) => ln.includes(data.ownergroup));
  const critical = backlog.filter((data: any) => data.severityname === "Standard");
  console.log(backlog);
  const active = backlog.filter(
    (data: any) =>
      ["New", "Researching", "Awaiting Infor"].includes(data.status) || (data.status === "Awaiting Customer" && data.dayssincelastupdate <= 3)
  );
  console.log({ active });
  const onhold = backlog.filter((data: any) => data.status === "On Hold by Customer" && (!data.action_date || data.action_date < new Date()));
  const solutionproposed = backlog.filter((data: any) => data.status === "Solution Proposed" && data.dayssincelastupdate > 20);
  const awaitingcustomer = backlog.filter((data: any) => data.status === "Awaiting Customer" && data.dayssincelastupdate > 7);
  const researching = backlog.filter((data: any) => data.status === "Researching" && data.dayssincelastupdate > 7);
  const newdata = backlog.filter((data: any) => data.status === "New" && data.dayssincelastupdate > 2);
  const awaitinginfor = backlog.filter((data: any) => data.status === "Awaiting Infor" && data.dayssincelastupdate > 2);
  const aging = backlog.filter(
    (data: any) => data.daysSinceCreated > 60 && ["Awaiting Customer", "Researching", "Awaiting Infor", "On Hold by Customer"].includes(data.status)
  );
  const agingdev = backlog.filter((data: any) => data.daysSinceCreated > 90 && ["Awaiting Development"].includes(data.status));
  const callbacks = backlog.filter((data: any) => data.status === "Awaiting Infor");
  const majorimpact = backlog.filter(
    (data: any) => data.severityname === "Major impact" && !["Awaiting Development", "Solution Proposed"].includes(data.status)
  );
  const majorimpactexceeded = majorimpact.filter((data: any) => data.daysSinceCreated > 5);
  console.log({ onhold, solutionproposed, awaitingcustomer, majorimpact });
  console.log(Date.now() - d1);
  const { classes } = props;

  return (
    <div>
      {/* <BacklogTable
      classes={classes}
      backlog={data.critical}
      title="Critical"
      description="All Incidents with a severity of 'Production Outage / Critical Application halted'"
    /> */}
      <BacklogTable
        classes={classes}
        backlog={onhold}
        title="On Hold"
        description="All Incidents with a status of On Hold By Customer with no or an Expired Action date"
      />
      <BacklogTable
        classes={classes}
        backlog={solutionproposed}
        title="Solution Proposed"
        description={`All Incidents with a status of Solution Proposed not updated for ${params["N_SOLUTIONPROPOSED"]} days or more`}
      />
      <BacklogTable
        classes={classes}
        backlog={awaitingcustomer}
        title="Awaiting customer"
        description={`All Incidents with a status of Awaiting Customer not updated for more than ${params["N_AWAITINGCUSTOMER"]} days `}
      />
      <BacklogTable
        classes={classes}
        backlog={researching}
        title="Researching"
        description={`Incidents with status 'Researching' Last updated  ${params["N_RESEARCHING"]} days or more`}
      />
      <BacklogTable
        classes={classes}
        backlog={awaitinginfor}
        title="Awaiting Infor"
        description={`Incidents with status 'Awaiting Infor' Last updated  ${params["N_AWAITINGINFOR"]} days or more`}
      />
      <BacklogTable
        classes={classes}
        backlog={callbacks}
        title="Callbacks/Awaiting Infor"
        description="All callbacks and Incidents with status 'Awaiting Infor'"
      />
      <BacklogTable
        classes={classes}
        backlog={majorimpact}
        title="Major Impact"
        description={`Incidents with severity 'Major Impact' Last updated ${params["N_MAJORIMPACT"]} days or more`}
        includeservicerestored={true}
      />
      <BacklogTable
        classes={classes}
        backlog={majorimpactexceeded}
        title="Major Impact"
        description={`Incidents with severity 'Major Impact' Last updated ${params["N_MAJORIMPACT"]} days or more Not resolved in 5 days`}
        includeservicerestored={true}
      />
      <BacklogTable classes={classes} backlog={aging} title="Aging- Support" description={`Incidents older than ${params["N_AGING"]}  days`} />
      <BacklogTable
        classes={classes}
        backlog={agingdev}
        title="Aging- Development"
        description="Incidents older than 90 days - Development Backlog"
      />
      <BacklogTable
        classes={classes}
        backlog={newdata}
        title="New Incidents"
        description={`Incidents with status 'New' not updated for more than  ${params["N_NEW"]} days`}
      />
      {/* <BacklogTable
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
      /> */}
      <BacklogTable classes={classes} backlog={active} title="Active" description="All Active Support Backlog" />
      <BacklogTable classes={classes} backlog={backlog} title="All" description="All Support Backlog" />
    </div>
  );
};
export default withStyles(styles)(Basic);
