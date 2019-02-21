import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: 10,
    maxHeight: 400,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    margin: 20,
    flexWrap: 'wrap',
    backgroundColor: '#efefef',
    height: '100vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  video: {
    border: '1px solid #cccccc'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

function AboutPage(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          title="introduction video to the Infor Support Training Dashboard"
          subheader="September 14, 2016"
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
        />
        <video width="100%" height="300" controls className={classes.video}>
          <source src="http://nlbavwdocsup1:5000/CoursesDashboardIntro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Card>
      <Card className={classes.card}>
        <CardHeader
          title="Courses Dashboard and Login"
          subheader="April 30th, 2018"
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
        />
        <video width="100%" height="300" controls className={classes.video}>
          <source
            src="http://nlbavwdocsup1:5000/Training/CoursesDashboardAndLogin.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Card>
      <Card className={classes.card}>
        <CardHeader
          title="Support Dashboard Favorites"
          subheader="February 21, 2019"
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
        />
        <video width="100%" height="300" controls className={classes.video}>
          <source
            src="http://nlbavwdocsup1:5000/Training/Support Dashboard Favorites.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Card>
    </div>
  );
}

export default withStyles(styles)(AboutPage);
