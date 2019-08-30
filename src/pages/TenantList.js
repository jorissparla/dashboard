import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import _ from 'lodash';
import Modal from 'ModalWrapper';
import React, { useContext, useState } from 'react';
import { Mutation, Query, useQuery } from 'react-apollo';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import FavoriteBadge from '../elements/Badge';
import { FilterFieldContext } from '../globalState/FilterContext';
//import format from 'date-fns/format';
import { distanceInWordsToNow, format } from '../utils/format';
import { DashBoardContext } from './../globalState/Provider';
import TenantLogs from './TenantLogs';
import Spinner from 'utils/spinner';

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
    updatestatus(name: "TenantList") {
      id
      updatedAt
    }
    tenantlogs {
      id
      date
      log
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
    justifyContent: 'space-between',
    backgroundImage: 'linear-gradient(to right bottom, rgb(128, 216, 255), white)',
    borderRadius: 14
  },
  card2: {
    minWidth: 275,
    margin: 10
  },
  chip: {
    margin: theme.spacing(1),
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
  },
  spaceFooter: {
    justifyContent: 'space-between'
  }
});

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 2px 8px 10px rgba(0, 0, 0, 0.26);
  margin: 1px;
  background: white;
  padding: 1rem;
`;
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

const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.33;
`;

export const TextSpan = styled.span`
  padding-top: 2px;
  margin-left: 10px;
  margin-right: 10px;
`;

const TenantCard = ({
  classes,
  customer,
  tenants,
  live = false,
  role = 'Guest',
  onStatusChange = () => console.log('change')
}) => {
  const [isLive, setLive] = React.useState(live || false);
  const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;

  //console.log(dbctx);
  return (
    <Card className={customer === 'Infor' ? classes.card2 : classes.card}>
      <CardContent>
        <Header>
          {/* <Typography gutterBottom variant="h5" component="H2"> */}
          <H2>{customer}</H2>
          {/* </Typography> */}
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
      <CardActions className={classes.spaceFooter}>
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
                  // console.log("change" + tenants[0].customerid);
                  setLive(prev => {
                    const input = { live: 1 - prev, number: tenants[0].customerid };
                    // console.log(input);
                    mutate({ variables: { input } });
                    onStatusChange();
                    return prev === 1 ? false : true;
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
    // console.log("addField", name, value, fields);
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

  // console.log(fields);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setAllFields();
      }}
    >
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
        // type="submit"
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
    </form>
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
  // console.log("tenantsByCustomer2", fields);
  const { customer = '', farm = '', version = '' } = fields;
  // console.log({ customer });
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
  const [showFilterDialog, toggleShowFilterDialog] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [counter, setCounter] = useState(0);
  const { x } = useSpring({
    x: showFilterDialog ? 15 : 0,
    config: config.wobbly
  });
  const flip = () => toggleShowFilterDialog(!showFilterDialog);
  const { data, loading } = useQuery(ALL_TENANTS);
  if (loading) {
    return <Spinner />;
  }
  const { tenants, updatestatus, tenantlogs } = data;
  const { updatedAt } = updatestatus;
  let tenantcustomersWithFarm = _.countBy(
    tenants.map(({ farm, tenant }) => ({ farm, tenant })),
    'farm'
  );
  const totalTenants = Object.entries(tenantcustomersWithFarm).reduce(
    (count, item) => count + item[1],
    0
  );
  const filteredTenants = tenantsByCustomer2(tenants, fields, flip);
  // console.log("filterTenants", filteredTenants);
  const uniqueCustomers = filteredTenants
    .map(({ farm, customer: { name } }) => name)
    .filter((ten, i, all) => all.indexOf(ten) === i);
  const listOfCustomerAndFarm = tenants
    .filter(item => item.customerid !== null)
    .map(({ customerid, farm }) => ({ customerid, farm }));
  const custFarms = _.countBy(_.uniqWith(listOfCustomerAndFarm, _.isEqual), 'farm');
  const liveCustomers = _.uniqWith(
    tenants.map(t => ({ customer: t.customer.name, live: t.live })),
    _.isEqual
  ).filter(t => t.live === 1);
  const totalCustomers = Object.entries(custFarms).reduce((count, item) => count + item[1], 0);
  const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;
  const nrOfLiveCustomers = uniqueCustomers.filter(t => t.live).length;
  return (
    <Main>
      <animated.div
        style={{
          width: x.interpolate(x => `${100 - x}vw`)
        }}
      >
        <Article>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              letterSpacing: '0.2rem'
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              <span style={{ letterSpacing: '0.2rem', textTransform: 'uppercase' }}>
                {/* {` Multitenant customers - last change -${format(max, 'DD MMM YYYY')}`} */}
                {` Multitenant customers `}
              </span>
              <Chip
                label={
                  updatedAt
                    ? `Last check:  ${distanceInWordsToNow(
                        updatedAt
                      )} ago,  Last change made ${format(max, 'DD MMM YYYY')} `
                    : 'not Saved yet'
                }
                style={{
                  marginRight: 10
                }}
              />
              <Button
                variant="contained"
                style={{
                  color: 'white',
                  backgroundColor: 'black'
                }}
                onClick={() => setShowLogs(!showLogs)}
              >
                Logs
              </Button>
            </Typography>
            <Button variant="contained" onClick={() => toggleShowFilterDialog(!showFilterDialog)}>
              Filter
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: 2,
              marginTop: 10,
              letterSpacing: '0.2rem'
            }}
          >
            <TextSpan>TENANTS: ({totalTenants})</TextSpan>
            {Object.entries(tenantcustomersWithFarm).map(item => {
              // console.log(item[0]);
              const text = `${item[0]} : ${item[1]}`;
              return (
                <FavoriteBadge key={text} isVisible={true} color="#40a5ed" style={{ margin: 3 }}>
                  {text}
                </FavoriteBadge>
              );
            })}
            <TextSpan>CUSTOMERS:({totalCustomers})</TextSpan>
            {Object.entries(custFarms).map(item => {
              const text = `${item[0]} : ${item[1]}`;
              return (
                <FavoriteBadge key={text} isVisible={true} color="purple" style={{ margin: 3 }}>
                  {text}
                </FavoriteBadge>
              );
            })}
            <TextSpan>LIVE: ({liveCustomers.length})</TextSpan>
          </div>
        </Article>

        <div className={classes.flex}>
          {uniqueCustomers.map((customer, index) => {
            const sub = filteredTenants.filter(o => o.customer.name === customer);

            const liveCust = sub[0].live === 1 ? true : false;
            return (
              <TenantCard
                key={index}
                classes={classes}
                customer={customer}
                tenants={sub}
                role={role}
                live={liveCust}
                onStatusChange={() => setCounter(counter + 1)}
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
      <Modal on={showLogs} toggle={() => setShowLogs(!showLogs)} height={80}>
        <TenantLogs tenantlogs={tenantlogs} />
      </Modal>
    </Main>
  );
};

export default withStyles(styles)(TenantList);
