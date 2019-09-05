import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import React from 'react';
import { Mutation } from 'react-apollo';
import FavoriteBadge from '../elements/Badge';
import { format } from '../utils/format';
import { MUTATION_MARK_LIVE } from './TenantQueries';
import { Header, H2 } from './TenantStyledElements';
export const TenantCard = ({
  classes,
  customer,
  tenants,
  live,
  role = 'Guest',
  onStatusChange = () => console.log('change'),
  infoClicked
}) => {
  const [isLive, setLive] = React.useState(live);
  const max = _.maxBy(tenants, t => format(t.lastupdated, 'YYYYMMDD')).lastupdated;
  if (customer === 'Azteka Consulting GmbH') console.log(customer, { isLive }, live);
  return (
    <Card className={customer === 'Infor' ? classes.card2 : classes.card}>
      <CardContent>
        <Header>
          <H2>{customer}</H2>

          <FavoriteBadge isVisible={live}>Live</FavoriteBadge>
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
        <Button variant="contained" onClick={infoClicked}>
          {format(max, 'DDMMMYYYY')}
        </Button>
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
  );
};
