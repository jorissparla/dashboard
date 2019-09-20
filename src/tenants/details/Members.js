import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  colors
} from '@material-ui/core';

import getInitials from './getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  },
  actions: {
    backgroundColor: colors.grey[50]
  },
  manageButton: {
    width: '100%'
  },
  avatar: {
    fontSize: 14,
    backgroundColor: colors.deepOrange[500],
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.white
  }
}));

const Members = props => {
  const { members, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        className={classes.header}
        title="Project members"
        titleTypographyProps={{
          variant: 'overline'
        }}
      />
      <CardContent className={classes.content}>
        <List>
          {members.map(member => (
            <ListItem disableGutters key={member.id}>
              <ListItemAvatar>
                <Avatar alt="Author" className={classes.avatar} src={member.avatar}>
                  {getInitials(member.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                primaryTypographyProps={{ variant: 'h6' }}
                secondary={member.jobTitle}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button className={classes.manageButton} variant="outlined">
          Manage users
        </Button>
      </CardActions>
    </Card>
  );
};

Members.propTypes = {
  className: PropTypes.string,
  members: PropTypes.array.isRequired
};

export default Members;
