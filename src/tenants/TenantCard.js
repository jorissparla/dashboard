import {
  Grid,
  Typography,
  Switch,
  Chip,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Divider,
  Avatar,
  TextField,
  Modal,
  Backdrop
} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import _ from 'lodash';
import React from 'react';
import { Mutation, useQuery } from 'react-apollo';
import FavoriteBadge from '../elements/Badge';
import { format, distanceInWordsToNow } from '../utils/format';
import { MUTATION_MARK_LIVE, QUERY_TENANT_DETAIL } from './TenantQueries';
import Label from './details/components/Label';
import EditTenantDetails from './details/components/EditTenant';
import { Header, H2 } from './TenantStyledElements';
import Spinner from 'utils/spinner';
import EditIcon from '@material-ui/icons/Edit';
export const TenantCard = ({
  classes,
  customer,
  customerid,
  tenants,
  tenantdetails,
  live,
  role = 'Guest',
  onStatusChange = () => console.log('change'),
  infoClicked
}) => {
  const [isLive, setLive] = React.useState(live);
  const [isOpen, setisOpened] = React.useState(false);

  // const { data, loading } = useQuery(QUERY_TENANT_DETAIL, { variables: { input: { customerid } } });
  // if (loading) {
  //   return <Spinner />;
  // }
  let tenantcustomerdetail;
  if (customer !== 'Infor' && tenantdetails) {
    tenantcustomerdetail = tenantdetails;
  } else {
    tenantcustomerdetail = {
      id: '',
      customer: {
        name: ''
      },
      customerid: '',
      golivedate: '',
      golivecomments: '',
      csm: '',
      pm: '',
      info: ''
    };
  }
  // console.log(customer, tenantcustomerdetail);
  let golivedate = tenantcustomerdetail.golivedate;
  if (golivedate && golivedate !== '1568419200000' && golivedate !== '0') {
    golivedate = format(tenantcustomerdetail.golivedate, 'MMM, DD, YYYY');
  } else golivedate = 'Date is not known';

  const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;
  const max2 = distanceInWordsToNow(max);
  if (customer === 'Azteka Consulting GmbH') console.log(customer, { isLive }, live);
  return (
    <>
      <Card className={customer === 'Infor' ? classes.card2 : classes.card}>
        <CardContent>
          {/* <Header>
          <H2>{customer}</H2>

          <FavoriteBadge isVisible={live}>Live</FavoriteBadge>
        </Header> */}
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar className={live ? classes.live : classes.notlive} alt="Author">
                {live ? 'Live' : ''}
              </Avatar>
            }
            title={customer}
            disableTypography
            subheader={<Typography variant="body2">Updated {max2} ago</Typography>}
          />
          <Typography className={classes.pos} color="textSecondary">
            {tenants.length > 0 && tenants[0].farm}
          </Typography>
          <div className={classes.description}>
            <Typography color="textSecondary" variant="subtitle2">
              {tenantcustomerdetail.golivecomments
                ? tenantcustomerdetail.golivecomments
                : 'Information about the customer will be shown here'}
            </Typography>
          </div>
          <div className={classes.tags}>
            {tenants.map(({ id, name, version }) => {
              const shortname = name.split('_')[1];
              const color =
                shortname === 'PRD'
                  ? 'rgba(46, 202, 19, 1)'
                  : shortname === 'TRN'
                  ? '#1da1f2'
                  : 'rgba(0,0,0,0.5)';
              return (
                // <Chip
                //   key={id}
                //   label={`${shortname}:${version}`}
                //   className={classes.chip}
                //   color="primary"
                // />
                <Label key={id} color={color}>{`${shortname}:${version}`}</Label>
              );
            })}
          </div>
          <Divider />
          <Grid alignItems="center" container justify="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h5">PM</Typography>
              <Typography variant="body2">
                {tenantcustomerdetail.pm ? tenantcustomerdetail.pm : 'PM not entered'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">CSM</Typography>
              <Typography variant="body2">
                {' '}
                {tenantcustomerdetail.csm ? tenantcustomerdetail.csm : 'CSM not entered'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Go Live Date</Typography>
              <Typography variant="body2">{golivedate}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.spaceFooter}>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              window.open(
                'http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=' +
                  tenants[0].customerid
              )
            }
          >
            <ListIcon className={classes.filterButton} />
            Incidents
          </Button>
          {role === 'Admin' && (
            <Button variant="outlined" color="primary" onClick={() => setisOpened(true)}>
              Edit
            </Button>
          )}
          {role === 'Admin' && (
            <Mutation mutation={MUTATION_MARK_LIVE}>
              {mutate => (
                <Switch
                  checked={live}
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
      <Modal
        onClose={() => setisOpened(false)}
        open={isOpen}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <EditTenantDetails profile={tenantcustomerdetail} onClose={() => setisOpened(false)} />
        {/* </Grid> */}
      </Modal>
    </>
  );
};
