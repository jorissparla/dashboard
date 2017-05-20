import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import Badge from "material-ui/Badge";
import { blue500 } from "material-ui/styles/colors";
import { Link } from "react-router";
import StudentsCard from "./StudentsCard";

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

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width:22%;
  min-width:200px;
  margin: 5px;
  justify-content: space-between;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100px;
   object-fit: cover;
`;
const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 2px;
  display: flex;
  align-items: space-between;
  margin-top: 10px;
`;
const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
`;
const BottomStyle = styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  justify-content: center;
`;

const TeamSpan = styled.div`
  width: 20%;
  color: orange;
  margin-right: 5px;
  flex-grow: 1;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
    :hover {
    background:#0196F3;
    color: white;
  }
`;
const StyledHyperLink = styled(Link)`
  text-decoration: none;
  :hover {
    cursor:pointer;
  }
  display: flex;
  justify-content: space-between;
`;
const StyledBadge = styled(Badge)`
float:right;
  align-content: center;
  padding: 2px;
  margin-top: 15px;
`;
export default ({ course, index, count }) => {
  const image = imgList[index % 7];
  return (
    <StyledContainer key={course.id}>
      <StyledImage src={image} />
      <StyledHyperLink to={course.link} title={course.link}>
        <Title>
          {course.title}

        </Title>
        <StyledBadge badgeContent={count} primary={true} />
      </StyledHyperLink>
      <StyledBody>
        {course.description}
      </StyledBody>
      <BottomStyle>
        <TeamSpan>{course.team}</TeamSpan>
        <StyledLink to={`courses/edit/${course.id}`}>
          <FlatButton
            backgroundColor={blue500}
            label="View"
            style={{ color: "white" }}
          />
        </StyledLink>

      </BottomStyle>
    </StyledContainer>
  );
};