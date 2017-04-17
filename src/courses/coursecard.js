import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import {blue500} from 'material-ui/styles/colors';
import {Link} from 'react-router'

const imgList = [
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/analytics.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/storage.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/database.png',
  'https://www.gstatic.com/mobilesdk/170215_mobilesdk/discoveryCards/2x/functions.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/crash.png'
]


const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width:22%;
  min-width:200px;
  margin-bottom: 5px;
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
const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
`
const BottomStyle=styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  justify-content: center;
`
const StyledFlat = styled(FlatButton)`
  width: 70%;
  margin-left: 5px;
  flex-grow: 3;
`
const TeamSpan = styled.div`
  width: 20%;
  color: orange;
  margin-right: 5px;
  flex-grow: 1;
`
const StyledLink = styled(Link)`
  text-decoration: none;
    :hover {
    background:#0196F3;
    color: white;
  }
`

export default ({course, index}) => {
  const image = imgList[index % 6]
  return (
    <StyledContainer key={course.crs_UIC}>
      <StyledImage src={image} />
      <Title>
        { course.crs_title }
      </Title>
      <StyledBody>
        { course.crs_description }
      </StyledBody>
      <BottomStyle>
        <TeamSpan>{course.crs_team}</TeamSpan>
        <StyledLink to={`courses/${course.crs_UIC}`}>
          <FlatButton backgroundColor={blue500} label='Modify' style={{color:'white'}}/>
        </StyledLink>
       </BottomStyle> 
    </StyledContainer>
  )
}