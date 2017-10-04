import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import ViewIcon from "material-ui/svg-icons/action/pageview";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import LinkIcon from "material-ui/svg-icons/content/link";
import { Link } from "react-router-dom";
import { Button, Papier, HR } from "../styles/index.js";
import Divider from "material-ui/Divider";

const OtherButton = styled.a`
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  cursor: pointer;
`;

const Text = styled.div`
  text-decoration: none;
  padding-left: 3px;
  cursor: pointer;
  font-weight: 900;
  color: ${props => (props.textcolor ? props.textcolor : "black")};
`;
const Cat = styled.div`font-weight: 800;`;

const Title = styled.div`
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
  padding: 2px;
  flex-grow: 0;
  margin: 5px;
`;

const BottomStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
  font-size: 15px;
  flex-grow: 1;
  font-size: 12px;
  font-family: Helvetica;
`;

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  :hover {
    border: 2px solid lightgrey;
    border-radius: 5px;
  }
`;

const StyledPapier = Papier.extend`
  display: flex;
  justify-content: space-between;
  width: 18%;
  min-width: 200px;
  color: ${props => (props.textcolor ? props.textcolor : "black")};
  background-color: ${props => (props.color ? props.color : "lightblue")};
`;
/* const paperStyle = (color, textcolor = "#000") => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "18%",
    margin: "5px",
    minWidth: "200px",
    backgroundColor: color,
    color: textcolor
  };
};
 */
const SmallCard = ({
  title = "Procedure",
  text = "Papier Und KartonFabrik",
  buttonText = "Modify",
  category = "Cloud",
  link = "http://www.google.com",
  action = null,
  color = "#FFFFF",
  textcolor = "#000",
  canEdit = false,
  editLink = ""
}) => {
  return (
    <StyledPapier color={color}>
      <Title>{title}</Title>
      <HR />
      <StyledBody>{text.slice(0, 200).concat("...")}</StyledBody>
      <Divider />
      <BottomStyle>
        <StyledLink to={editLink}>
          {canEdit === true ? <Text>Open</Text> : <Text>View</Text>}
          <IconButton
            iconStyle={{
              height: "16px",
              width: "16px",
              flexGrow: 0
            }}
          >
            {canEdit === true ? <ModeEdit /> : <ViewIcon />}
          </IconButton>
        </StyledLink>
        <Cat>{category}</Cat>
        <OtherButton
          primary={true}
          href={link}
          target="_blank_"
          //onClick={() => window.open(link)}
        >
          {buttonText.toUpperCase()}
        </OtherButton>
      </BottomStyle>
    </StyledPapier>
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
