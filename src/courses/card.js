import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import {blue500} from 'material-ui/styles/colors';

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 150px;
  width: 20%;
  
`

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
   object-fit: cover;
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 2px;
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`

const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
`
const Footer = styled.div`
  margin: 5px;
`

const Outer = styled.div`
  display: flex;
  flex-wrap:wrap;
`
const imageURL ='http://nlbavwtls22/ixs/_mugshots/infor_gmaggio_20170209161047.jpg' 
const URL2='http://nlbavwtls22/ixs/_mugshots/infor_imohnen_20170209102233.JPG'
const URL3= 'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png'

const Card = ({ image=imageURL, title='Inke Mohnen', text='Papier Und KartonFabrik', buttonText='18 April 2017', action=null}) => {
  return (<Container>
  <Paper zDepth={1}>
  <StyledImage src={image}/>
  <Inner>
    <Title>{title}</Title>
      <StyledBody>{text}
      </StyledBody> 
  </Inner>
      <Footer>
      <FlatButton style={{color: 'rgb(3,155,229)'}}>{buttonText.toUpperCase()} </FlatButton>
    </Footer>
    </Paper>

  </Container>)
};

export default () =>{
  return (
    <Outer>
    <Card image={imageURL}/>
    <Card image={URL2}/>
    <Card image={URL3}/>
</Outer>
  )

}

export {Card } 