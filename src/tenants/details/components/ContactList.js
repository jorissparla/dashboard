import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Button,
  CardHeader,
  CardActions,
  Grid,
  CardContent,
  Checkbox,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Backdrop
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  }
}));

const ContactList = props => {
  const { contacts, className, onView, ...rest } = props;
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const classes = useStyles();
  const handleSelectAll = event => {
    const selectedContacts = event.target.checked ? contacts.map(contact => contact.name) : [];

    setSelectedContacts(selectedContacts);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedContacts.indexOf(id);
    let newSelectedContacts = [];

    if (selectedIndex === -1) {
      newSelectedContacts = newSelectedContacts.concat(selectedContacts, id);
    } else if (selectedIndex === 0) {
      newSelectedContacts = newSelectedContacts.concat(selectedContacts.slice(1));
    } else if (selectedIndex === selectedContacts.length - 1) {
      newSelectedContacts = newSelectedContacts.concat(selectedContacts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedContacts = newSelectedContacts.concat(
        selectedContacts.slice(0, selectedIndex),
        selectedContacts.slice(selectedIndex + 1)
      );
    }

    setSelectedContacts(newSelectedContacts);
  };

  return (
    <Card {...rest} className={classes.root}>
      <CardHeader title="Contacts" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow selected>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedContacts.length === contacts.length}
                      color="primary"
                      indeterminate={
                        selectedContacts.length > 0 && selectedContacts.length < contacts.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((item, i) => (
                  <TableRow key={item.id} selected={i % 2 !== 0}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedContacts.indexOf(item.name) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, item.name)}
                        value={selectedContacts.indexOf(item.name) !== -1}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.jobtitle}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.Note}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        // component={RouterLink}
                        size="small"
                        onClick={e => onView(item)}
                        variant="outlined"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions>
        <Grid item md={3} xl={3} xs={3}>
          <div className={classes.actions}>
            <Button
              color="primary"
              variant="outlined"
              onClick={e =>
                onView({
                  name: '',
                  email: '',
                  jobtitle: 'Customer Contact',
                  note: ''
                })
              }
            >
              Create Contact
            </Button>
          </div>
        </Grid>
      </CardActions>
    </Card>
  );
};

ContactList.propTypes = {
  className: PropTypes.string,
  contacts: PropTypes.object.isRequired
};

export default ContactList;
