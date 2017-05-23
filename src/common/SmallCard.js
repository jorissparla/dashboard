import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import ThumbsUp from "material-ui/svg-icons/action/thumb-up";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import LinkIcon from "material-ui/svg-icons/content/link";
import { blue500 } from "material-ui/styles/colors";
import { Link } from "react-router-dom";

import Divider from "material-ui/Divider";

const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  width: 18%;
  margin: 5px;
  
`;
const Cat = styled.div`
  width: 15%;
  margin-right: 5px;
  margin-left: 10px;
  margin-top: 10px;
  flex-grow: 1;
   font-weight: 800;
`;

const Title = styled.div`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
  padding: 2px;
  flex-grow:0;
  margin: 5px;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  justify-content: space-between;
`;

const BottomStyle = styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  flex-grow: 0;
  justify-content: center;
`;

const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
    flex-grow: 1;
`;
const Footer = styled.div`
  margin: 5px;
`;

const Outer = styled.div`
  display: flex;
  flex-wrap:wrap;
`;
const paperStyle = color => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "18%",
    margin: "5px",
    minWidth: "200px",
    backgroundColor: color
  };
};

const SmallCard = ({
  title = "Procedure",
  text = "Papier Und KartonFabrik",
  buttonText = "Modify",
  category = "Cloud",
  link = "http://www.google.com",
  likes = 1,
  action = null,
  color = "#FFFFF",
  canEdit = false,
  editLink = ""
}) => {
  return (
    <Paper style={paperStyle(color)} zDepth={3}>
      <Title>{title}</Title>

      <StyledBody>
        {text.slice(0, 250)}
      </StyledBody>
      <Divider />
      <BottomStyle>
        {canEdit &&
          <Link to={editLink}>
            <IconButton
              iconStyle={{
                height: "16px",
                width: "16px",
                flexGrow: 0
              }}
            >
              <ModeEdit />{likes}
            </IconButton>
          </Link>}
        <Cat>{category}</Cat>
        <FlatButton
          style={{
            flexGrow: 0,
            margin: "2px",
            color: "black"
          }}
          primary={true}
          onClick={() => window.open(link)}
        >
          {buttonText.toUpperCase()}{" "}
          <LinkIcon />
        </FlatButton>
      </BottomStyle>

    </Paper>
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
