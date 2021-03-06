import React, { Component } from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import NewsList from "./newslist";
import withAuth from "../utils/withAuth";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },

  root: theme.mixins.gutters({
    marginTop: theme.spacing(3),
  }),
});

const QUERY_NEWS = gql`
  query QUERY_NEWS {
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

  onOpen = (id) => {
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
                <Typography variant="display3" gutterBottom>
                  News
                </Typography>
                <Button variant="fab" color="secondary" aria-label="add" className={classes.button} onClick={() => this.onNew()}>
                  <AddIcon />
                </Button>
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
