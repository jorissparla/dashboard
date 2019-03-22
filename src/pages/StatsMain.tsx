import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { Paper, Typography, withStyles, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { format } from '../utils/format';
import OwnerList from '../stats/OwnerList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';

const QUERY_BACKLOG = gql`
  query QUERY_BACKLOG($date: String) {
    backlog(date: $date, owner: "Michel van Huenen") {
      date
      owner
      incident
    }
  }
`;

interface Props {
  classes: any;
}

const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '200px'
  }),
  textfield: {
    verticalAlign: 'bottom',
    margin: 10
  }
});

const StatsMain: React.FC<Props> = ({ classes }) => {
  const [backlog, setBacklog] = useState([]);
  const { loading, data } = useQuery(QUERY_BACKLOG, {
    suspend: false,
    variables: { date: format(Date.now(), 'YYYY-MM-DD') }
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!(data && data.backlog)) {
    return <div>Error</div>;
  }

  //setBacklog(data.backlog);

  console.log('backlog', backlog);

  const initialValues = {
    date: format(Date.now(), 'YYYY-MM-DD'),
    owner: ''
  };

  function handleChange(values: string) {
    console.log(values);
  }
  return (
    <div className={classes.root}>
      <Paper>
        <Formik initialValues={initialValues} onSubmit={() => null}>
          {({ handleChange, handleBlur, values }) => {
            console.log(values);
            return (
              <>
                <OwnerList onChange={(v: string) => handleChange(v)} />
                <TextField
                  className={classes.textfield}
                  id="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                />
              </>
            );
          }}
        </Formik>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(StatsMain);
