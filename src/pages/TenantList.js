import React, { useEffect, useState, useContext } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../common/SearchBar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
//import format from 'date-fns/format';
import { format } from '../utils/format';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { FilterFieldContext } from '../globalState/FilterContext';
import FavoriteBadge from '../elements/Badge';
import { DashBoardContext } from './../globalState/Provider';

const ALL_TENANTS = gql`
  query q {
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
      live
    }
  }
`;

const MUTATION_MARK_LIVE = gql`
  mutation MUTATION_MARK_LIVE($input: CustomerStatusInput) {
    markLive(input: $input) {
      name
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
    width: 325,
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
  },
  main: {
    display: 'flex'
  }
});

const Main = styled.div`
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  display: flex;
`;
const Left = styled.div`
  width: ${props => (props.on ? '90vw' : '100vw')};
`;
const Right = styled.div`
  width: ${props => (props.on ? '10vw' : '0')};
`;

const Header = styled.div`
  display: flex;
`;

const TenantCard = ({ classes, customer, tenants, live, role = 'Guest' }) => {
  const [isLive, setLive] = React.useState(live);
  const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;

  //console.log(dbctx);
  return (
    <Card className={customer === 'Infor' ? classes.card2 : classes.card}>
      <CardContent>
        <Header>
          <Typography gutterBottom variant="h5" component="h2">
            {customer}
          </Typography>
          <FavoriteBadge isVisible={isLive}>Live</FavoriteBadge>
        </Header>
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
        {role === 'Admin' && (
          <Mutation mutation={MUTATION_MARK_LIVE}>
            {mutate => (
              <Switch
                checked={isLive}
                onChange={() => {
                  console.log('change' + tenants[0].customerid);
                  setLive(prev => {
                    const input = { live: 1 - prev, number: tenants[0].customerid };
                    console.log(input);
                    mutate({ variables: { input } });
                    return 1 - prev;
                  });
                }}
                value="checkedB"
                color="secondary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            )}
          </Mutation>
        )}
      </CardActions>
    </Card>
  );
};
const CloseButton = styled.button`
  position: relarive;
  top: 0;
  right: 0;
  background: transparent;
  font-size: 48px;
  font-weight: 100;
  border: none;
  align-self: flex-end;
  align-self: center;
`;
const FilterForm = ({ setSearchText, flip }) => {
  const { setFields, fields, clearFields } = useContext(FilterFieldContext);
  const addField = (name, value) => {
    const otherFields = fields.filter(o => Object.keys(o)[0] !== name);
    setFields(otherFields.concat({ [name]: value }));
    console.log('addField', name, value, fields);
  };
  const [customer, setCustomer] = useState('');
  const [farm, setFarm] = useState('');
  const [version, setVersion] = useState('');

  function setAllFields() {
    setFields({ customer, farm, version });
    // flip();
  }

  function clearAllFields() {
    setCustomer('');
    setFarm('');
    setVersion('');
    clearFields();
  }

  console.log(fields);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Filter</h1> <CloseButton onClick={() => flip()}>&times;</CloseButton>
      </div>
      <TextField
        id="customer.name"
        name="customer.name"
        type="text"
        label="Customer Name"
        placeholder="Customer Name"
        onChange={e => setCustomer(e.target.value)}
        value={customer}
      />
      <TextField
        id="farm"
        name="farm"
        type="text"
        label="farm"
        placeholder="Farm"
        onChange={e => setFarm(e.target.value)}
        value={farm}
      />
      <TextField
        id="version"
        name="version"
        type="text"
        label="version"
        placeholder="version"
        onChange={e => setVersion(e.target.value)}
        value={version}
      />
      <Button
        style={{ marginTop: 10 }}
        variant="contained"
        color="primary"
        onClick={() => setAllFields()}
      >
        Filter
      </Button>
      <Button
        style={{ marginTop: 10 }}
        variant="contained"
        color="secondary"
        onClick={() => clearAllFields()}
      >
        Clear
      </Button>
    </>
  );
};

const tenantsByCustomer = (tenants, searchText) =>
  _.chain(tenants)
    .filter(o => o.customer.name !== 'Infor')
    .filter(
      t =>
        t.customer.name.toUpperCase().includes(searchText.toUpperCase()) ||
        t.name.toUpperCase().includes(searchText.toUpperCase()) ||
        t.version.toUpperCase().includes(searchText.toUpperCase())
    )
    .sortBy(o => o.customer.name)

    .value();
const tenantsByCustomer2 = (tenants, fields) => {
  console.log('tenantsByCustomer2', fields);
  const { customer = '', farm = '', version = '' } = fields;
  console.log({ customer });
  return _.chain(tenants)
    .filter(o => o.customer.name !== 'Infor')

    .filter(t => t.customer.name.toUpperCase().includes(customer.toUpperCase()))
    .filter(t => t.farm.toUpperCase().includes(farm.toUpperCase()))
    .filter(t => t.version.toUpperCase().includes(version.toUpperCase()))
    .sortBy(o => o.customer.name)
    .value();
};

const inforTenant = tenants => tenants.filter(o => o.customer.name === 'Infor');

const TenantList = props => {
  const dbctx = React.useContext(DashBoardContext);
  let role = dbctx && dbctx.role ? dbctx.role : 'Guest';
  const { setFields, fields, clearFields } = useContext(FilterFieldContext);
  const { classes } = props;
  const [searchText, setSearchText] = useState('');
  const [on, Toggle] = useState(false);
  const { x } = useSpring({
    x: on ? 15 : 0,
    config: config.wobbly
  });

  const flip = () => Toggle(!on);
  return (
    <Query query={ALL_TENANTS}>
      {({ data, loading }) => {
        if (loading) {
          return '...Loading';
        }
        const { tenants } = data;
        const filteredTenants = tenantsByCustomer2(tenants, fields, flip);
        console.log('filterTenants', filteredTenants);
        const uniques = filteredTenants
          .map(v => v.customer.name)
          .filter((v, i, a) => a.indexOf(v) === i);
        const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;
        return (
          <Main>
            <animated.div
              style={{
                width: x.interpolate(x => `${100 - x}vw`)
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  onClick={() => {
                    // Toggle(!on);
                    // alert("ha");
                  }}
                >
                  {` Multitenant customers - last change (${format(max, 'DDMMMYYYY')})`}
                </Typography>
                <Button variant="contained" onClick={() => Toggle(!on)}>
                  Filter
                </Button>
              </div>

              <div className={classes.flex}>
                {uniques.map((customer, index) => {
                  const sub = filteredTenants.filter(o => o.customer.name === customer);
                  return (
                    <TenantCard
                      key={index}
                      classes={classes}
                      customer={customer}
                      tenants={sub}
                      role={role}
                      live={sub && sub.length >= 0 ? sub[0].live : 0}
                    />
                  );
                })}
                <TenantCard classes={classes} customer="Infor" tenants={inforTenant(tenants)} />
              </div>
            </animated.div>
            <animated.div
              style={{
                width: x.interpolate(x => `${x}vw`),
                display: 'flex',
                padding: x.interpolate(x => `${x}px`),
                flexDirection: 'column',
                boxShadow:
                  '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
              }}
            >
              {/* <SearchBar onChange={e => setSearchText(e)} /> */}
              <FilterForm setSearchText={setSearchText} flip={flip} />
            </animated.div>
          </Main>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(TenantList);
