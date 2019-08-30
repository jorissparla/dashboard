import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import Spinner from 'utils/spinner';
import { Typography, withStyles, Button, TableFooter } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TablePagination } from '@material-ui/core';
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

export function TenantLogsWithData() {
  const { loading, data } = useQuery(QUERY_TENANT_LOGS);
  if (loading) return <Spinner />;
  const { tenantlogs } = data;
  return <TenantLogs tenantlogs={tenantlogs} />;
}

const MAX_PAGE_LENGTH = 12;

function guid() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export default function TenantLogs({ tenantlogs }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [lastPage, setLastPage] = React.useState(0);
  const [selectedTenantLogs, setSelectedTenantLogs] = React.useState([]);
  React.useEffect(() => {
    setLastPage(parseInt(tenantlogs.length / MAX_PAGE_LENGTH));
    setSelectedTenantLogs(tenantlogs);
  }, []);
  function handleNextPage() {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }
  console.log(selectedTenantLogs);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5
        }}
      >
        <Typography variant="h6">
          Logging - {` page ${currentPage + 1} of ${lastPage === 0 ? 1 : lastPage} pages`}
        </Typography>
        <TablePagination
          component="div"
          count={selectedTenantLogs.length}
          page={currentPage}
          rowsPerPageOptions={[12]}
          rowsPerPage={12}
          onChangePage={(e, page) => setCurrentPage(page)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Log</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedTenantLogs
            .slice(currentPage * MAX_PAGE_LENGTH, (currentPage + 1) * MAX_PAGE_LENGTH)
            .map((log, i) => (
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
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
