import React, { useContext } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SelectionContext } from './SelectionContext';
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: theme.palette.common.white
  },
  body: {
    fontSize: '1rem'
  }
}))(TableCell);
export const BacklogTable = ({ backlog, classes, title, description = title }: any) => {
  //
  const { actionNeeded } = useContext(SelectionContext);
  if (actionNeeded && backlog.length === 0) {
    return <div />;
  }
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
