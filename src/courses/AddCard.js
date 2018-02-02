import React from "react";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import { blue500 } from "material-ui/styles/colors";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width: 22%;
  min-width: 200px;
  margin-bottom: 5px;
  background-color: ${props => props.background};
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 2rem;
  font-weight: 800;
  padding: 2px;
  color: #2196f3;
  text-align: center;
`;

const StyledAddIcon = styled.div`
  width: 22%;
  min-width: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 48px;
  height: 150px;
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  :hover {
    background: #0196f3;
    color: white;
  }
`;

const old = ({
  link = "courses/create",
  title = "Add a new Course",
  color = { blue500 },
  background = "papayawhip"
}) => {
  return (
    <StyledContainer>
      <StyledLink to={link || "/"}>
        <StyledAddIcon>
          <FontIcon className="material-icons" style={{ fontSize: "48px" }}>
            add
          </FontIcon>
        </StyledAddIcon>
      </StyledLink>
    </StyledContainer>
  );
};

export default ({
  link = "courses/create",
  title = "Add a new Course",
  color = { blue500 },
  background = "papayawhip"
}) => {
  return (
    <Card style={{ width: "22%", margin: 10 }}>
      <CardTitle>
        <Title>{title}</Title>
      </CardTitle>
      <CardText>
        <StyledLink to={link || "/"}>
          <FloatingActionButton secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </StyledLink>
      </CardText>
    </Card>
  );
};
