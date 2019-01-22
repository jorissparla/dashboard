import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import ViewIcon from "@material-ui/icons/Pageview";
import ModeEdit from "@material-ui/icons/Edit";
import NewIcon from "@material-ui/icons/NewReleases";
import { Link } from "react-router-dom";
import { Papier, HR } from "../styles/index.js";
import Divider from "@material-ui/core/Divider";

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
const Cat = styled.div`
  font-weight: 800;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Montserrat", Roboto;
`;
const Title = styled.div`
  font-family: "Montserrat", Roboto;
  font-size: 16px;
  font-weight: bold;
  padding: 2px;
  flex-grow: 0;
  margin: 5px;
  width: 80%;
`;

const TitleIcon = styled.div`
  width: 20%;
  align-items: center;
  display: flex;
`;

const BottomStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  flex-grow: 1;
  font-size: 12px;
  font-family: Helvetica;
  overflow: hidden;
  font-family: Montserrat;
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

const StyledPapier = styled(Papier)`
  display: flex;
  justify-content: space-between;
  font-family: Montserrat;
  width: 18%;
  min-width: 200px;
  color: ${props => (props.textcolor ? props.textcolor : "black")};
  background-color: ${props => (props.color ? props.color : "lightblue")};
`;

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
  editLink = "",
  viewLink = "",
  isNew = false,
  onAudit = () => console.log("onaudit"),
  onFollowLink = link => {
    console.log("onFollowLink");
    return link;
  }
}) => {
  return (
    <StyledPapier color={color}>
      <TitleWrapper>
        <Title>{title}</Title>
        {isNew && (
          <TitleIcon>
            <NewIcon />
          </TitleIcon>
        )}
      </TitleWrapper>
      <HR />
      <StyledBody>{text.slice(0, 200).concat("...")}</StyledBody>
      <Divider />
      <BottomStyle>
        <StyledLink to={editLink} onClick={e => onAudit(editLink)}>
          {canEdit === true ? <Text>Open</Text> : <Text>View</Text>}
          <Icon>{canEdit === true ? <ModeEdit /> : <ViewIcon />}</Icon>
        </StyledLink>
        {canEdit && (
          <StyledLink
            to={viewLink}
            onClick={e => onAudit(viewLink, "SupportCard")}
          >
            <Icon>
              <ViewIcon />
            </Icon>
          </StyledLink>
        )}
        <Cat>{category}</Cat>

        <OtherButton
          primary={true}
          target="_blank_"
          href={link}
          onClick={() => onFollowLink(viewLink, link)}
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
