import React, { useContext, useState, useEffect } from 'react';
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
import { SelectionContext } from '../globalState/SelectionContext';
import SortIcon from '@material-ui/icons/SwapVert';
import _ from 'lodash';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: theme.palette.common.white
  },
  body: {
    fontSize: '1rem'
  }
}))(TableCell);

interface TableHeaderColumnProps {
  column: string;
  title: string;
  handleSortChange: Function;
  className: string;
}

const TableHeaderColumn: React.FC<TableHeaderColumnProps> = ({
  column,
  title,
  handleSortChange,
  className
}) => (
  <TableCell
    style={{
      fontSize: 16,
      display: 'flex',
      justifyContent: 'center',
      textTransform: 'uppercase',
      backgroundColor: 'rgb(0,0,0, 0.5)',
      color: 'white'
    }}
    key={title}
  >
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <SortIcon onClick={() => handleSortChange(column)} color="primary" />
      {title.toUpperCase()}
    </div>
  </TableCell>
);

const AnotherCustomTableCell = ({ title, column, handleSortChange, className }: any) => {
  return (
    <TableCell
      onClick={() => {
        handleSortChange(column);
      }}
      className={className}
    >
      {title}
    </TableCell>
  );
};

const STHC = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: theme.palette.common.white
  },
  body: {
    fontSize: '1rem'
  }
}))(AnotherCustomTableCell);

type sortType = 'desc' | 'asc';

export const BacklogTable = ({ backlog, classes, title, description = title }: any) => {
  //

  const initialValue = { name: '', direction: '' };
  const { actionNeeded } = useContext(SelectionContext);
  const [sorted, setSorted] = useState(initialValue);

  function sortUp(leftSide: any, rightSide: any) {
    const col = 'customername';
    const order = 'desc';
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
  useEffect(() => {
    if (sorted.name) {
      mydata = sorted.direction === 'asc' ? backlog.sort(sortUp) : backlog.sort(sortUp);
      console.log(sorted);
    }
  });

  if (actionNeeded && backlog.length === 0) {
    return <div />;
  }

  function handleSortChange(column: string) {
    if (sorted.name === column) {
      setSorted({ ...sorted, direction: sorted.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSorted({ name: column, direction: 'asc' });
    }
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
              <CustomTableCell className={classes.tableheadernarrow}>Customer </CustomTableCell>
              <CustomTableCell className={classes.tableheadernarrow}>Owner </CustomTableCell>
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
                  <a
                    href={`http://navigator.infor.com/n/incident.asp?IncidentID=${row.incident}`}
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
