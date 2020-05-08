import { Typography, withStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useContext, useState } from "react";
import { SelectionContext } from "../globalState/SelectionContext";
import { format } from "./../utils/format";

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: "1rem",
  },
}))(TableCell);

const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

interface TableHeaderColumnProps {
  column: string;
  title: string;
  handleSortChange: Function;
  className: string;
}

type sortType = "desc" | "asc";

export const BacklogTable = ({
  backlog,
  additionalFields = [],
  classes,
  title,
  description = title,
  filterValues = { owner: "", products: ["LN"], region: "EMEA" },
  includeservicerestored = false,
}: any) => {
  //
  // console.log(filterValues);
  const initialValue = { name: "", direction: "" };
  const { actionNeeded } = useContext(SelectionContext);
  // const [sorted, setSorted] = useState(initialValue);

  const { owner, products, region } = filterValues;

  function sortUp(leftSide: any, rightSide: any) {
    const col = "customername";
    let result = 0;

    if (leftSide[col] > rightSide[col]) {
      result = 1;
    }
    if (leftSide[col] === rightSide[col]) {
      result = 0;
    }
    if (leftSide[col] > rightSide[col]) {
      result = -1;
    }
    return -1 * result;
  }

  let mydata = backlog;

  if (!backlog) {
    return <div></div>;
  }
  if (actionNeeded && backlog.length === 0) {
    return <div />;
  }

  mydata = owner ? mydata.filter((o: any) => o.owner === owner) : mydata;
  mydata = products.length ? mydata.filter((o: any) => products.includes(o.productline)) : mydata;
  mydata = region ? mydata.filter((o: any) => o.owner_region === region) : mydata;
  if (!mydata.length) {
    return <div></div>;
  }
  return (
    <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
      <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
        <div className={classes.spaceapart}>
          <Typography variant="h6" className={classes.heading}>
            {title}({mydata.length})
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
              <CustomTableCell className={classes.tableheadernarrow}>Customer </CustomTableCell>
              <CustomTableCell className={classes.tableheadernarrow}>Owner </CustomTableCell>
              {additionalFields.map((fld: string) => (
                <CustomTableCell key={fld} className={classes.tableheadernarrow}>
                  {capitalize(fld)}
                </CustomTableCell>
              ))}
              {/* <TableHeaderColumn
                column="customer"
                title="customer"
                handleSortChange={handleSortChange}
                className={classes.tableheader}
              >
                Customer
              </TableHeaderColumn>
              <STHC
                className={classes.tableheader}
                title="owner"
                handleSortChange={handleSortChange}
                column="owner"
              /> */}
              {includeservicerestored && (
                <>
                  <CustomTableCell className={classes.tableheader}>Created</CustomTableCell>
                  <CustomTableCell className={classes.tableheader}>Restored?</CustomTableCell>
                </>
              )}
              <CustomTableCell className={classes.tableheader}>Status</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Last Updated</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Age</CustomTableCell>
              <CustomTableCell className={classes.tableheader}>Summary</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mydata.sort(sortUp).map((row: any, index: number) => (
              <TableRow key={index} className={classes.row}>
                <TableCell component="th" scope="row">
                  <a href={`http://navigator.infor.com/n/incident.asp?IncidentID=${row.incident}`} target="_blank">
                    {row.incident}
                  </a>
                </TableCell>
                <TableCell>{row.severityname}</TableCell>
                <TableCell className={classes.tableheadernarrow}>
                  {row.escalated ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-pink-100 text-pink-800">
                      Yes
                    </span>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>{row.customername}</TableCell>
                <TableCell>{row.owner}</TableCell>
                {additionalFields.map((fld: string) => (
                  <TableCell key={fld}>{row[fld]}</TableCell>
                ))}
                {includeservicerestored && (
                  <>
                    <TableCell>{row.incidentcreated ? format(row.incidentcreated, "yyyy-MM-dd") : ""}</TableCell>
                    <TableCell>{row.service_restored_date ? format(row.service_restored_date, "yyyy-MM-dd") : ""}</TableCell>
                  </>
                )}
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
