import React from 'react';
import gql from 'graphql-tag';
import {  Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Save from '@material-ui/icons/Save';
import Undo from '@material-ui/icons/Undo';
import User from '../User';

const styles = theme => ({
  root: {},
  headerStyle: {
    fontSize: 18
  },
  button: {
    margin: 12,
    background: '#2196f3'
  }
});

const QUERY_PLANNEDCOURSEREQUESTS = gql`
  query QUERY_PLANNEDCOURSEREQUESTS {
    plannedcourserequests {
      id
      startdate
      hours
      details
      course {
        id
        title
      }
      students {
        fullname
      }
    }
  }
`;

class PlannedCourseRequestList extends React.Component {
  render() {
    return (
      <Query query={QUERY_PLANNEDCOURSEREQUESTS}>
        {({ data, loading }) => {
          if (loading) {
            return 'loading';
          }
          const { plannedcourserequests } = data;
          console.log(plannedcourserequests);
          return (
            <User>
              {({ data, loading }) => {
                if (loading) {
                  return 'loading';
                }
                return (
                  <React.Fragment>
                    <List>
                      {plannedcourserequests.map(
                        ({ id, startdate, hours, details, course: { title }, students }) => {
                          const partipants = students.map(st => st.fullname).join(';');
                          console.log(students);
                          return (
                            <React.Fragment>
                              <ListItem key={id}>
                                <ListItemText primary={title} secondary={details} />
                                <ListItemText primary={hours} secondary={partipants} />
                                <ListItemSecondaryAction>
                                  <Save onClick={() => console.log('test')} />

                                  <Undo onClick={() => console.log('test')} />
                                </ListItemSecondaryAction>
                              </ListItem>
                              <Divider />
                            </React.Fragment>
                          );
                        }
                      )}
                    </List>
                  </React.Fragment>
                );
              }}
            </User>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(PlannedCourseRequestList);
