import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image1 from "../static/image1.jpg";
import Image2 from "../static/image2.png";
import Image3 from "../static/image3.png";
import Image4 from "../static/image4.png";
import { LongFormattedDate } from "../utils/FormattedDate";

const imgList = [
  "/static/image1.jpg",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/analytics.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/storage.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/database.png",
  "https://www.gstatic.com/mobilesdk/170215_mobilesdk/discoveryCards/2x/functions.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/crash.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/amb.png"
];

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
  box-sizing: border-box;
  border-radius: 4px;
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "15px",
    minWidth: "200px"
  },
  card: {
    width: 320,
    margin: 10
  },
  button: {
    margin: theme.spacing.unit,
    width: 200
  },
  media: {
    height: 120,
    objectFit: "cover",
    minWidth: 300
  },
  label: {
    transform: "rotateZ(-5deg)",
    color: "white",
    justifyContent: "flex-end",
    fontWeight: 500,
    padding: 10,
    fontSize: 24,
    background: "#00000099"
  },
  link: {
    display: "flex",
    textDecoration: "none"
  }
});

class NewCard extends React.Component {
  state = { visible: false };

  render() {
    const { course, index, validRole, classes } = this.props;
    let image = imgList[index % 7];
    switch (course.team) {
      case "Logistics":
        image = Image1; //imgList[1];
        break;
      case "Tools":
        image = Image2; //imgList[4];
        break;
      case "Finance":
        image = Image4; //imgList[2];
        break;
      default:
        image = Image3; //imgList[0];
        break;
    }
    if (course.id === "7E17D4A8-834E-41B4-9F40-1EC90F653001") {
      console.log("Course", course);
    }
    const [lastPlannedCourse] = course.plannedcourses;
    const pd = lastPlannedCourse ? LongFormattedDate(lastPlannedCourse.startdate) : "";
    const acount = lastPlannedCourse ? lastPlannedCourse.studentcount : 0;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image}>
            <Typography className={classes.label} gutterBottom variant="h6" component="h2">
              {course.title}
            </Typography>
          </CardMedia>
          <CardContent />
        </CardActionArea>
        <CardActions>
          <BottomStyle>
            <Link to={`courses/${validRole ? "edit" : "view"}/${course.id || "/"}`} className={classes.link}>
              <Button color="primary" variant="contained">
                View
              </Button>
            </Link>
            <Button variant="outlined">{course.team.slice().toUpperCase()}</Button>
            <Badge color="secondary" badgeContent={acount}>
              <PD>{pd}</PD>
            </Badge>
          </BottomStyle>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(NewCard);
