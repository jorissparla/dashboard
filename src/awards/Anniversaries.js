import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Fab } from '@material-ui/core';
import { format } from '../utils/format';
import { WideTitle, StyledInitials } from '../styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    minWidth: '200px'
  },
  card: {
    width: 320,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    margin: theme.spacing.unit,
    width: 200
  }
});

const ALL_ANNIVERSARIES = gql`
  query ALL_ANNIVERSARIES {
    anniversaries {
      anniversarydate
      dateofhire
      fullname
      years
      id
      account {
        id
        lastname
        image
      }
    }
  }
`;

const Image = ({ image, fullname }) => {
  const initials = fullname
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  if (image) {
    return <Avatar src={image} style={{ margin: 5, width: 80, height: 80 }} size={80} />;
  } else {
    return <StyledInitials>{initials}</StyledInitials>;
  }
};

class AnniversaryList extends React.Component {
  state = {};
  yearsColor = years => {
    switch (years) {
      case 5:
        return '#FF8A65';
      case 10:
        return '#B3E5FC';
      case 15:
        return '#4DB6AC';
      case 20:
        return 'white';
      case 25:
        return '#FFC107';
      case 30:
        return '#CE93D8';
      default:
        return 'white';
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={ALL_ANNIVERSARIES}>
        {({ loading, data }) => {
          if (loading) return 'loading';
          console.log(data);
          const { anniversaries } = data;
          return (
            <div>
              <WideTitle>Anniversaries</WideTitle>

              <div style={{ display: 'flex', margin: 20, flexWrap: 'wrap' }}>
                {anniversaries.map(({ id, fullname, years, account, anniversarydate }) => (
                  <Card className={classes.card} key={id}>
                    <CardActionArea>
                      <Image image={account.image} fullname={fullname} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {fullname}
                        </Typography>
                        <Typography gutterBottom variant="h2" component="h2">
                          {years}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Button color="secondary" aria-label="Add">
                      {format(Date.parse(anniversarydate), 'ddd, DD MMMM YYYY')}
                    </Button>
                  </Card>
                ))}
                ;
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(AnniversaryList);
