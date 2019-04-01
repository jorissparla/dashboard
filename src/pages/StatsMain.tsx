import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { Paper, Typography, withStyles, TextField, Portal } from "@material-ui/core";
import { Formik } from "formik";
import { format } from "../utils/format";
import OwnerList from "../stats/OwnerList";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { QUERY_BACKLOG } from "../graphql/BACKLOG_QUERY";

// const QUERY_BACKLOG = gql`
//   query QUERY_BACKLOG($date: String, $owner: String, $statusFilter: STATUSFILTER) {
//     backlog(date: $date, owner: $owner, statusFilter: $statusFilter, orderBy: DAYS_DESC) {
//       escalated
//       date
//       owner
//       incident
//       incidentcreated
//       customername
//       summary
//       status
//       dayssincelastupdate
//     }
//   }
// `;

const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: "200px"
  }),
  tableheader: {
    fontFamily: "Poppins",
    fontSize: 18
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
  summary: {
    display: "flex",
    justifyContent: "space-between"
  },
  textfield: {
    verticalAlign: "center",
    margin: 10
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
}

const StatsMainContainer: React.FC<ContainerProps> = (props: any) => {
  const [date, setDate] = useState(format(Date.now(), "YYYY-MM-DD"));
  const [owner, setOwner] = useState("Michel van Huenen");
  const [value, setValue] = useState("Michel van Huenen");
  const [statusFilter, setStatusFilter] = useState("BACKLOG");
  const { loading, data } = useQuery(QUERY_BACKLOG, {
    suspend: false,
    variables: { date, deployment: "ALL" }
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!(data && data.solution_proposed)) {
    return <div>Error</div>;
  }

  return (
    <StatsMain
      classes={props.classes}
      data={data}
      onChange={(date: string) => setDate(date)}
      onOwnerChange={(owner: string) => setOwner(owner)}
    />
  );
};

interface Props {
  classes: any;
  onChange: Function;
  onOwnerChange: Function;
  data: any;
}

const StatsMain: React.FC<Props> = ({ classes, onChange, onOwnerChange, data }) => {
  const [date, setDate] = useState(format(Date.now(), "YYYY-MM-DD"));
  const [owner, setOwner] = useState("Michel van Huenen");
  const [value, setValue] = useState("SP");

  function handleChange(event: any) {
    setDate(event.target.value);
    onChange(event.target.value);
  }
  return (
    <div className={classes.root}>
      {data.mostRecentUpdate}
      <Paper className={classes.paper}>
        <TextField className={classes.textfield} id="date" value={date} onChange={handleChange} type="date" />
      </Paper>
      <div className={classes.root}>
        <BacklogTable classes={classes} backlog={data.on_hold} title="On Hold" />
        <BacklogTable classes={classes} backlog={data.solution_proposed} title="Solution Proposed" />
        <BacklogTable classes={classes} backlog={data.awaiting_customer} title="Awaiting customer" />
        <BacklogTable classes={classes} backlog={data.researching} title="Researching" />
        <BacklogTable classes={classes} backlog={data.awaiting_infor} title="Awaiting Infor" />
        <BacklogTable classes={classes} backlog={data.major_impact} title="Major Impact" />
      </div>
    </div>
  );
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: theme.palette.common.white
  },
  body: {
    fontSize: "1rem"
  }
}))(TableCell);

const BacklogTable = ({ backlog, classes, title }: any) => {
  //
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className={classes.heading}>
          {title}({backlog.length})
        </Typography>
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
                  <a href={`http://navigator.infor.com/a/incident.asp?IncidentID=${row.incident}`} target="_blank">
                    {row.incident}
                  </a>
                </TableCell>
                <TableCell>{row.severityname}</TableCell>
                <TableCell className={classes.tableheadernarrow}>{row.escalated ? "Yes" : ""}</TableCell>
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
