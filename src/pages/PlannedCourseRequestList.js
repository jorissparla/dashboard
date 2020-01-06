import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
//import { format } from "date-fns";
import { format } from '../utils/format';
import styled from 'styled-components';
import User from '../User';
import AcceptPlannedCourseRequest from '../courses/AcceptPlannedCourseRequest';
import DeletePlannedCourseRequest from '../courses/DeletePlannedCourseRequest';
import { Button } from '@material-ui/core';

const Header = styled.div`
  display: flex;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 10px;
  border-radius: 4px;
  padding-bottom: 10px;
  justify-content: center;
  background-color: #eeeeee;
`;

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
      course {
        id
      }
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
    let enabled = false;
    return (
      <Query query={QUERY_PLANNEDCOURSEREQUESTS}>
        {({ data, loading }) => {
          if (loading) {
            return 'loading';
          }
          const { plannedcourserequests } = data;
          let approver = '';
          return (
            <User>
              {({ data, loading }) => {
                if (loading) {
                  return 'loading';
                }
                if (data && data.me) {
                  enabled = ['Admin', 'PO'].some(item => item === data.me.role);
                  approver = data.me.email;
                }

                return (
                  <React.Fragment>
                    <Header className={classes.header}>
                      <h3>List of requests</h3>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => this.props.history.push('/addplannedcourserequest')}
                      >
                        Add
                      </Button>
                    </Header>
                    <List>
                      {plannedcourserequests.map(
                        ({
                          course,
                          id,
                          startdate,
                          hours,
                          details,
                          course: { title },
                          students
                        }) => {
                          const courseid = course.id;
                          const partipants = students.map(st => st.fullname).join(';');
                          const date = format(startdate, ' EEE, dd MMM yyyy');
                          return (
                            <React.Fragment key={id}>
                              <ListItem key={id}>
                                <ListItemText
                                  primary={title}
                                  secondary={details || title}
                                  className={classes.listItem}
                                />
                                <ListItemText
                                  primary={`⏰: ${hours} Hours, 📅 Date: ${date}`}
                                  secondary={partipants}
                                  className={classes.listItem}
                                />
                                {enabled && (
                                  <ListItemSecondaryAction>
                                    <AcceptPlannedCourseRequest
                                      id={id}
                                      courseid={courseid}
                                      approver={approver}
                                    />
                                    <DeletePlannedCourseRequest id={id} />
                                  </ListItemSecondaryAction>
                                )}
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

export default withStyles(styles)(withRouter(PlannedCourseRequestList));
