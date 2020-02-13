import React from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  min-height: 150px;
  width: ${props => (props.width ? props.width : '20%')};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const StyledInitials = styled.div`
  width: 90%;
  height: 150px;
  object-fit: cover;
  line-height: 50px;
  color: darkgrey;
  font-size: 50px;
  font-family: Roboto;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding: 5px;
  border-radius: 50%;
  justify-content: center;
  border: 10px solid lightgray;
  margin: 5px;
  align-items: center;
  display: flex;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 2px;
  height: 50px;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
  font-size: 15px;
  height: 40px;
  overflow: hidden;
`;
const Footer = styled.div`
  margin: 5px;
`;

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const { REACT_APP_SERVER = 'nlbavwixs' } = process.env;

const imageURL = `https://${REACT_APP_SERVER}/ixs/_mugshots/infor_gmaggio_20170209161047.jpg`;
const URL2 = `https://${REACT_APP_SERVER}/ixs/_mugshots/infor_imohnen_20170209102233.JPG`;
const URL3 = 'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png';

const Card = ({
  image = imageURL,
  title = 'Inke Mohnen',
  text = 'Papier Und KartonFabrik',
  buttonText = '18 April 2017',
  action = null,
  width = '20%',
  initials = 'JS'
}) => {
  return (
    <Container width={width}>
      <Paper>
        {initials ? <StyledInitials>{initials}</StyledInitials> : <StyledImage src={image} />}
        <Inner>
          <Title>{title}</Title>
          <StyledBody>{text}</StyledBody>
        </Inner>
        <Footer>
          <Button variant="contained" style={{ color: 'rgb(3,155,229)' }}>
            {buttonText.toUpperCase()}{' '}
          </Button>
        </Footer>
      </Paper>
    </Container>
  );
};

export default () => {
  return (
    <Outer>
      <Card image={imageURL} />
      <Card image={URL2} />
      <Card image={URL3} />
    </Outer>
  );
};

export { Card };
