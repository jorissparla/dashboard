import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import ViewIcon from '@material-ui/icons/Pageview';
import ModeEdit from '@material-ui/icons/Edit';
import NewIcon from '@material-ui/icons/NewReleases';
import { Link } from 'react-router-dom';
import { Papier, HR } from '../styles/index.js';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import { ToggleFavorite } from '../supportcard/Favorite';
import NumberOfViews from '../pages/NumberOfViews';
import { format } from '../utils/format';
import { Block, Title } from '../elements/Block';

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
  color: ${props => (props.textcolor ? props.textcolor : 'black')};
`;
const Cat = styled.div`
  font-weight: 800;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat', Roboto;
  justify-content: space-between;
  :hover {
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }
`;
const Title2 = styled.div`
  font-family: 'Montserrat', Roboto;
  font-size: 16px;
  font-weight: bold;
  padding: 2px;
  flex-grow: 0;
  margin: 5px;
  width: 80%;
  color: ${props => (props.textcolor ? props.textcolor : '#2f2e2e')};
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

const StyledBody = styled.div`
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

const DateWrapper = styled.div`
  font-size: 10px;
  font-style: italic;
`;

const StyledPapier = styled(Papier)`
  display: flex;
  justify-content: space-between;
  font-family: Montserrat;
  width: 18%;
  min-width: 200px;
  color: ${props => (props.textcolor ? props.textcolor : 'black')};
  background-color: ${props => (props.color ? props.color : 'lightblue')};
  border-radius: 14px;
  background-image: ${props =>
    `linear-gradient(to bottom right, ${props.color || 'black'}, white)`};
`;

const SmallCard = ({
  title = 'Procedure',
  text = 'Papier Und KartonFabrik',
  buttonText = 'Modify',
  category = 'Cloud',
  link = 'https://www.google.com',
  action = null,
  color = '#FFFFF',
  textcolor = '#000',
  canEdit = false,
  editLink = '',
  accessed = 0,
  viewLink = '',
  isNew = false,
  isFavorite = false,
  account_id = null,
  supportcard_id = null,
  updatedAt = null,
  onTitleClick = () => null,
  onToggleFavorite = () => {},
  onAudit = () => console.log('onaudit'),
  onFollowLink = link => {
    console.log('onFollowLink');
    return link;
  }
}) => {
  return (
    <StyledPapier color={color}>
      <TitleWrapper onClick={onTitleClick}>
        <Title2 textcolor={textcolor}>{title}</Title2>
        {isNew && (
          <TitleIcon>
            <NewIcon />
          </TitleIcon>
        )}
        {account_id && <ToggleFavorite toggle={onToggleFavorite} isFavorite={isFavorite} />}
      </TitleWrapper>
      <DateWrapper>last updated: {format(updatedAt, 'EEE dd MMM yyyy, hh:mm')}</DateWrapper>
      <HR />
      <div style={{ width: '25%' }}>
        <Block selected={true}>{category}</Block>
      </div>
      <Divider />
      <BottomStyle>
        <StyledLink to={editLink} onClick={e => onAudit(editLink)}>
          {canEdit === true ? <Text>Open</Text> : <Text>View</Text>}
          <Icon>{canEdit === true ? <ModeEdit /> : <ViewIcon />}</Icon>
        </StyledLink>
        {canEdit && (
          <StyledLink to={viewLink} onClick={e => onAudit(viewLink, 'SupportCard')}>
            <Icon>
              <ViewIcon />
            </Icon>
          </StyledLink>
        )}

        <OtherButton
          primary={true}
          target="_blank_"
          href={link}
          onClick={() => onFollowLink(viewLink, link)}
        >
          {buttonText.toUpperCase()}
        </OtherButton>
        <NumberOfViews linkid={supportcard_id} accessed={accessed} />
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
