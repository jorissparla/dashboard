import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
//import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import StudentChip from './StudentChip';

const StudentChipList = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: -250%;
  left: -20%;
  padding: 2px;
  color: hsla(0, 0%, 93%, 1);
  border-radius: 4px;
  border: solid 1px lightgray;
`;

const imgList = [
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/analytics.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/storage.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/database.png',
  'https://www.gstatic.com/mobilesdk/170215_mobilesdk/discoveryCards/2x/functions.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/crash.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/amb.png'
];

const StyledImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const BottomStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const PD = styled.div`
  font-size: 14px;
  font-weight: 800;
`;

const StyledBadge = styled(Badge)`
  float: right;
  align-content: center;
  padding: 2px;
  margin-top: 15px;
`;

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
    padding: '10px',
    minWidth: '200px'
  },
  button: {
    margin: theme.spacing.unit,
    width: 200,
    margin: 10
  },
  link: {
    display: 'flex',
    textDecoration: 'none'
  }
});

class NewCard extends React.Component {
  state = { visible: false };

  showStudents = () => {
    this.setState({ visible: true });
    setTimeout(() => {
      console.log('showing');
      this.setState({ visible: false });
    }, 2000);
  };
  render() {
    const { course, index, validRole, classes } = this.props;
    let image = imgList[index % 7];
    let bgColor;
    switch (course.team) {
      case 'Logistics':
        image = imgList[1];
        bgColor = '#FF5722';
        break;
      case 'Tools':
        image = imgList[4];
        bgColor = '#2196f3';
        break;
      case 'Finance':
        image = imgList[2];
        bgColor = '#009688';
        break;

      default:
        image = imgList[0];
        bgColor = '#673AB7';
        break;
    }
    if (course.id === '7E17D4A8-834E-41B4-9F40-1EC90F653001') {
      console.log('Course', course);
    }
    const [lastPlannedCourse] = course.plannedcourses;
    const nrPlannedCourses = course.plannedcourses ? course.plannedcourses.length : 0;
    const pd = lastPlannedCourse ? format(lastPlannedCourse.startdate, 'ddd, DDMMMYYYY') : '';
    const acount = lastPlannedCourse ? lastPlannedCourse.studentcount : 0;
    const students = lastPlannedCourse ? lastPlannedCourse.students : [];
    return (
      <Card style={{ width: '22%', margin: 10 }}>
        <CardMedia component="img" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {course.title}
          </Typography>
        </CardContent>
        <CardActions>
          <BottomStyle>
            <Link
              to={`${validRole ? 'edit' : 'view'}/${course.id || '/'}`}
              className={classes.link}
            >
              <Badge color="secondary" badgeContent={acount}>
                <Button color="primary" variant="contained">
                  View
                </Button>
              </Badge>
            </Link>
            <Button variant="outlined">{course.team.slice().toUpperCase()}</Button>
            <PD>{pd}</PD>
          </BottomStyle>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(NewCard);
