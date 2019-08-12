import { Fab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import NewsList from '../news/newslist';
import withAuth from '../utils/withAuth';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },

  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3
  })
});

const QUERY_NEWS = gql`
  {
    news {
      title
      body
      img
      expire_date
      id
    }
  }
`;

class Test extends Component {
  state = {};

  onOpen = id => {
    this.props.history.replace(`/news/edit/${id}`);
  };

  onNew() {
    this.props.history.push(`/news/add`);
  }

  render() {
    const { authenticated, classes } = this.props;
    return (
      <Query query={QUERY_NEWS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error! ${error.message}</div>;
          const { news } = data;
          return (
            <React.Fragment>
              <Paper className={classes.root}>
                <Typography variant="h3" gutterBottom>
                  News
                </Typography>
                <Fab
                  color="secondary"
                  aria-label="add"
                  className={classes.button}
                  onClick={() => this.onNew()}
                >
                  <AddIcon />
                </Fab>
                <NewsList news={news} onEdit={this.onOpen} authenticated={authenticated} />
              </Paper>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(withRouter(withStyles(styles)(Test)));
