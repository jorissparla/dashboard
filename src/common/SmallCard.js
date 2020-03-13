import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import ViewIcon from '@material-ui/icons/Pageview';
import ModeEdit from '@material-ui/icons/Edit';
import NewIcon from '@material-ui/icons/NewReleases';
import { Link } from 'react-router-dom';
import { Papier, HR } from '../styles/index.js';
import Divider from '@material-ui/core/Divider';
import { ToggleFavorite } from '../supportcard/Favorite';
import NumberOfViews from '../pages/NumberOfViews';
import { format } from '../utils/format';
import { Block } from '../elements/Block';

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

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat', Roboto;
  justify-content: space-between;
  justify-content: center;
  text-align: center;
  min-height: 25%;
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
  overflow: hidden;
  text-overflow: ellipsis;
  color: #374151;
  margin: 5px;
  // width: 80%;
  color: ${props => (props.textcolor ? props.textcolor : '#374151;')};
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
  margin-bottom: 0.5rem;
  display: flex;
  margin-left: 0.5rem;
  letter-spacing: 0.025rem;
`;

const StyledPapier = styled(Papier)`
  display: flex;
  justify-content: space-between;
  font-family: Montserrat;
  width: 18%;
  min-width: 200px;
  color: ${props => (props.textcolor ? props.textcolor : 'black')};
  background-color: ${props => (props.color ? props.color : 'lightblue')};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
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
      <DateWrapper>
        <svg
          className="fill-current w-4 h-4 text-gray-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
        </svg>
        <span className="text-xs tracking-widest">
          Last updated: {format(updatedAt, 'EEE dd MMM yyyy, hh:mm')}
        </span>
      </DateWrapper>
      <HR />
      <div style={{ width: '80%' }}>
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
