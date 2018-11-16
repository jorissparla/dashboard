import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import User from './User';

export default class UserView extends React.Component {
  render() {
    return (
      <Paper>
        <User>
          {({ data, loading }) => {
            if (loading) {
              return 'Loading';
            }
            console.log(data);
            return <h1>Hallo</h1>;
          }}
        </User>
      </Paper>
    );
  }
}
