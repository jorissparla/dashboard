import React from "react";
import { blue500 } from "material-ui/styles/colors";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Card, CardTitle, CardText } from "material-ui/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";



const Title = styled.div`
  font-family: Roboto;
  font-size: 2rem;
  font-weight: 800;
  padding: 2px;
  color: #2196f3;
  text-align: center;
`;


const StyledLink = styled(Link) `
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  :hover {
    background: #0196f3;
    color: white;
  }
`;



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
