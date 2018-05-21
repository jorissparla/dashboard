import React from "react";
import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";
import format from "date-fns/format";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import Badge from "material-ui/Badge";
import { blue500 } from "material-ui/styles/colors";
import { Link } from "react-router-dom";
import StudentChip from "./StudentChip";

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
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/analytics.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/storage.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/database.png",
  "https://www.gstatic.com/mobilesdk/170215_mobilesdk/discoveryCards/2x/functions.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/crash.png",
  "https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/amb.png"
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

const StyledBadge = styled(Badge) `
  float: right;
  align-content: center;
  padding: 2px;
  margin-top: 15px;
`;

class NewCard extends React.Component {
  state = { visible: false };

  showStudents = () => {
    this.setState({ visible: true });
    setTimeout(() => {
      console.log("showing");
      this.setState({ visible: false });
    }, 2000);
  };
  render() {
    const { course, index, validRole } = this.props;
    let image = imgList[index % 7];
    let bgColor;
    switch (course.team) {
      case "Logistics":
        image = imgList[1];
        bgColor = "#FF5722";
        break;
      case "Tools":
        image = imgList[4];
        bgColor = "#2196f3";
        break;
      case "Finance":
        image = imgList[2];
        bgColor = "#009688";
        break;

      default:
        image = imgList[0];
        bgColor = "#673AB7";
        break;
    }

    const pd = course.plannedcourses[0]
      ? format(course.plannedcourses[0].startdate, "ddd, DDMMMYYYY")
      : "";
    const acount = course.plannedcourses[0] ? course.plannedcourses[0].studentcount : 0;
    const students = course.plannedcourses[0] ? course.plannedcourses[0].students : [];
    return (
      <Card style={{ width: "22%", margin: 10 }}>
        <CardMedia
          overlay={<CardTitle title={course.title} />}
          overlayContentStyle={{ fontSize: "20px", background: "rgba(0, 0, 0, 0.2)" }}
          overlayContainerStyle={{ fontSize: "20px", background: "rgba(0, 0, 0, 0.2)" }}
          overlayStyle={{ fontSize: "20px", background: "rgba(0, 0, 0, 0.2)" }}
        >
          <StyledImage src={image} />
        </CardMedia>

        <CardActions>
          <BottomStyle>
            <Link to={`courses/edit/${course.id || "/"}`}>
              <RaisedButton
                backgroundColor={blue500}
                label="View"
                style={{ color: "white" }}
                labelStyle={{ color: "white" }}
                disabled={!validRole}
              />
            </Link>
            <StyledBadge
              badgeStyle={{ backgroundColor: bgColor }}
              badgeContent={course.team.slice(0, 1).toUpperCase()}
              primary={true}
            />
            <PD>{pd}</PD>
            <StyledBadge
              badgeStyle={{ backgroundColor: "black" }}
              badgeContent={acount}
              primary={true}
              onMouseEnter={() => this.showStudents(0)}
            />
            <StudentChipList>
              {this.state.visible &&
                students.map(s => (
                  <StudentChip key={s.id} id={s.id} fullname={s.fullname} image={s.image} />
                ))}
            </StudentChipList>
          </BottomStyle>
        </CardActions>
      </Card>
    );
  }
}

export default NewCard;
