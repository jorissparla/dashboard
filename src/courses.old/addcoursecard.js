import React from "react";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import { blue500 } from "material-ui/styles/colors";
import styled from "styled-components";
import { Link } from "react-router";

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width:22%;
  min-width:200px;
    margin-bottom: 5px;

`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 800;
  padding: 2px;
  color: #2196F3;
  text-align: center;

`;

const StyledAddIcon = styled.div`
  width:22%;
  min-width:200px;
  justify-content: center;
      align-items: center;
  display: flex;
  font-size: 48px;
  height: 150px;


`;
const StyledLink = styled(Link)`
  text-decoration: none;
    :hover {
    background:#0196F3;
    color: white;
  }
`;

export default () => {
  return (
    <StyledContainer>
      <StyledLink to={"courses/new"}>
        <StyledAddIcon>
          <FontIcon
            className="material-icons"
            color={blue500}
            style={{ fontSize: "48px" }}
          >
            add
          </FontIcon>
        </StyledAddIcon>
        <Title>Add a new course</Title>
      </StyledLink>

    </StyledContainer>
  );
};
