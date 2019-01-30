import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Save from '@material-ui/icons/Save';
import Undo from '@material-ui/icons/Undo';
import User from '../User';
import AcceptPlannedCourseRequest from '../courses/AcceptPlannedCourseRequest';
import DeletePlannedCourseRequest from '../courses/DeletePlannedCourseRequest';

const styles = theme => ({
  root: {},
  headerStyle: {
    fontSize: 18
  },
  button: {
    margin: 12,
    background: '#2196f3'
  },
  listItem: {
    minWidth: '45vw'
  }
});

export const QUERY_PLANNEDCOURSEREQUESTS = gql`
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
    const { classes } = this.props;
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
                            <React.Fragment key={id}>
                              <ListItem key={id}>
                                <ListItemText
                                  primary={title}
                                  secondary={details || title}
                                  className={classes.listItem}
                                />
                                <ListItemText
                                  primary={`Hours: ${hours} Date: ${startdate}`}
                                  secondary={partipants}
                                  className={classes.listItem}
                                />
                                <ListItemSecondaryAction>
                                  <AcceptPlannedCourseRequest id={id} />
                                  <DeletePlannedCourseRequest id={id} />
                                </ListItemSecondaryAction>
                                <ListItemSecondaryAction />
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
