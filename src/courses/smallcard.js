import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import { blue500 } from "material-ui/styles/colors";

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 150px;
  width: 20%;
  
`;
const TeamSpan = styled.div`
  width: 20%;
  color: orange;
  margin-right: 5px;
  margin-left: 10px;
  flex-grow: 1;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 2px;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const BottomStyle = styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  justify-content: center;
`;

const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
`;
const Footer = styled.div`
  margin: 5px;
`;

const Outer = styled.div`
  display: flex;
  flex-wrap:wrap;
`;

const SmallCard = ({
  title = "Procedure",
  text = "Papier Und KartonFabrik",
  buttonText = "Modify",
  category = "Cloud",
  action = null
}) => {
  return (
    <Container>
      <Paper zDepth={1}>
        <Inner>
          <Title>{title}</Title>
          <StyledBody>
            {text}
          </StyledBody>
        </Inner>
        <BottomStyle>
          <TeamSpan>{category}</TeamSpan>
          <FlatButton style={{ color: "rgb(3,155,229)" }}>
            {buttonText.toUpperCase()}{" "}
          </FlatButton>
        </BottomStyle>
      </Paper>

    </Container>
  );
};

export default () => {
  return (
    <Outer>
      <SmallCard />
      <SmallCard />
      <SmallCard />
    </Outer>
  );
};

export { SmallCard };
