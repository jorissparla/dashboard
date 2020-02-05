import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import Header from './Header';
import Members from './Members';

const members = [
  { jobTitle: 'Customer Success Manager', name: 'Della Kent', email: 'Della.Kent@infor.com' },
  { jobTitle: 'Customer Project Manager', name: 'John Doe', email: 'john.doe@customer.com' },
  { jobTitle: 'Customer Project Manager', name: 'John Doe', email: 'john.doe@customer.com' }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },

  content: {
    marginTop: theme.spacing(3)
  }
}));

const Details = props => {
  const { className } = props;
  const classes = useStyles();

  return (
    <div className={classes.root} title="Settings">
      <Header />
      <Grid className={clsx(classes.root, className)} container spacing={3}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <Members members={members} />
        </Grid>
        <Grid item lg={8} md={6} xl={9} xs={12}>
          <Members members={members} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
