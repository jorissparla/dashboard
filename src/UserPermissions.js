import React from 'react';
import { adopt } from 'react-adopt';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import UserSearchList from './UserSearchList';
import { SharedSnackbarConsumer } from './globalState/SharedSnackbar.context';

import User from './User';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
    background: '#eee'
  },
  paper: {
    margin: 10,
    height: 1000
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  name: {
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
    alignSelf: 'center',
    width: 250
  },
  button: {
    margin: theme.spacing.unit,
    width: 150,
    marginRight: 50
  }
});

function hasPermission(permission, permissionsAr) {
  return permissionsAr.filter(p => p === permission).length > 0;
}

const PERMISSIONS_MUTATION = gql`
  mutation PERMISSIONS_MUTATION(
    $where: WhereAccountInput
    $data: UpdateAccountDataPermissionsInput
  ) {
    updatePermissions(where: $where, data: $data) {
      id
      permissions {
        permission
      }
    }
  }
`;

const QUERY_ALL_PERMISSIONS = gql`
  query QUERY_ALL_PERMISSIONS {
    allPermissions {
      id
      permission
    }
  }
`;

const Composed = adopt({
  updatePermissions: ({ render }) => (
    <Mutation mutation={PERMISSIONS_MUTATION} awaitRefetchQueries={true}>
      {render}
    </Mutation>
  ),
  allPermissions: ({ render }) => <Query query={QUERY_ALL_PERMISSIONS}>{render}</Query>,
  user: ({ render }) => <User>{render}</User>,
  usersearchList: ({ render }) => (
    <UserSearchList hintText="Enter part of name" limit={10}>
      {render}
    </UserSearchList>
  ),
  message: ({ render }) => <SharedSnackbarConsumer>{render}</SharedSnackbarConsumer>
});

class UpdatePermissions extends React.Component {
  handlePermChange = (
    id,
    currentPermissions,
    hasPermission,
    perm,
    updatePermissions,
    openSnackbar
  ) => {
    const newPermissions = hasPermission
      ? currentPermissions.filter(p => p !== perm)
      : [...currentPermissions, perm];
    updatePermissions({
      variables: {
        where: { id },
        data: { permissions: newPermissions }
      }
    }).then(() =>
      hasPermission
        ? openSnackbar(`Permission ${perm} was removed`)
        : openSnackbar(`Permission ${perm} was added`)
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <Composed>
        {({
          updatePermissions,
          allPermissions: {
            data: { allPermissions },
            loading: alsoloading
          },
          user: { data, loading },
          usersearchList: { users },
          message: { openSnackbar }
        }) => {
          if (loading || alsoloading) {
            return 'Loading';
          }
          const { me } = data;
          const permissionsAr = me.permissions.map(p => p.permission);
          if (!hasPermission('ADMIN', permissionsAr)) {
            return 'No permission';
          }
          return (
            <div>
              {users.map(({ id, fullname, permissions, image, firstname, lastname }) => {
                const current = permissions.map(p => p.permission);
                const initials = (firstname[0] + lastname[0]).toUpperCase();
                return (
                  <React.Fragment key={id}>
                    <FormGroup row>
                      {image ? (
                        <Avatar src={image} className={classes.avatar} />
                      ) : (
                        <Avatar className={classes.avatar}>{initials}</Avatar>
                      )}
                      <Typography variant="h6" gutterBottom className={classes.name}>
                        {fullname}
                      </Typography>
                      {allPermissions.map(perm => {
                        const validPermission = hasPermission(perm.permission, current);
                        return (
                          <FormControlLabel
                            key={perm.id}
                            control={
                              <Switch
                                checked={validPermission}
                                color="primary"
                                onChange={() =>
                                  this.handlePermChange(
                                    id,
                                    current,
                                    validPermission,
                                    perm.permission,
                                    updatePermissions,
                                    openSnackbar
                                  )
                                }
                                value={perm.permission}
                              />
                            }
                            label={perm.permission}
                          />
                        );
                      })}
                    </FormGroup>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </div>
          );
        }}
      </Composed>
    );
  }
}

export default withStyles(styles)(UpdatePermissions);
