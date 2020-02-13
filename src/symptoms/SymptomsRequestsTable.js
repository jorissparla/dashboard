import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { ymdFormat } from './../utils/format';
import { Checkbox } from '@material-ui/core';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import { DELETE_SYMPTOM_REQUEST_MUTATION, ALL_SYMPTOMS } from './Queries';
import { useMutation } from 'react-apollo';
import { DashBoardContext } from './../globalState/Provider';
import { UserContext } from 'globalState/UserProvider';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    fontSize: 18,
    fontFamily: 'Roboto'
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 16
  }
}))(TableCell);

export default function SimpleTable({ data, onSelected = v => console.log(v) }) {
  const classes = useStyles();
  const { role = 'Guest' } = React.useContext(DashBoardContext);
  const { user } = React.useContext(UserContext);
  const [selected, setSelected] = useState(null);

  const [deleteSymptomRequest] = useMutation(DELETE_SYMPTOM_REQUEST_MUTATION);

  function handleChange(value) {
    if (selected === value) {
      setSelected(null);
      onSelected(null);
    } else {
      setSelected(value);
      onSelected(data.find(row => row.id === value));
      // onSelected(value);
    }
  }

  async function deleteRow(id) {
    await deleteSymptomRequest({
      variables: { where: { id } },
      refetchQueries: [{ query: ALL_SYMPTOMS }]
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox">
              {selected && role === 'Admin' ? (
                <DeleteIcon onClick={() => deleteRow(selected)} />
              ) : (
                <div>select</div>
              )}
            </StyledTableCell>
            <StyledTableCell>Symptom</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Incident</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Updated </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox onClick={() => handleChange(row.id)} checked={row.id === selected} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.symptom}
              </TableCell>
              <TableCell align="right">{row.symptom_category}</TableCell>
              <TableCell align="right">{row.incident}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{ymdFormat(row.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
