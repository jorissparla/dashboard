import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { StyledInitials, WideTitle } from '../styles';
import { format } from '../utils/format';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
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
    margin: theme.spacing(1),
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
    return <Avatar src={image.replace('http:', 'https:')} style={{ margin: 5, width: 80, height: 80 }} size={80} />;
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
                      {format(anniversarydate, 'EEE, dd MMMM yyyy')}
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
