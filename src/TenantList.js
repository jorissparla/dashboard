import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchBar from './common/SearchBar';
import Chip from '@material-ui/core/Chip';
import format from 'date-fns/format';

const ALL_TENANTS = gql`
  {
    tenants {
      id
      farm
      name
      version
      customerid
      customer {
        name
      }
      lastupdated
    }
  }
`;

const styles = theme => ({
  root: {
    width: '90vw',
    margin: '10px',
    backgroundColor: theme.palette.background.paper
  },
  itemtitle: {
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 800
  },
  card: {
    minWidth: 275,
    margin: 10,
    width: 275,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  card2: {
    minWidth: 275,
    margin: 10
  },
  chip: {
    margin: theme.spacing.unit,
    marginBottom: 2
  },
  avatar: {
    margin: 10
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    background: '#eee'
  },
  flex2: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  flexBot: {
    display: 'flex',
    justifySelf: 'flex-end'
  },
  bigAvatar: {
    width: 100,
    height: 50,
    borderRadius: '50%',
    justifyContent: 'center',
    paddingTop: '15px',
    fontWeight: 800
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#81D4FA'
  }
});

const TenantCard = ({ classes, customer, tenants }) => {
  const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;
  return (
    <Card className={customer === 'Infor' ? classes.card2 : classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {customer}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {tenants.length > 0 && tenants[0].farm}
        </Typography>
        <div className={classes.flex2}>
          {tenants.map(({ id, name, version }) => (
            <Chip key={id} label={`${name}:${version}`} className={classes.chip} color="primary" />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            window.open(
              'http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=' +
                tenants[0].customerid
            )
          }
        >
          Incidents
        </Button>
        <Button variant="contained">{format(max, 'DDMMMYYYY')}</Button>
      </CardActions>
    </Card>
  );
};

const tenantsByCustomer = (tenants, searchText) =>
  _.chain(tenants)
    .filter(o => o.customer.name !== 'Infor')
    .filter(
      t =>
        t.customer.name.toUpperCase().includes(searchText.toUpperCase()) ||
        t.name.toUpperCase().includes(searchText.toUpperCase())
    )
    .sortBy(o => o.customer.name)

    .value();

const inforTenant = tenants => tenants.filter(o => o.customer.name === 'Infor');

class TenantList extends Component {
  state = { searchText: '' };

  handleSearchChange = e => {
    this.setState({ searchText: e });
  };
  avatars = index => {
    const ar = ['classes.orangeAvatar', 'classes.purpleAvatar', 'classes.blueAvatar'];
    return ar[index % 2];
  };
  render() {
    const { classes } = this.props;

    return (
      <Query query={ALL_TENANTS}>
        {({ data, loading }) => {
          if (loading) {
            return '...Loading';
          }
          const { tenants } = data;
          const filteredTenants = tenantsByCustomer(tenants, this.state.searchText);
          const uniques = filteredTenants
            .map(v => v.customer.name)
            .filter((v, i, a) => a.indexOf(v) === i);
          console.log(uniques);
          const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;
          return (
            <React.Fragment>
              <Typography gutterBottom variant="h5" component="h2">
                {` Multitenant customers - last change (${format(max, 'DDMMMYYYY')})`}
              </Typography>
              <SearchBar onChange={this.handleSearchChange} />
              <div className={classes.flex}>
                {uniques.map((customer, index) => {
                  const sub = filteredTenants.filter(o => o.customer.name === customer);
                  return (
                    <TenantCard key={index} classes={classes} customer={customer} tenants={sub} />
                  );
                })}
                <TenantCard classes={classes} customer="Infor" tenants={inforTenant(tenants)} />
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(TenantList);
