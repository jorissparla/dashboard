import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import Spinner from 'utils/spinner';
import { Typography, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'utils/format';
import { addHours } from 'date-fns';

const TableHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
    color: theme.palette.common.white,
    fontSize: '1.5rem'
  },
  body: {
    fontSize: '1rem'
  }
}))(TableCell);

const QUERY_TENANT_LOGS = gql`
  query QUERY_TENANT_LOGS {
    tenantlogs {
      id
      date
      log
    }
  }
`;

export default function TenantLogs() {
  const { loading, data } = useQuery(QUERY_TENANT_LOGS);
  if (loading) return <Spinner />;

  const { tenantlogs } = data;
  console.log(tenantlogs);
  return (
    <div>
      <Typography variant="h6">Logging</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Log</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenantlogs.map(log => (
            <TableRow key={log.id}>
              <TableCell>
                {/* {console.log(addHours(parseInt(log.date, -2)))} */}
                {format(addHours(parseInt(log.date), -2), 'YYYY MMMM DD, dddd - HH:mm')}
                {/* {format(log.date, 'hh:mm:ss')} */}
              </TableCell>
              <TableCell>{log.log}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
