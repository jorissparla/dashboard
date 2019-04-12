import * as React from "react";
import styled from "styled-components";
import { FormattedDate, DistanceInWords } from "../utils/FormattedDate";

const Container = styled.div`
  display: grid;
  grid-template-rows: 2fr 2fr;
  height: 200px;
  width: 300px;
  margin: 10px;
  border: 1px solid lightgray;
  background: white;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;
const Picture = styled.img`
  height: 100px;
`;

const Description = styled.div`
  max-height: 2rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  font-family: Raleway;
`;

interface CardProps {
  title: string;
  text: string;
  buttonText: string;
  category: string;
  link: string;
  action: any;
  color: string;
  textcolor: string;
  canEdit: boolean;
  editLink: string;
  viewLink: string;
  isNew: boolean;
  updatedAt: any;
  isFavorite: boolean;
  account_id: any;
  supportcard_id: any;
  onTitleClick: () => void;
  onToggleFavorite: () => void;
  onAudit: () => void;
  onFollowLink: (link: any) => void;
}

const NewCard: React.FC<CardProps> = ({
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
  isFavorite = false,
  account_id = null,
  supportcard_id = null,
  updatedAt,
  onTitleClick = () => null,
  onToggleFavorite = () => {},
  onAudit = () => console.log("onaudit"),
  onFollowLink = link => {
    console.log("onFollowLink");
    return link;
  }
}) => {
  return (
    <Container>
      <Picture src="/static/media/image1.4d33fe46.jpg" />
      <Description>{title}</Description>
      <div>{FormattedDate(updatedAt)}</div>
      <div>{DistanceInWords(updatedAt)}</div>
    </Container>
  );
};

export default NewCard;
