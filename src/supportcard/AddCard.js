import React from "react";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { blue500 } from "material-ui/styles/colors";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width: 18%;
  min-width: 150px;
  height: 200px;
  margin: 5px;
  background-color: ${props => props.background};
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 800;
  padding: 2px;
  color: #2196f3;
  text-align: center;
`;

const StyledAddIcon = styled.div`
  width: 18%;
  min-width: 150px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 48px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer
  :hover {
    border: 2px solid lightgrey;
    border-radius: 2px;
  }}
`;

export default ({
  link = "courses/create",
  title = "Add a new Course",
  color = { blue500 },
  background = "papayawhip",
  onClick
}) => {
  return (
    <StyledContainer>
      <StyledLink onClick={onClick} to={link || "/"}>
        <StyledAddIcon>
          <FloatingActionButton style={{ marginRight: 20 }}>
            <ContentAdd />
          </FloatingActionButton>
        </StyledAddIcon>
        <Title>{title}</Title>
      </StyledLink>
    </StyledContainer>
  );
};
