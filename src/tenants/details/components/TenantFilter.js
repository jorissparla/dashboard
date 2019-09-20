import { Button, Divider, Drawer, Switch, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  drawer: {
    width: 420,
    maxWidth: '100%'
  },
  header: {
    padding: theme.spacing(2, 1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  content: {
    padding: theme.spacing(0, 3),
    flexGrow: 1
  },
  contentSection: {
    padding: theme.spacing(2, 0)
  },
  contentSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  contentSectionContent: {},
  formGroup: {
    padding: theme.spacing(2, 0)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  flexGrow: {
    flexGrow: 1
  },
  addButton: {
    marginLeft: theme.spacing(1)
  },
  tags: {
    marginTop: theme.spacing(1)
  },
  minAmount: {
    marginRight: theme.spacing(3)
  },
  maxAmount: {
    marginLeft: theme.spacing(3)
  },
  radioGroup: {},
  actions: {
    padding: theme.spacing(3),
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Filter = props => {
  const { open, onClose, onFilter, className, ...rest } = props;

  const classes = useStyles();

  const initialValues = {
    customerName: '',
    tenantName: '',
    tenantVersion: '',
    farmName: '',
    isLive: false
  };

  const [expandCustomer, setExpandCustomer] = useState(true);
  const [values, setValues] = useState({ ...initialValues });

  const handleClear = () => {
    setValues({ ...initialValues });
  };

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };
  const handleChange = event => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
  };
  const handleTagAdd = () => {
    setValues(values => {
      const newValues = { ...values };

      if (newValues.tag && !newValues.tags.includes(newValues.tag)) {
        newValues.tags = [...newValues.tags];
        newValues.tags.push(newValues.tag);
      }

      newValues.tag = '';

      return newValues;
    });
  };

  const handleTagDelete = tag => {
    setValues(values => {
      const newValues = { ...values };

      newValues.tags = newValues.tags.filter(t => t !== tag);

      return newValues;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log({ values });
    onFilter && onFilter(values);
  };

  const customerStatusOptions = ['', 'NORMAL', 'WATCH', 'ALERT'];
  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <Button onClick={onClose} size="small">
            <CloseIcon className={classes.buttonIcon} />
            Close
          </Button>
        </div>
        <div className={classes.content}>
          <div className={classes.contentSection}>
            <div className={classes.contentSectionHeader}>
              <Typography variant="h5">Filter</Typography>
            </div>
            <div className={classes.contentSectionContent}>
              <div className={classes.contentSectionContent}>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Customer name"
                    margin="dense"
                    name="customerName"
                    onChange={event => handleFieldChange(event, 'customerName', event.target.value)}
                    value={values.customerName}
                    variant="outlined"
                  />
                </div>
                <div className={classes.formGroup}>
                  <Typography variant="h6">Live</Typography>
                  <Typography variant="body2">Shows only customers that are live</Typography>
                  <Switch
                    checked={values.isLive}
                    color="primary"
                    edge="start"
                    name="isLive"
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Tenant Version"
                    margin="dense"
                    name="tenantVersion"
                    onChange={event =>
                      handleFieldChange(event, 'tenantVersion', event.target.value)
                    }
                    value={values.tenantVersion}
                    variant="outlined"
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Tenant name"
                    margin="dense"
                    name="tenantName"
                    onChange={event => handleFieldChange(event, 'tenantName', event.target.value)}
                    value={values.tenantName}
                    variant="outlined"
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Farm Name"
                    margin="dense"
                    name="farmName"
                    onChange={event => handleFieldChange(event, 'farmName', event.target.value)}
                    value={values.farmName}
                    variant="outlined"
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Customer Temperature"
                    margin="dense"
                    name="temperature"
                    onChange={event => handleFieldChange(event, 'temperature', event.target.value)}
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={values.temperature}
                    variant="outlined"
                  >
                    <option disabled value="" />
                    {customerStatusOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <Button fullWidth onClick={handleClear} variant="contained">
            <DeleteIcon className={classes.buttonIcon} />
            Clear
          </Button>
          <Button color="primary" fullWidth type="submit" variant="contained">
            Apply filters
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default Filter;
